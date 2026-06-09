# ✅ Your Requirements - Implementation Checklist

## Requirement 1: Track Page Visits & HubSpot Native Tracking

### What You Asked:
> "Track page visit and Hubspot native tracking"

### What's Implemented: ✅

**Frontend (`public/tracker.js`):**
```javascript
// Detects route changes in React Router
trackPageVisit() {
  const currentPath = window.location.pathname;
  const pageTitle = document.title;
  state.pageVisits.push({
    url: currentPath,
    title: pageTitle,
    timestamp: new Date().toISOString(),
  });
}

// Watches title changes automatically
observePageChanges() {
  const titleObserver = new MutationObserver(trackPageVisit);
  titleObserver.observe(document.querySelector('title'), { childList: true });
  
  // Check pathname every second (for SPA routing)
  setInterval(() => trackPageVisit(), 1000);
}
```

**What gets sent to HubSpot:**
```json
{
  "pageVisits": [
    { "url": "/home", "title": "Soulful Journeys", "timestamp": "..." },
    { "url": "/kasol-kheerganga", "title": "Kasol Kheerganga Trip", "timestamp": "..." },
    { "url": "/booking", "title": "Book Your Trip", "timestamp": "..." }
  ]
}
```

**HubSpot Note Output:**
```
Page route visits: 3
 - /home | Soulful Journeys
 - /kasol-kheerganga | Kasol Kheerganga Trip
 - /booking | Book Your Trip
```

---

## Requirement 2: Time Spent in Seconds - ONLY When Tab is Active

### What You Asked:
> "I want the timespent in sec (only when tab is active) not in background"

### What's Implemented: ✅

**Frontend (`public/tracker.js`):**
```javascript
// Monitor tab visibility
document.addEventListener('visibilitychange', () => {
  state.isTabActive = !document.hidden;
  state.lastActiveTime = Date.now();
  console.log(`[Tracker] Tab ${state.isTabActive ? 'active' : 'inactive'}`);
});

// Update active time ONLY when tab is visible
function updateActiveTime() {
  const now = Date.now();
  const timeDiff = now - state.lastActiveTime;

  // ⭐ CRITICAL: Only count if tab is active AND within idle timeout
  if (state.isTabActive && timeDiff < CONFIG.idleTimeout) {
    state.activeTime += Math.round(timeDiff / 1000);
  }

  state.lastActiveTime = now;
}
```

**Time Tracking Logic:**
| Scenario | Result |
|----------|--------|
| User on page, tab visible | ✅ Time counts |
| User switches to another tab | ❌ Time PAUSES |
| User returns to tab | ✅ Time resumes |
| No interaction for 60 seconds | ❌ Time stops (idle) |
| User interacts again | ✅ Time resumes |

**Example Timeline:**
```
Timeline: [0s] --- [10s user leaves] --- [30s user returns] --- [40s]
Active:      ✅        ❌                     ✅                ✅
Time:      0→10s      paused              resumes          40s total
```

**HubSpot Property Updated:**
- Property: `timespent`
- Value: `245` (in seconds)
- Only counts seconds when tab was visible

---

## Requirement 3: Component Clicks, Scroll Depth, Media Plays & Other Important Data

### What You Asked:
> "I want component clicks, scroll depth, media plays and whatever important on page"

### What's Implemented: ✅

### A. Component Clicks
```javascript
// Tracks clicks on buttons, links, and custom clickables
document.addEventListener('click', (e) => {
  const target = e.target.closest('button, a, [role="button"], input[type="submit"]');
  if (target) {
    const { identifier, section, href } = getElementIdentifier(target);
    state.clicks.push({
      component: identifier,      // #button-id, .class-name, [role=button]
      text: target.textContent,   // "Book Now", "Learn More"
      section: section,            // "hero", "details", "footer"
      href: href,                  // "/booking", "#itinerary"
      timestamp: new Date().toISOString(),
    });
    state.hasCustomEngagement = true;
  }
});
```

**HubSpot Note Output:**
```
Components clicked: 3
 - #book-button | section: hero | text: Book Now | href: /booking
 - a.learn-more | section: details | text: Learn More | href: #itinerary
 - button.cta | section: footer | text: Get In Touch | href: /contact
```

### B. Scroll Depth
```javascript
// Captures maximum scroll depth as percentage
window.addEventListener('scroll', () => {
  const depth = getScrollDepth();
  if (depth > state.maxScrollDepth) {
    state.maxScrollDepth = depth;
    console.log(`[Tracker] Scroll depth: ${depth}%`);
  }
}, { passive: true });

function getScrollDepth() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  return documentHeight > 0 ? Math.round((scrolled / documentHeight) * 100) : 0;
}
```

**HubSpot Note Output:**
```
Max scroll depth: 87%
```

### C. Media Plays (Video/Audio)
```javascript
// Tracks video and audio play events
function setupMediaTracking() {
  const mediaElements = document.querySelectorAll('video, audio');
  mediaElements.forEach((media) => {
    media.addEventListener('play', () => {
      state.mediaPlays.push({
        type: media.tagName.toLowerCase(),  // "video" or "audio"
        title: media.title || media.src,     // "Hero Video"
        timestamp: new Date().toISOString(),
      });
      state.hasCustomEngagement = true;
    }, { once: true }); // Only track once per session per element
  });
}

// Watch for dynamically added media elements
function observeMediaChanges() {
  const observer = new MutationObserver(() => {
    setupMediaTracking();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
```

**HubSpot Note Output:**
```
Media plays: 2
 - video: Hero Video
 - video: Testimonial Video
```

### D. Additional Important Data
```javascript
const payload = {
  userId: getUserId(),                    // Anonymous user ID
  email: getUserEmail(),                  // Captured from form
  sessionStart: state.sessionStart,       // When user arrived
  activeTime: state.activeTime,           // Seconds (tab active)
  maxScrollDepth: state.maxScrollDepth,   // Percentage
  pageUrl: window.location.href,          // Current page URL
  pageTitle: document.title,              // Current page title
  clicks: state.clicks,                   // All clicks
  mediaPlays: state.mediaPlays,           // All media plays
  pageVisits: state.pageVisits,           // Route history
  hasCustomEngagement: state.hasCustomEngagement,  // Flag
  timestamp: Date.now(),                  // When data was sent
};
```

---

## Requirement 4: Add as hs_note_body (HubSpot Field)

### What You Asked:
> "and add as hs_note_body (hubspit field)"

### What's Implemented: ✅

**Backend (`api/tracker/track.php`):**
```php
// Create formatted note with all engagement data
function buildNoteBody($data) {
    $lines = [
        'Soulful Journeys website engagement',
        'Captured at: ' . date('Y-m-d H:i:s'),
        'Page: ' . safeLine($data['pageUrl'] ?? '', 500),
        'Page title: ' . safeLine($data['pageTitle'] ?? ''),
        'Active time this session: ' . (int)($data['activeTime'] ?? 0) . 's',
        'Max scroll depth: ' . (int)($data['maxScrollDepth'] ?? 0) . '%',
    ];

    appendEventLines($lines, 'Components clicked', $data['clicks'] ?? [], function ($event) {
        $parts = [safeLine($event['component'] ?? 'unknown')];
        if (!empty($event['section'])) $parts[] = 'section: ' . safeLine($event['section']);
        if (!empty($event['text'])) $parts[] = 'text: ' . safeLine($event['text']);
        if (!empty($event['href'])) $parts[] = 'href: ' . safeLine($event['href'], 220);
        return implode(' | ', $parts);
    });

    appendEventLines($lines, 'Page route visits', $data['pageVisits'] ?? [], ...);
    appendEventLines($lines, 'Media plays', $data['mediaPlays'] ?? [], ...);

    return implode("\n", $lines);
}

// Create HubSpot note with hs_note_body field
function createContactNote($token, $contactId, $noteBody) {
    return hubspotRequest('POST', '/crm/v3/objects/notes', $token, [
        'properties' => [
            'hs_timestamp' => date('c'),
            'hs_note_body' => $noteBody,  // ⭐ HubSpot native field
        ],
        'associations' => [[
            'to' => ['id' => $contactId],
            'types' => [[
                'associationCategory' => 'HUBSPOT_DEFINED',
                'associationTypeId' => HUBSPOT_NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID,
            ]],
        ]],
    ]);
}
```

**Complete HubSpot Note Example:**
```
Soulful Journeys website engagement
Captured at: 2026-06-10 14:35:22
Page: https://soulfuljourneystours.com/kasol-kheerganga
Page title: Kasol Kheerganga Trip
Active time this session: 245s
Max scroll depth: 87%

Components clicked: 3
 - #book-button | section: hero | text: Book Now | href: /booking
 - a.itinerary-link | section: details | text: See Itinerary | href: #itinerary
 - button.whatsapp | section: footer | text: Chat on WhatsApp | href: https://wa.me/...

Page route visits: 2
 - /home | Soulful Journeys
 - /kasol-kheerganga | Kasol Kheerganga Trip

Media plays: 1
 - video: Destination Hero Video
```

---

## Requirement 5: HubSpot ID from URL Parameter (?id=XXX)

### What You Asked:
> "I will be giving hubspot id as ?id=XXX"

### What's Implemented: ✅

**Frontend (`public/tracker.js`):**
```javascript
function getHubSpotId() {
  // Check URL parameter first (?id=xxx)
  const urlParams = new URLSearchParams(window.location.search);
  let hsId = urlParams.get('id') || urlParams.get('hubspot_id') || urlParams.get('hs_id');
  
  if (hsId) {
    localStorage.setItem('soulful_hubspot_id', hsId);  // Cache it
    return hsId;
  }

  return localStorage.getItem('soulful_hubspot_id');  // Use cached value
}
```

**Usage:**
```
Regular:  https://soulfuljourneystours.com/kasol-kheerganga?id=123456789
With UTM:  https://soulfuljourneystours.com?id=123456789&utm_source=email
From API:  https://soulfuljourneystours.com?id=[Contact ID]  ← HubSpot replaces
```

**Backend (`api/tracker/track.php`):**
```php
// Priority 1: URL parameter (highest)
$contact = getContactId(HUBSPOT_TOKEN, $_GET['id'] ?? null, $email);

function getContactId($token, $urlContactId, $email) {
    if ($urlContactId) {
        return [
            'contactId' => preg_replace('/[^0-9]/', '', $urlContactId),
            'source' => 'url_parameter',  // From URL
        ];
    }

    // Priority 2: Email lookup
    $existingContactId = findContactByEmail($token, $email);
    if ($existingContactId) {
        return [
            'contactId' => $existingContactId,
            'source' => 'email_lookup',  // Found by email
        ];
    }

    // Priority 3: Create new contact
    $createdContactId = createContact($token, $email);
    if ($createdContactId) {
        return [
            'contactId' => $createdContactId,
            'source' => 'email_created',  // New contact
        ];
    }

    // Priority 4: Anonymous
    return [
        'contactId' => null,
        'source' => 'anonymous',
    ];
}
```

**Backend Response:**
```json
{
  "status": "success",
  "message": "Tracking data processed and sent to HubSpot",
  "contactId": "123456789",
  "contactSource": "url_parameter",
  "timespentUpdated": true,
  "noteCreated": true,
  "noteId": "note_abc123xyz",
  "activeTime": 245,
  "maxScrollDepth": 87,
  "eventsProcessed": 5
}
```

---

## Summary: All Requirements Met ✅

| # | Requirement | Implementation | Status |
|---|------------|-----------------|--------|
| 1 | Page visits & HubSpot tracking | `trackPageVisit()` + note creation | ✅ |
| 2 | Time spent (seconds, tab active) | Visibility API + idle timeout | ✅ |
| 3 | Clicks + Scroll + Media + Data | All captured & formatted | ✅ |
| 4 | Send as `hs_note_body` | `createContactNote()` function | ✅ |
| 5 | HubSpot ID from `?id=XXX` | URL param extraction + priority | ✅ |

---

## How It Works End-to-End

### 1. User Clicks Link
```
https://soulfuljourneystours.com/kasol-kheerganga?id=123456789
                                                    ↑
                                          HubSpot Contact ID
```

### 2. Frontend Initializes
```javascript
console.log('[Tracker] ✓ Ready. Session started...');
console.log('[Tracker] HubSpot ID from URL: 123456789');
```

### 3. User Interacts
- Scrolls → Scroll depth tracked
- Clicks button → Click logged with section & href
- Plays video → Media play tracked
- Navigates (SPA) → Route change logged

### 4. Every 30 Seconds
Frontend sends batch to backend:
```javascript
POST /api/tracker/track.php?id=123456789
{
  activeTime: 245,
  maxScrollDepth: 87,
  clicks: [...],
  mediaPlays: [...],
  pageVisits: [...]
}
```

### 5. Backend Processes
- Finds contact by ID
- Updates `timespent` property
- Creates formatted HubSpot note
- Sends response back

### 6. HubSpot Updated
- Contact record has new note
- `timespent` property = 245 seconds
- All engagement visible in Activities tab

---

## Testing

**Test URL:**
```
https://soulfuljourneystours.com/kasol-kheerganga?id=123456789
```

**Verify in Console (F12):**
```
[Tracker] ✓ Ready. Session started: 2026-06-10T14:35:00.000Z
[Tracker] HubSpot ID from URL: 123456789
[Tracker] Scroll depth: 45%
[Tracker] Click tracked: #book-button Book Now
[Tracker] Media played: video - Hero Video
[Tracker] Data sent: {status: 'success', contactId: '123456789', ...}
```

**Verify in HubSpot:**
1. Open contact: ID 123456789
2. Go to Activities tab
3. Find new **Note** with engagement details

---

✅ **ALL REQUIREMENTS IMPLEMENTED AND READY TO TEST**

