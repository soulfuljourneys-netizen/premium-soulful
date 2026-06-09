# Tracking Implementation - Complete Setup

## What Was Updated

### 1. Frontend: `public/tracker.js`
✅ **Complete overhaul** with all tracking features enabled:

- **Active Time Tracking** (seconds, only when tab is active)
  - Visibility API monitors tab focus
  - Time NOT counted when tab is hidden
  - Updates `timespent` property in HubSpot

- **Scroll Depth Tracking** (percentage)
  - Captures maximum scroll depth
  - Sent to HubSpot notes

- **Component Click Tracking** (enhanced)
  - Captures element ID, class, role
  - Includes section/container context
  - Includes link href
  - Includes click text

- **Media Play Tracking** (with duplicate prevention)
  - Tracks video and audio plays
  - Prevents duplicate event listeners
  - Watches for dynamically added media

- **Page Visit Tracking** (for SPA routing)
  - Tracks page route changes
  - Captures page title
  - Monitors for dynamic title updates

- **HubSpot ID from URL Parameter** (?id=XXX)
  - Reads from URL query parameter
  - Stores in localStorage for persistence
  - Highest priority for contact identification

### 2. Backend: `api/tracker/track.php`
✅ **Enhanced to handle all data formats:**

- **Accepts both JSON and FormData**
  - Regular fetch calls send JSON
  - sendBeacon uses FormData (fallback)
  - Auto-detects content type

- **Creates HubSpot Contact Notes**
  - Field: `hs_note_body` (HubSpot native field)
  - Includes all engagement data
  - Properly formatted for readability

- **Updates Contact Properties**
  - `timespent`: Active time in seconds
  - Handles contact creation if needed
  - Uses URL parameter ID with priority

- **Contact ID Resolution (Priority Order)**
  1. URL parameter: `?id=XXX` (highest priority)
  2. Email lookup: Find existing contact by email
  3. Create new: Create contact if email provided
  4. Anonymous: Store if no ID or email available

---

## How to Use

### Step 1: Add HubSpot ID to Tracking Link

When sending users to your site, include the HubSpot contact ID:

```
https://soulfuljourneystours.com/page?id=123456789
```

Or from HubSpot workflow:
```
https://soulfuljourneystours.com?id=[Contact ID]
```

### Step 2: Check Browser Console

Open DevTools (F12) → Console tab. You should see:

```
[Tracker] Initializing tracking...
[Tracker] ✓ Ready. Session started: 2026-06-10T14:30:00.000Z
[Tracker] HubSpot ID from URL: 123456789
[Tracker] Tab active - active time NOT counted while hidden
[Tracker] Scroll depth: 25%
[Tracker] Click tracked: #contact-button Book Now
[Tracker] Media played: video - Hero Video
[Tracker] Page visited: /kasol-kheerganga - Kasol Kheerganga Trip
```

### Step 3: Verify in HubSpot

After user visits for 30+ seconds:

1. Open HubSpot contact record (ID: 123456789)
2. Check **Activities** tab → Find **Note**
3. You'll see formatted engagement data:

```
Soulful Journeys website engagement
Captured at: 2026-06-10 14:35:22
Page: https://soulfuljourneystours.com/kasol-kheerganga
Page title: Kasol Kheerganga Trip
Active time this session: 245s
Max scroll depth: 87%

Components clicked: 3
 - #book-button | section: hero | text: Book Now | href: /booking
 - a.learn-more | section: details | text: Learn More | href: #itinerary
 - button.cta | section: footer | text: Get In Touch

Media plays: 1
 - video: Hero Video

Page route visits: 2
 - /home | Home
 - /kasol-kheerganga | Kasol Kheerganga Trip
```

4. Check **Contact Details** → Field: `Time spent`
   - Shows total seconds: `245`

---

## Data Collection Breakdown

### What Gets Tracked

| Metric | Where | How Often | Notes |
|--------|-------|-----------|-------|
| Active Time | timespent property | Every 30s | Only when tab active |
| Max Scroll Depth | hs_note_body | Every 30s | Percentage scrolled |
| Component Clicks | hs_note_body | Every 30s | With section & href |
| Media Plays | hs_note_body | Every 30s | Video/audio only |
| Page Visits | hs_note_body | Every 30s | Route changes in SPA |
| Page Title | hs_note_body | Every 30s | Captured dynamically |

### Payload Structure Sent to Backend

```json
{
  "userId": "user_1234567890_abc123xyz",
  "email": "user@example.com",
  "sessionStart": 1717964400000,
  "activeTime": 245,
  "maxScrollDepth": 87,
  "pageUrl": "https://soulfuljourneystours.com/kasol-kheerganga",
  "pageTitle": "Kasol Kheerganga Trip",
  "clicks": [
    {
      "component": "#book-button",
      "text": "Book Now",
      "section": "hero",
      "href": "/booking",
      "timestamp": "2026-06-10T14:32:10.000Z"
    }
  ],
  "mediaPlays": [
    {
      "type": "video",
      "title": "Hero Video",
      "timestamp": "2026-06-10T14:31:45.000Z"
    }
  ],
  "pageVisits": [
    {
      "url": "/kasol-kheerganga",
      "title": "Kasol Kheerganga Trip",
      "timestamp": "2026-06-10T14:31:20.000Z"
    }
  ],
  "hasCustomEngagement": true,
  "timestamp": 1717964460000
}
```

---

## Key Features Implemented

### ✅ Active Time (Only When Tab Active)

```javascript
// Time counted when tab visible
Tab visible → Time += elapsed
// Time NOT counted when tab hidden  
Tab hidden → Time stays same (doesn't reset, but doesn't accumulate)
// Idle timeout (60s inactivity) stops counting
No interaction > 60s → Time pauses
```

### ✅ Component Click Context

Each click now captures:
- **Component ID/Class**: `#book-button`, `.learn-more`, `[role="button"]`
- **Section**: Which section container the element is in
- **Text**: What text was clicked (first 30 chars)
- **Href**: Target link (if applicable)
- **Timestamp**: When clicked

### ✅ Media Tracking (No Duplicates)

- Uses marker `element.__trackerSetup` to prevent duplicate listeners
- Watches for dynamically added media elements
- Only tracks first play per session per element (`{ once: true }`)

### ✅ Page Visit Tracking (SPA-Aware)

- Monitors title tag mutations
- Checks pathname every 1 second
- Captures both URL and page title
- Excludes initial page load (only logs subsequent visits)

### ✅ HubSpot Note Creation

Each tracking batch creates a formatted HubSpot note with:
- Engagement summary (time, scroll depth)
- Clickable components list
- Media plays
- Route history
- Timestamp

---

## Testing Checklist

### Quick Test

1. Open site with HubSpot ID: `?id=12345`
2. Open DevTools Console (F12)
3. Verify logs appear:
   - `[Tracker] ✓ Ready`
   - `[Tracker] HubSpot ID from URL: 12345`

### Full Test Flow

- [ ] Spend 30+ seconds on page (console shows active time)
- [ ] Scroll down (should log `[Tracker] Scroll depth: X%`)
- [ ] Click a button/link (should log `[Tracker] Click tracked:`)
- [ ] Switch to another tab and come back (verify time doesn't increase while away)
- [ ] Close the tab (data sent via sendBeacon)
- [ ] Check HubSpot contact record (should have note + timespent updated)

### Console Output Expected

```
[Tracker] Initializing tracking...
[Tracker] ✓ Ready. Session started: 2026-06-10T14:30:00.000Z
[Tracker] HubSpot ID from URL: 12345
[Tracker] Tab active - active time NOT counted while hidden
[Tracker] Scroll depth: 25%
[Tracker] Tab inactive - active time NOT counted while hidden
[Tracker] Tab active - active time NOT counted while hidden
[Tracker] Click tracked: #book-button Book Now
[Tracker] Media played: video - Hero Video
[Tracker] Data sent: {status: 'success', contactId: '12345', ...}
```

---

## Configuration

To adjust tracking behavior, edit `public/tracker.js`:

```javascript
const CONFIG = {
  // Relative URL (works in dev & prod)
  apiEndpoint: window.location.protocol + '//' + window.location.host + '/api/tracker/track.php',
  
  // Send data every 30 seconds
  batchInterval: 30000,
  
  // Stop counting active time after 60s of inactivity
  idleTimeout: 60000,
};
```

---

## Troubleshooting

### "No data in HubSpot contact"

1. **Check console for errors**
   - Open DevTools → Console
   - Look for `[Tracker] Send failed:` messages
   - Check network tab for API response errors

2. **Verify HubSpot ID is passed**
   - URL should include `?id=12345`
   - Console should show `[Tracker] HubSpot ID from URL: 12345`
   - If blank, ID may not be in URL

3. **Verify HUBSPOT_TOKEN is set**
   - Check `config/env.php` has `HUBSPOT_TOKEN` defined
   - API calls to HubSpot will fail silently without it

4. **Check backend response**
   - Network tab → Find request to `/api/tracker/track.php`
   - Response should show `"status": "success"`
   - If error, response will show error message

### "Active time not updating"

1. **Is the tab hidden?**
   - Active time only counts when tab is visible
   - Switch away and back - time should resume

2. **Is backend receiving data?**
   - Network tab → Check `/api/tracker/track.php` requests
   - Should see requests every 30 seconds

### "Clicks not tracked"

1. **Check element selector**
   - Tracker only monitors: `button`, `a`, `[role="button"]`, `input[type="submit"]`, `input[type="button"]`
   - Custom clickable divs won't be tracked

2. **Check console for click logs**
   - Should see `[Tracker] Click tracked:` messages
   - If missing, element doesn't match selectors

---

## API Response Examples

### ✅ Success (200)

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

### ⚠️ Anonymous User (202)

```json
{
  "status": "anonymous",
  "message": "Engagement received, but no HubSpot contact id or email...",
  "userId": "user_1234567890_abc123xyz",
  "contactSource": "anonymous"
}
```

### ❌ Error (5xx)

```json
{
  "error": "HUBSPOT_TOKEN not defined in config/env.php"
}
```

---

## Files Modified

- ✅ `public/tracker.js` - Complete rewrite with all features
- ✅ `api/tracker/track.php` - Enhanced to handle JSON + FormData
- ✅ `index.html` - Already loads tracker.js correctly

## Files No Longer Needed

- ⚠️ `api/track.php` - Legacy version, can be deleted (renamed to `track.php.old`)

---

## Next Steps

1. **Test with HubSpot ID parameter**
   - Generate test link with HubSpot contact ID
   - Visit and verify data appears in HubSpot

2. **Create HubSpot workflow trigger**
   - Send tracking link when contact performs action
   - Link should include `?id=[Contact ID]`

3. **Monitor tracking in HubSpot**
   - Create reports based on time spent + engagement
   - Set up alerts for high engagement contacts

4. **Optional: Add custom tracking**
   - Add `data-section="my-section"` to containers
   - Tracker will automatically capture section context

