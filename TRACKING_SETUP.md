# User Tracking Funnel - Integration Guide

## Overview

Tracks user engagement metrics and syncs to HubSpot:
- **Active Time Spent** on page (when tab is active)
- **Scroll Depth** (% scrolled)
- **Component Clicks** (buttons, links, interactions)

Data is sent to HubSpot every 30 seconds and also on page unload.

---

## Quick Setup (3 steps)

### 1. Add Tracker Script to `index.html`

Add this line **before closing `</body>` tag** in [index.html](index.html):

```html
<script src="/tracker.js"></script>
```

Example:
```html
  ...
  <footer>...</footer>
  <script src="/tracker.js"></script>
</body>
```

### 2. Verify PHP Backend

File `api/track.php` is already set up. It:
- Receives tracking data from the browser
- Authenticates with HubSpot using `HUBSPOT_TOKEN` from `config/env.php`
- Updates HubSpot contact properties

**Verify `/config/env.php` has:**
```php
define('HUBSPOT_TOKEN', 'pXXXXXXXXXXXXXX23');
```

### 3. Test in Browser

1. Open DevTools (F12) and go to Console tab
2. Visit your site
3. You should see logs like:
   ```
   [Tracker] Initializing tracking...
   [Tracker] Ready. Session started: 2026-06-10T...
   [Tracker] Scroll depth: 25%
   [Tracker] Click tracked: #contact-button "Get In Touch"
   [Tracker] Data sent: {status: 'success', ...}
   ```

---

## What Gets Tracked

| Metric | Where Saved | How | Notes |
|--------|-------------|-----|-------|
| Active Time | `timespent` property | Cumulative seconds when tab is active | Resets per session, accumulated on HubSpot |
| Scroll Depth | `notes` property | % of page scrolled (max) | Updated per batch |
| Clicks | `notes` property | Component ID + text clicked | All button/link clicks tracked |

### Notes Property Format

Data is appended to HubSpot `notes` like:
```
=== Session 2026-06-10 14:23:45 ===
Active Time: 125s
Max Scroll Depth: 67%
Clicks: 3
  - #cta-button (Book Now)
  - a.link (Learn More)
  - button.subscribe (Subscribe)
Page: https://soulfuljourneystours.com/manali
```

---

## Configuration

Edit [public/tracker.js](public/tracker.js) top section if you need to adjust:

```javascript
const CONFIG = {
  apiEndpoint: '/api/track.php',    // Backend URL
  batchInterval: 30000,              // Send every 30 seconds (ms)
  idleTimeout: 60000,                // Inactive after 60s (ms)
};
```

---

## How It Works

### Frontend (`public/tracker.js`)

1. **Initializes on page load** — creates unique session ID, stores in localStorage
2. **Tracks active time** — only counts seconds when tab is focused (visibility API)
3. **Monitors scroll** — records maximum scroll depth %
4. **Listens for clicks** — on buttons, links, form inputs
5. **Batches data every 30s** — sends to `/api/track.php`
6. **Page unload** — sends final batch using `sendBeacon` API

### Backend (`api/track.php`)

1. **Receives JSON payload** from tracker script
2. **Looks up or creates HubSpot contact** (by email if available)
3. **Updates HubSpot properties:**
   - `timespent` ← active seconds
   - `notes` ← appended with scroll depth + clicks
4. **Returns success/error** to browser

---

## HubSpot Setup

### Verify Portal ID

Portal ID already configured: `44702223`

To verify, check HubSpot URL:
```
https://app-na2.hubspot.com/contacts/44702223/...
                                       ^^^^^^^^
```

### HubSpot Properties Used

- **`timespent`** (custom) — Total active seconds
- **`notes`** (standard) — Interaction history (scrolls, clicks)

Both are editable on HubSpot free tier.

---

## Testing & Debugging

### Browser Console

Script logs all events. Look for `[Tracker]` prefix:

```javascript
// In browser console, check:
localStorage.getItem('soulful_tracker_uid')
// Returns: "user_1686048234_abc123def"

// Monitor network:
// Open DevTools → Network tab → filter "track.php"
// Should see POST requests every 30 seconds
```

### Server Logs

Check PHP error logs if tracking fails:
```bash
tail -f /var/log/php-errors.log
```

Common issues:
- `HUBSPOT_TOKEN` not found → Check `/config/env.php`
- CORS error → Ensure `api/track.php` has CORS headers (already added)
- 403 Forbidden → HubSpot token might be expired

### Live Test

1. Go to your site
2. Scroll around (should log scroll depth)
3. Click buttons (should log clicks)
4. Wait 30s or refresh (should send to HubSpot)
5. Check HubSpot contact `notes` field — should see your data

---

## Privacy & Compliance

### What's NOT tracked
- ✅ No passwords or sensitive input data
- ✅ No cookies set (uses localStorage for session ID only)
- ✅ Only tracks on your domain (same-origin only)

### To Add Consent

Edit `public/tracker.js` — before `init()` call:

```javascript
// Example: Only track if user consents
if (localStorage.getItem('tracking_consent') !== 'yes') {
  console.log('[Tracker] Tracking disabled (no consent)');
  return;
}
init();
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No logs in console | Reload page, check DevTools is open |
| "Failed to fetch /api/track.php" | Check PHP file exists, CORS headers enabled |
| Data not appearing in HubSpot | Check token in env.php, verify API response in Network tab |
| Timespent not incrementing | Ensure tab is active, wait 30s for batch send |
| Scroll depth stuck at 0% | Try scrolling more than one screen height |

---

## Production Checklist

- [ ] `index.html` has `<script src="/tracker.js"></script>` before `</body>`
- [ ] `/api/track.php` exists and is executable
- [ ] `/config/env.php` has valid `HUBSPOT_TOKEN`
- [ ] HubSpot portal ID is correct (44702223)
- [ ] Test page loads without JS errors (check console)
- [ ] Test data appears in HubSpot `notes` after 30s
- [ ] Monitor server logs for PHP errors
- [ ] Consider adding consent banner if required by GDPR/privacy policy

---

## Support

For issues or feature requests, check:
1. Browser console for `[Tracker]` errors
2. Network tab for failed `/api/track.php` requests
3. HubSpot contact detail view (should have updated `notes` and `timespent`)

---

**Files Involved:**
- Frontend: [public/tracker.js](public/tracker.js)
- Backend: [api/track.php](api/track.php)
- Config: [config/env.php](../config/env.php)
- HTML: [index.html](../index.html)
