# Local Testing - HubSpot Contact ID: 499421296375

## Quick Test Steps

### Step 1: Start Dev Server
```bash
npm run dev
```
Your dev server should be running on `http://localhost:5173` (or similar)

### Step 2: Open Test URL with Contact ID

Visit any page with the contact ID parameter:
```
http://localhost:5173/?id=499421296375
```

Or any page:
```
http://localhost:5173/kasol-kheerganga?id=499421296375
http://localhost:5173/goa?id=499421296375
http://localhost:5173/booking?id=499421296375
```

### Step 3: Open DevTools (F12) → Console Tab

You should immediately see:
```
[Tracker] Initializing tracking...
[Tracker] ✓ Ready. Session started: 2026-06-10T14:35:00.000Z
[Tracker] HubSpot ID from URL: 499421296375
```

✅ **If you see this, HubSpot ID was captured correctly!**

### Step 4: Interact with Page

- **Scroll down** → Watch console
  ```
  [Tracker] Scroll depth: 25%
  [Tracker] Scroll depth: 50%
  [Tracker] Scroll depth: 87%
  ```

- **Click a button** → Watch console
  ```
  [Tracker] Click tracked: #book-button Book Now
  [Tracker] Click tracked: a.learn-more Learn More
  ```

- **Play a video** (if page has one)
  ```
  [Tracker] Media played: video - Hero Video
  ```

- **Navigate to another page** (SPA)
  ```
  [Tracker] Page visited: /kasol-kheerganga - Kasol Kheerganga Trip
  ```

### Step 5: Wait 30+ Seconds

After 30 seconds you should see:
```
[Tracker] Data sent: {
  status: 'success',
  contactId: '499421296375',
  contactSource: 'url_parameter',
  timespentUpdated: true,
  noteCreated: true,
  activeTime: 45,
  maxScrollDepth: 67,
  eventsProcessed: 3
}
```

✅ **If you see this, backend received and processed data!**

### Step 6: Check Network Tab

1. Open DevTools → **Network** tab
2. Filter by: type `Fetch`
3. Look for requests to `/api/tracker/track.php`
4. You should see requests every 30 seconds

**Click one request** to see:
- **Request body** (what was sent)
- **Response** (what backend returned)

Example response:
```json
{
  "status": "success",
  "message": "Tracking data processed and sent to HubSpot",
  "contactId": "499421296375",
  "contactSource": "url_parameter",
  "timespentUpdated": true,
  "noteCreated": true,
  "noteId": "note_abc123xyz",
  "activeTime": 45,
  "maxScrollDepth": 87,
  "eventsProcessed": 5
}
```

---

## Troubleshooting

### "HubSpot ID not showing in console"

❌ Problem: `[Tracker] HubSpot ID from URL:` missing or blank

**Fix:**
- Check URL has `?id=499421296375`
- Refresh page (Ctrl+R or Cmd+R)
- Check localStorage: Open DevTools → Application → LocalStorage → Look for `soulful_hubspot_id`

### "No data being sent to backend"

❌ Problem: No `/api/tracker/track.php` requests in Network tab

**Fix:**
1. Check console for errors: `[Tracker] Send failed:`
2. Verify backend is accessible: Visit `http://localhost:5173/api/tracker/track.php` directly
3. Check CORS headers are set (they should be in the code)

### "Status 500 error from backend"

❌ Problem: Backend returns error response

**Fix:**
1. Check `config/env.php` has `HUBSPOT_TOKEN` defined
2. Look at response body for error message:
   ```json
   { "error": "HUBSPOT_TOKEN not defined in config/env.php" }
   ```

### "Active time stuck at 0"

❌ Problem: `activeTime` always 0

**Fix:**
- Browser tab must be **visible/focused** for time to count
- Switch away and come back - time should resume
- Wait 30+ seconds to ensure batch send happens

### "Clicks not being tracked"

❌ Problem: No `[Tracker] Click tracked:` messages

**Fix:**
- Click on: `<button>`, `<a>`, `[role="button"]`, `<input type="submit">`
- Try clicking a button on the page
- Check: Element must match selector

---

## Complete Test Workflow

### ✅ Full Test (5 minutes)

1. **Visit URL with ID**
   ```
   http://localhost:5173/kasol-kheerganga?id=499421296375
   ```

2. **Open Console (F12)**
   - Verify `[Tracker] HubSpot ID from URL: 499421296375`

3. **Spend 30+ seconds on page**
   - Scroll at least once
   - Click at least one button
   - Play video if available

4. **Wait for batch send** (30 seconds)
   - Should see `[Tracker] Data sent: {status: 'success',...}`

5. **Check Network tab**
   - Should see POST to `/api/tracker/track.php`
   - Response shows `"status": "success"`

6. **Switch tabs and return**
   - Time should pause while away
   - Resume when returning

7. **Close tab**
   - Final batch sent via `sendBeacon`

### ✅ Expected Results

**Console:**
```
[Tracker] Initializing tracking...
[Tracker] ✓ Ready. Session started: 2026-06-10T14:40:00.000Z
[Tracker] HubSpot ID from URL: 499421296375
[Tracker] Tab active - active time NOT counted while hidden
[Tracker] Scroll depth: 45%
[Tracker] Scroll depth: 67%
[Tracker] Click tracked: #book-button Book Now
[Tracker] Media played: video - Hero Video
[Tracker] Data sent: {status: 'success', contactId: '499421296375', ...}
```

**Network Tab:**
- Multiple POST requests to `/api/tracker/track.php`
- Each with status 200 OK
- Response: `"status": "success"`

**HubSpot (after batch sent):**
- Contact ID: 499421296375
- New **Note** in Activities tab
- `timespent` property updated
- All engagement details in note body

---

## API Response Codes

### ✅ 200 - Success
```json
{
  "status": "success",
  "message": "Tracking data processed and sent to HubSpot",
  "contactId": "499421296375"
}
```

### ⚠️ 202 - Anonymous User
```json
{
  "status": "anonymous",
  "message": "Engagement received, but no HubSpot contact id or email is available yet.",
  "userId": "user_xxx",
  "contactSource": "anonymous"
}
```

### ❌ 400 - Bad Request
```json
{
  "error": "Invalid input - no data received"
}
```

### ❌ 500 - Server Error
```json
{
  "error": "HUBSPOT_TOKEN not defined in config/env.php"
}
```

---

## Test URLs

### Home Page
```
http://localhost:5173/?id=499421296375
```

### Trip Pages
```
http://localhost:5173/kasol-kheerganga?id=499421296375
http://localhost:5173/goa?id=499421296375
http://localhost:5173/chopta-tungnath?id=499421296375
http://localhost:5173/jibhi-tirthan?id=499421296375
http://localhost:5173/udaipur-mount-abu?id=499421296375
http://localhost:5173/manali-kasol-chills?id=499421296375
http://localhost:5173/kashmir-backpacking?id=499421296375
http://localhost:5173/kedarnath?id=499421296375
```

### Other Pages
```
http://localhost:5173/booking?id=499421296375
http://localhost:5173/contact?id=499421296375
http://localhost:5173/about?id=499421296375
```

---

## Monitoring Real-Time

### Watch Console in Real-Time
```bash
# In DevTools Console, you can type:
getHubSpotId()  # Returns the contact ID
```

### Check State in Console
```bash
# Try these in console to debug:
localStorage.getItem('soulful_hubspot_id')  # Get cached ID
localStorage.getItem('soulful_tracker_uid')  # Get user ID
localStorage.getItem('soulful_tracker_email')  # Get email
```

---

## Summary

**Test URL:** 
```
http://localhost:5173/?id=499421296375
```

**What to look for:**
1. ✅ Console shows `HubSpot ID from URL: 499421296375`
2. ✅ Network tab shows requests to `/api/tracker/track.php`
3. ✅ Response shows `"status": "success"`
4. ✅ HubSpot contact note appears in Activities tab

If all ✅ = **Tracking works perfectly!**

