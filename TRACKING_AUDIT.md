# Tracking Code Audit Report

## Overview
Reviewed all tracking implementation across:
- `public/tracker.js` (client-side)
- `api/track.php` (backend - older)
- `api/tracker/track.php` (backend - newer)
- `src/pages/MetaLeadForm.tsx` (lead form)
- `index.html` (initialization)
- `TRACKING_SETUP.md` (documentation)

---

## CRITICAL ISSUES

### 1. **Incomplete Initialization in `tracker.js`**
**Severity:** HIGH  
**File:** `public/tracker.js`  
**Lines:** ~218 (init function)

**Problem:**
- `setupMediaTracking()` is defined but **never called** in `init()`
- `trackPageVisit()` is defined but **never triggered** on route changes
- Media plays and page visits data is collected nowhere

**Impact:** Media tracking and page routing data is never sent to HubSpot

**Fix:**
```javascript
function init() {
  // ... existing code ...
  
  setupMediaTracking();  // ADD THIS
  
  // Track page visits on route changes (SPA)
  const observer = new MutationObserver(() => trackPageVisit());
  observer.observe(document.documentElement, { 
    subtree: true, 
    attributes: true,
    attributeFilter: ['data-page'] // Or whatever your React Router uses
  });
  // ... rest of code ...
}
```

---

### 2. **Duplicate/Conflicting Backend Endpoints**
**Severity:** HIGH  
**Files:** `api/track.php` vs `api/tracker/track.php`

**Problem:**
- Two different backend implementations exist
- `tracker.js` CONFIG points to `/api/tracker/track.php` (newer)
- But there's also legacy `/api/track.php` (older)
- Both do similar but different things

**Comparison:**

| Feature | track.php | tracker/track.php |
|---------|-----------|------------------|
| Contact lookup | Email-based | Email + URL param |
| Note creation | Appends to `notes` property | Creates separate note objects |
| Data validation | Less strict | More strict |
| Payload handling | Simpler | More detailed |
| Error handling | Basic | Better |

**Impact:** Confusion about which endpoint to use; dead code maintenance burden

**Fix:** Choose ONE backend - recommend keeping `api/tracker/track.php` (newer, better)
- Delete `api/track.php`
- Update documentation to reference only the active endpoint
- Ensure `tracker.js` CONFIG points to correct endpoint

---

### 3. **Memory Leaks in `setupMediaTracking()`**
**Severity:** MEDIUM  
**File:** `public/tracker.js` lines ~149-165

**Problem:**
```javascript
function setupMediaTracking() {
  const mediaElements = document.querySelectorAll('video, audio');
  mediaElements.forEach((media) => {
    media.addEventListener('play', () => {
      // ... tracking code ...
    });
  });
}
```

If called multiple times:
- Event listeners stack up (one per call)
- Media elements that are dynamically added won't be tracked
- No cleanup mechanism

**Impact:** Memory leak if media elements are updated; duplicate tracking events

**Fix:**
```javascript
function setupMediaTracking() {
  // Remove old listeners to prevent duplicates
  const mediaElements = document.querySelectorAll('video, audio');
  mediaElements.forEach((media) => {
    // Remove any existing listeners
    const newMedia = media.cloneNode(true);
    media.parentNode.replaceChild(newMedia, media);
  });
  
  // Re-add fresh listeners
  document.querySelectorAll('video, audio').forEach((media) => {
    media.addEventListener('play', () => {
      const title = media.title || media.src || media.querySelector('source')?.src || 'Unnamed Media';
      const type = media.tagName.toLowerCase();
      state.mediaPlays.push({
        type: type,
        title: title.substring(0, 50),
        timestamp: new Date().toISOString(),
      });
      console.log(`[Tracker] Media played: ${type} - ${title}`);
    }, { once: true }); // Only track once per session
  });
  
  // Setup mutation observer for dynamically added media
  const observer = new MutationObserver(() => setupMediaTracking());
  observer.observe(document.body, { childList: true, subtree: true });
  
  return () => observer.disconnect(); // Return cleanup function
}
```

---

### 4. **`navigator.sendBeacon` Type Mismatch**
**Severity:** MEDIUM  
**File:** `public/tracker.js` lines ~206-217

**Problem:**
```javascript
navigator.sendBeacon(apiUrl, JSON.stringify({
  // ... payload
}));
```

`navigator.sendBeacon()` expects:
- String (but gets JSON string - OK)
- **OR** Blob/ArrayBuffer/FormData

But `apiUrl` with query params like `?id=123` might not work correctly in all browsers.

**Impact:** Unload tracking might fail silently; data loss on page exit

**Fix:**
```javascript
window.addEventListener('beforeunload', () => {
  if (state.activeTime > 0) {
    // Use FormData for better compatibility
    const formData = new FormData();
    
    const hsId = getHubSpotId();
    if (hsId) {
      formData.append('id', hsId);
    }
    
    formData.append('data', JSON.stringify({
      userId: getUserId(),
      email: getUserEmail(),
      activeTime: state.activeTime,
      maxScrollDepth: state.maxScrollDepth,
      clicks: state.clicks,
      pageUrl: window.location.href,
      isUnload: true,
      timestamp: Date.now(),
    }));
    
    navigator.sendBeacon(CONFIG.apiEndpoint, formData);
  }
});
```

---

### 5. **Hardcoded Absolute URL in CONFIG**
**Severity:** MEDIUM  
**File:** `public/tracker.js` line ~7

**Problem:**
```javascript
apiEndpoint: 'https://soulfuljourneystours.com/api/tracker/track.php'
```

Issues:
- Not flexible for development/staging environments
- Hard to test locally
- Mixed content warning if site ever uses HTTPS but dev uses HTTP

**Fix:**
```javascript
const CONFIG = {
  apiEndpoint: window.location.protocol + '//' + window.location.host + '/api/tracker/track.php',
  batchInterval: 30000,
  idleTimeout: 60000,
};
```

---

## SIGNIFICANT ISSUES

### 6. **Missing Page Title Tracking**
**Severity:** MEDIUM  
**Files:** `public/tracker.js`, `api/tracker/track.php`

**Problem:**
- `tracker/track.php` expects `pageTitle` in payload (line 153)
- `tracker.js` never collects page title
- Backend uses it in notes but receives `undefined`

**Impact:** Incomplete engagement notes in HubSpot

**Fix in tracker.js:**
```javascript
const state = {
  sessionStart: Date.now(),
  activeTime: 0,
  lastActiveTime: Date.now(),
  isTabActive: true,
  maxScrollDepth: 0,
  clicks: [],
  mediaPlays: [],
  pageVisits: [],
  pageTitle: document.title,  // ADD THIS
  currentPage: window.location.pathname,
  eventsSent: false,
};

function sendTrackingData() {
  updateActiveTime();

  const payload = {
    userId: getUserId(),
    email: getUserEmail(),
    sessionStart: state.sessionStart,
    activeTime: state.activeTime,
    maxScrollDepth: state.maxScrollDepth,
    clicks: state.clicks,
    pageUrl: window.location.href,
    pageTitle: document.title,  // ADD THIS
    timestamp: Date.now(),
  };
  // ... rest
}
```

---

### 7. **Performance: Repeated DOM Queries**
**Severity:** LOW-MEDIUM  
**File:** `public/tracker.js` line ~76-82 in `getUserEmail()`

**Problem:**
```javascript
function getUserEmail() {
  // ... existing code ...
  
  // Every 30 seconds, this queries the DOM for email inputs
  const emailInputs = document.querySelectorAll('input[type="email"], ...');
  // ...
}
```

Called on every batch send (every 30 seconds) by `sendTrackingData()`.

**Impact:** Unnecessary DOM traversals every 30 seconds

**Fix:**
```javascript
// Cache email lookup
let cachedEmail = null;

function getUserEmail() {
  if (cachedEmail) return cachedEmail;
  
  let email = localStorage.getItem('soulful_tracker_email');
  if (email) {
    cachedEmail = email;
    return email;
  }

  const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');
  for (let input of emailInputs) {
    if (input.value && input.value.includes('@')) {
      email = input.value;
      localStorage.setItem('soulful_tracker_email', email);
      cachedEmail = email;
      return email;
    }
  }
  
  return null;
}

// Reset cache when email changes
document.addEventListener('change', (e) => {
  if (e.target.matches('input[type="email"]')) {
    cachedEmail = null;
  }
});
```

---

### 8. **Click Listener Not Passive (Performance)**
**Severity:** LOW  
**File:** `public/tracker.js` line ~185

**Problem:**
```javascript
document.addEventListener('click', (e) => {
  // ... tracking code ...
  // Note: NOT using { passive: true }
});
```

Scroll listener uses `{ passive: true }` (line ~178) but click listener doesn't.

**Impact:** Slightly slower click handling; browser can't optimize

**Fix:**
```javascript
document.addEventListener('click', (e) => {
  const target = e.target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
  if (target) {
    const identifier = getElementIdentifier(target);
    const text = target.textContent?.slice(0, 30) || '';
    state.clicks.push({
      component: identifier,
      text: text,
      timestamp: new Date().toISOString(),
    });
    console.log(`[Tracker] Click tracked:`, identifier, text);
  }
}, { passive: true });  // ADD THIS
```

---

### 9. **Duplicate Comment in Code**
**Severity:** VERY LOW (Code Quality)  
**File:** `public/tracker.js` lines ~164 and ~170

**Problem:**
```javascript
  /**
   * Update active time (only if tab is active)
   */
  function setupMediaTracking() {
    // ...
  }

  /**
   * Update active time (only if tab is active)  <-- DUPLICATE!
   */

  /**
   * Send batch of tracking data to backend
   */
```

**Fix:** Remove duplicate comment

---

## DOCUMENTATION ISSUES

### 10. **Outdated TRACKING_SETUP.md**
**Severity:** MEDIUM  
**File:** `TRACKING_SETUP.md`

**Issues:**
1. References `/api/track.php` but tracker.js uses `/api/tracker/track.php`
2. Documentation is incomplete (stops mid-sentence at line ~95)
3. Missing information about media tracking setup
4. Doesn't mention that `setupMediaTracking()` must be called
5. No troubleshooting section

**Fix:** Update to reflect:
- Correct endpoint (`/api/tracker/track.php`)
- All collected metrics (media, page visits, form events)
- Complete how-it-works section
- Troubleshooting tips

---

## INTEGRATION ISSUES

### 11. **`MetaLeadForm.tsx` Uses Different API Base**
**Severity:** LOW  
**File:** `src/pages/MetaLeadForm.tsx` line ~2

**Problem:**
```typescript
const API_BASE = "/api";
// But tracker.js uses absolute URL
```

Minor inconsistency in URL handling across different parts of tracking system.

---

## RECOMMENDATIONS (Priority Order)

### 🔴 MUST FIX (Critical)
1. Call `setupMediaTracking()` in init()
2. Choose one backend: keep `tracker/track.php`, delete `track.php`
3. Call `trackPageVisit()` on SPA route changes
4. Add `pageTitle` to payload

### 🟡 SHOULD FIX (High Priority)
5. Fix `navigator.sendBeacon` compatibility
6. Prevent memory leaks in media tracking
7. Use relative URL instead of hardcoded absolute URL
8. Update TRACKING_SETUP.md documentation

### 🟢 NICE TO HAVE (Performance/Quality)
9. Cache email lookups to reduce DOM queries
10. Make click listener passive
11. Remove duplicate comment
12. Add cleanup mechanism for event listeners

---

## Testing Checklist

After fixes are applied, verify:

- [ ] Open DevTools Console and check for `[Tracker]` logs
- [ ] Confirm media plays are logged when videos are played
- [ ] Verify page routing is tracked on SPA navigation
- [ ] Check that data arrives in HubSpot notes
- [ ] Test unload tracking (close tab - check network tab in DevTools)
- [ ] Verify form submission captures email correctly
- [ ] Test on mobile to ensure responsive tracking
- [ ] Check memory usage over time (no leaks)

---

## Code Quality Summary

| Category | Status | Notes |
|----------|--------|-------|
| Functionality | ⚠️ Partial | Media & page tracking not initialized |
| Performance | 🟡 Good | Some unnecessary DOM queries |
| Security | ✅ Good | No sensitive data exposed |
| Maintainability | ⚠️ Mixed | Duplicate backends, incomplete docs |
| Browser Compat | 🟡 Good | sendBeacon compatibility issue |
| Error Handling | 🟡 Adequate | Could be more robust |

