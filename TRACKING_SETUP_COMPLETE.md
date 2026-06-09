# ✅ Tracking System - Implementation Complete

## Summary of Changes

### 🎯 Your Requirements Met

✅ **1. Track page visits with HubSpot native tracking**
- Page route changes captured with URL + page title
- Sent every 30 seconds + on page unload
- Stored in HubSpot notes

✅ **2. Time spent tracking - only when tab is ACTIVE** 
- Visibility API monitors tab focus
- Time NOT counted when tab is hidden/inactive
- Idle timeout: 60 seconds (stops counting if no interaction)
- Updates HubSpot `timespent` property (in seconds)

✅ **3. Comprehensive engagement tracking**
- Component clicks (with section & href context)
- Scroll depth (max percentage)
- Media plays (video/audio)
- All stored as `hs_note_body` in HubSpot

✅ **4. HubSpot ID from URL parameter (?id=XXX)**
- Highest priority contact identification
- Fallback to email lookup
- Stored in localStorage for persistence

---

## Files Modified

| File | Changes |
|------|---------|
| `public/tracker.js` | ✅ Complete rewrite - all features enabled |
| `api/tracker/track.php` | ✅ Enhanced - handles JSON + FormData |
| `index.html` | ✅ Already correct - loads tracker.js |

## Files No Longer Needed

- `api/track.php` ← Older version (legacy)

---

## Quick Test

### 1. Generate Test URL with HubSpot ID

```
https://soulfuljourneystours.com?id=123456789
```
(Replace 123456789 with actual HubSpot contact ID)

### 2. Open DevTools Console (F12)

You should see:
```
[Tracker] ✓ Ready. Session started: 2026-06-10T14:35:00.000Z
[Tracker] HubSpot ID from URL: 123456789
```

### 3. Interact with Page

- Scroll → See: `[Tracker] Scroll depth: 45%`
- Click button → See: `[Tracker] Click tracked: #button-id Button Text`
- Play video → See: `[Tracker] Media played: video - Title`

### 4. Wait 30+ seconds

Backend sends data automatically every 30 seconds + on page unload

### 5. Check HubSpot

Contact record → Activities tab → Find new **Note** with:
```
Soulful Journeys website engagement
Active time this session: 45s
Max scroll depth: 67%
Components clicked: 2
Media plays: 1
```

---

## Data Sent to HubSpot

### HubSpot Contact Properties Updated

| Property | Value | Example |
|----------|-------|---------|
| `timespent` | Seconds | `245` |
| `hs_note_body` | Formatted note | See below |

### Sample HubSpot Note (hs_note_body)

```
Soulful Journeys website engagement
Captured at: 2026-06-10 14:35:22
Page: https://soulfuljourneystours.com/kasol-kheerganga
Page title: Kasol Kheerganga Trip
Active time this session: 245s
Max scroll depth: 87%

Components clicked: 3
 - #book-button | section: hero | text: Book Now | href: /booking
 - a.details-link | text: Learn More
 - button.cta | section: footer | text: Contact Us

Media plays: 1
 - video: Hero Video

Page route visits: 2
 - /home | Home Page
 - /kasol-kheerganga | Kasol Kheerganga Trip
```

---

## Configuration Options

Edit `public/tracker.js` to customize:

```javascript
const CONFIG = {
  // API endpoint (relative - works everywhere)
  apiEndpoint: window.location.protocol + '//' + window.location.host + '/api/tracker/track.php',
  
  // How often to send data (milliseconds)
  batchInterval: 30000, // 30 seconds
  
  // Stop counting if inactive for this long
  idleTimeout: 60000, // 60 seconds
};
```

---

## Features Explained

### Active Time (Only Tab Active)

```
User on page, tab visible       → ✅ Time counts
User on page, tab hidden        → ❌ Time pauses  
User returns to visible tab     → ✅ Time resumes
No interaction for 60s          → ❌ Time pauses (idle)
User interacts again            → ✅ Time resumes
```

### Component Tracking

Automatically tracks clicks on:
- `<button>` elements
- `<a>` (links)
- `[role="button"]` (custom buttons)
- `<input type="submit">`
- `<input type="button">`

Captures:
- Element ID/class
- Parent section context
- Click text (first 30 chars)
- Target href (if link)

### Media Tracking

Automatically tracks:
- Video `<video>` play events
- Audio `<audio>` play events

Prevents:
- Duplicate listeners if called multiple times
- Multiple plays of same element per session

### Page Visit Tracking

Detects:
- Route/URL changes (SPA)
- Page title changes
- Navigation history

Checks:
- Every 1 second for pathname changes
- Watches document title mutations

### Unload Tracking

When user closes tab/page:
- Sends final data batch via `navigator.sendBeacon()`
- Works even if page is closing
- Survives browser shutdown

---

## Contact ID Priority

When data arrives at backend, it looks for contact in this order:

1. **URL Parameter** (highest priority): `?id=123456789`
   - Use this for tracked links from HubSpot

2. **Email Lookup**: Searches for existing contact by email
   - If found, uses that contact ID
   - If not found, creates new contact

3. **Create New**: Creates new contact if email provided
   - Lifecycle stage set to "lead"

4. **Anonymous**: If no ID and no email
   - Data received but not linked to contact (yet)
   - Waits for email to be captured

---

## HubSpot Integration Points

### Setup in HubSpot

1. **Create a workflow trigger**
   - When contact takes action → Send email with tracking link
   - Link should be: `https://yoursite.com?id=[Contact ID]`

2. **View tracking data**
   - Open contact record
   - Activities tab → Find notes with engagement data
   - Contact properties → `timespent` field shows total seconds

3. **Create reports**
   - Filter by `timespent` > X seconds
   - Find most engaged contacts
   - Trigger follow-up workflows based on engagement

### Example Workflow URL

```
https://soulfuljourneystours.com/manali?id=[Contact ID]
```

HubSpot will replace `[Contact ID]` with actual ID when sending

---

## Testing Scenarios

### Scenario 1: Basic Tracking
1. Visit site with `?id=12345`
2. Scroll down
3. Click a button
4. Wait 30 seconds
5. ✅ Check HubSpot → Note appears with all data

### Scenario 2: Tab Inactive (Time Pauses)
1. Visit site with `?id=12345`
2. Wait 10 seconds (time = 10s)
3. Switch to other tab
4. Wait 20 seconds
5. Return to tab
6. Wait 10 more seconds
7. ✅ Total time = 20s (not 40s) - time paused while away

### Scenario 3: Long Session
1. Visit site with `?id=12345`
2. Spend 2 hours browsing
3. Interacting occasionally
4. ✅ HubSpot shows: `timespent: 7200` (seconds)

### Scenario 4: Multi-page SPA
1. Visit site: `/home` with `?id=12345`
2. Navigate to `/kasol-kheerganga`
3. Navigate to `/booking`
4. Wait 30 seconds
5. ✅ HubSpot note shows all 3 pages visited

### Scenario 5: Media + Clicks
1. Visit page with video
2. Scroll to video section
3. Play video
4. Click "Book Now" button
5. Wait 30 seconds
6. ✅ HubSpot note shows: 1 media play + 1 click

---

## Monitoring & Debugging

### Console Logs

```javascript
[Tracker] ✓ Ready                        // Initialized
[Tracker] HubSpot ID from URL: 12345   // Found ID
[Tracker] Scroll depth: 45%              // Scroll tracked
[Tracker] Click tracked: #btn Text      // Click tracked
[Tracker] Media played: video - Title   // Media tracked
[Tracker] Data sent: {...}               // Batch sent
[Tracker] Tab inactive                   // Time paused
[Tracker] Tab active                     // Time resumed
```

### Network Inspector

1. Open DevTools → Network tab
2. Filter by: `/api/tracker/track.php`
3. Should see requests every 30 seconds
4. Response should show: `"status": "success"`

### HubSpot Verification

1. Open contact record (ID: 12345)
2. Look for:
   - **Activities tab** → New notes with engagement
   - **Contact properties** → `timespent` field updated
   - **Property history** → See all changes

---

## Common Issues & Solutions

### "No tracking data in HubSpot"

**Checklist:**
- [ ] URL includes `?id=12345`
- [ ] Console shows `[Tracker] HubSpot ID from URL: 12345`
- [ ] HUBSPOT_TOKEN is set in `config/env.php`
- [ ] Network tab shows successful requests to `/api/tracker/track.php`
- [ ] Contact with that ID exists in HubSpot

### "Active time stuck at 0"

**Check:**
- [ ] Browser tab is focused/visible
- [ ] Console shows interaction logs (`Click tracked`, `Scroll depth`)
- [ ] Wait 30+ seconds for batch send

### "Only seeing partial data"

**Likely cause:**
- Time paused while tab was hidden
- Only clicks/media from last 30 seconds included
- Check: Switch away and back, see if time resumes

---

## Next Steps

1. ✅ Test with HubSpot contact ID
2. ✅ Verify data appears in HubSpot
3. ✅ Create HubSpot workflow with tracking link
4. ✅ Monitor engagement metrics
5. ✅ Set up automated follow-ups based on engagement

---

## Reference Links

- **Frontend**: [tracker.js](public/tracker.js)
- **Backend**: [api/tracker/track.php](api/tracker/track.php)
- **Full Docs**: [TRACKING_IMPLEMENTATION.md](TRACKING_IMPLEMENTATION.md)
- **Original Audit**: [TRACKING_AUDIT.md](TRACKING_AUDIT.md)

