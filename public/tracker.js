/**
 * Soulful Journeys - User Tracking Funnel
 * Tracks: Active time (when tab active), Scroll depth, Component clicks, Media plays, Page visits
 * Sends to: /api/tracker/track.php (creates HubSpot notes)
 */

(function() {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    apiEndpoint: 'https://soulfuljourneystours.com/api/tracker/track.php',
    batchInterval: 30000, // Send data every 30 seconds
    idleTimeout: 60000, // Consider inactive after 60s (only count active time within this)
  };

  /**
   * Get HubSpot contact ID from URL parameter or storage
   */
  function getHubSpotId() {
    // Check URL parameter first (?id=xxx or ?hubspot_id=xxx)
    const urlParams = new URLSearchParams(window.location.search);
    let hsId = urlParams.get('id') || urlParams.get('hubspot_id') || urlParams.get('hs_id');
    if (hsId) {
      localStorage.setItem('soulful_hubspot_id', hsId);
      return hsId;
    }

    // Fall back to localStorage
    return localStorage.getItem('soulful_hubspot_id');
  }

  // ===== STATE =====
  const state = {
    sessionStart: Date.now(),
    activeTime: 0, // seconds (only when tab active)
    lastActiveTime: Date.now(),
    isTabActive: true,
    maxScrollDepth: 0,
    clicks: [], // array of {component, text, section, href, timestamp}
    mediaPlays: [], // array of {type, title, timestamp}
    pageVisits: [], // array of {url, title, timestamp}
    pageTitle: document.title,
    currentPage: window.location.pathname,
    hasCustomEngagement: false, // flag if we have clicks/media/pages to report
  };

  // ===== HELPERS =====

  /**
   * Get or create anonymous user ID (stored in localStorage)
   */
  function getUserId() {
    const key = 'soulful_tracker_uid';
    let uid = localStorage.getItem(key);
    if (!uid) {
      uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(key, uid);
    }
    return uid;
  }

  /**
   * Calculate scroll depth as percentage
   */
  function getScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    return documentHeight > 0 ? Math.round((scrolled / documentHeight) * 100) : 0;
  }

  /**
   * Get user email (from localStorage, form fields, or cookies)
   */
  function getUserEmail() {
    // Check localStorage first
    let email = localStorage.getItem('soulful_tracker_email');
    if (email) return email;

    // Try to find email from form inputs on page
    const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');
    for (let input of emailInputs) {
      if (input.value && input.value.includes('@')) {
        email = input.value;
        localStorage.setItem('soulful_tracker_email', email);
        return email;
      }
    }

    // Try HubSpot's tracking cookie (if their script is loaded)
    if (typeof hubspot !== 'undefined' && hubspot.pageViewId) {
      // HubSpot context available but email not directly accessible
      // Will be captured when form is submitted
    }

    return null;
  }

  /**
   * Update active time (only if tab is active)
   */
  function updateActiveTime() {
    const now = Date.now();
    const timeDiff = now - state.lastActiveTime;

    // Only count time if tab was active and within idle timeout
    if (state.isTabActive && timeDiff < CONFIG.idleTimeout) {
      state.activeTime += Math.round(timeDiff / 1000);
    }

    state.lastActiveTime = now;
  }

  /**
   * Get element identifier and context (class, id, role, section, href)
   */
  function getElementIdentifier(element) {
    let section = '';
    let href = '';
    
    // Find section/container context
    const sectionParent = element.closest('section, [data-section], .section, .container');
    if (sectionParent) {
      section = sectionParent.id || sectionParent.getAttribute('data-section') || sectionParent.className.split(' ')[0];
    }
    
    // Get href if it's a link
    if (element.href) {
      href = element.href;
    } else if (element.getAttribute('data-href')) {
      href = element.getAttribute('data-href');
    }
    
    // Primary identifier
    let identifier = '';
    if (element.id) identifier = `#${element.id}`;
    else if (element.className) identifier = `.${element.className.split(' ')[0]}`;
    else if (element.getAttribute('role')) identifier = `[${element.getAttribute('role')}]`;
    else if (element.getAttribute('data-testid')) identifier = `[${element.getAttribute('data-testid')}]`;
    else identifier = element.tagName.toLowerCase();
    
    return { identifier, section, href };
  }

  /**
   * Track page/route change (for SPA navigation)
   */
  function trackPageVisit() {
    const currentPath = window.location.pathname;
    const pageTitle = document.title;
    
    // Only log if actually different
    if (currentPath !== state.currentPage || pageTitle !== state.pageTitle) {
      state.currentPage = currentPath;
      state.pageTitle = pageTitle;
      
      if (state.pageVisits.length > 0) { // Don't log initial page load
        state.pageVisits.push({
          url: currentPath,
          title: pageTitle,
          timestamp: new Date().toISOString(),
        });
        state.hasCustomEngagement = true;
        console.log(`[Tracker] Page visited: ${currentPath} - ${pageTitle}`);
      }
    }
  }

  /**
   * Watch for page title changes (SPA route changes may update title)
   */
  function observePageChanges() {
    // Watch title changes
    const titleObserver = new MutationObserver(trackPageVisit);
    titleObserver.observe(document.querySelector('title'), { 
      childList: true, 
      subtree: true 
    });
    
    // Also track pathname changes (for some SPAs)
    const checkPagePath = setInterval(() => {
      trackPageVisit();
    }, 1000); // Check every second
    
    return checkPagePath;
  }

  /**
   * Setup media tracking (video/audio) - with duplicate prevention
   */
  function setupMediaTracking() {
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach((media) => {
      // Prevent duplicate listeners by checking for marker
      if (media.__trackerSetup) return;
      media.__trackerSetup = true;
      
      media.addEventListener('play', () => {
        const title = media.title || media.src || media.querySelector('source')?.src || 'Unnamed Media';
        const type = media.tagName.toLowerCase();
        state.mediaPlays.push({
          type: type,
          title: title.substring(0, 80),
          timestamp: new Date().toISOString(),
        });
        state.hasCustomEngagement = true;
        console.log(`[Tracker] Media played: ${type} - ${title.substring(0, 50)}`);
      }, { once: true }); // Track only once per session per element
    });
  }

  /**
   * Watch for dynamically added media elements
   */
  function observeMediaChanges() {
    const observer = new MutationObserver(() => {
      setupMediaTracking();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * Send batch of tracking data to backend
   */
  function sendTrackingData() {
    updateActiveTime();

    const payload = {
      userId: getUserId(),
      email: getUserEmail(),
      sessionStart: state.sessionStart,
      activeTime: state.activeTime, // Only counts when tab is active
      maxScrollDepth: state.maxScrollDepth,
      pageUrl: window.location.href,
      pageTitle: document.title,
      clicks: state.clicks,
      mediaPlays: state.mediaPlays,
      pageVisits: state.pageVisits,
      hasCustomEngagement: state.hasCustomEngagement,
      timestamp: Date.now(),
    };

    // Build API endpoint with HubSpot ID if available
    let apiUrl = CONFIG.apiEndpoint;
    const hsId = getHubSpotId();
    if (hsId) {
      apiUrl += '?id=' + encodeURIComponent(hsId);
    }

    // Use FormData + sendBeacon to avoid CORS preflight
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    
    const sent = navigator.sendBeacon(apiUrl, formData);
    if (sent) {
      console.log('[Tracker] Data sent via sendBeacon');
      // Reset events after send (keep time accumulating)
      state.clicks = [];
      state.mediaPlays = [];
      state.pageVisits = [];
      state.hasCustomEngagement = false;
    } else {
      console.error('[Tracker] sendBeacon failed, trying fetch fallback');
      // Fallback to fetch if sendBeacon fails
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => {
          console.log('[Tracker] Data sent via fetch:', data);
          state.clicks = [];
          state.mediaPlays = [];
          state.pageVisits = [];
          state.hasCustomEngagement = false;
        })
        .catch(err => console.error('[Tracker] Send failed:', err));
    }
  }

  // ===== EVENT LISTENERS =====

  /**
   * Track visibility change (tab active/inactive) - CRITICAL for active time
   */
  document.addEventListener('visibilitychange', () => {
    state.isTabActive = !document.hidden;
    state.lastActiveTime = Date.now();
    console.log(`[Tracker] Tab ${state.isTabActive ? 'active' : 'inactive'} - active time NOT counted while hidden`);
  });

  /**
   * Track scroll depth
   */
  window.addEventListener('scroll', () => {
    const depth = getScrollDepth();
    if (depth > state.maxScrollDepth) {
      state.maxScrollDepth = depth;
      console.log(`[Tracker] Scroll depth: ${depth}%`);
    }
  }, { passive: true });

  /**
   * Track clicks on interactive elements
   */
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
    if (target) {
      const { identifier, section, href } = getElementIdentifier(target);
      const text = target.textContent?.slice(0, 30) || target.value || '';
      state.clicks.push({
        component: identifier,
        text: text.trim(),
        section: section,
        href: href,
        timestamp: new Date().toISOString(),
      });
      state.hasCustomEngagement = true;
      console.log(`[Tracker] Click tracked:`, identifier, text.trim());
    }
  }, { passive: true });

  /**
   * Track form submissions to capture email
   */
  document.addEventListener('submit', (e) => {
    const form = e.target;
    const emailInputs = form.querySelectorAll('input[type="email"], input[name*="email"]');
    for (let input of emailInputs) {
      if (input.value && input.value.includes('@')) {
        localStorage.setItem('soulful_tracker_email', input.value);
        console.log('[Tracker] Email captured:', input.value.substring(0, 5) + '***');
        break;
      }
    }
  });

  // ===== INITIALIZATION =====

  function init() {
    console.log('[Tracker] Initializing tracking...');
    
    // Setup all tracking (CRITICAL - was missing before!)
    setupMediaTracking();
    observeMediaChanges();
    observePageChanges();
    
    // Send data periodically
    setInterval(sendTrackingData, CONFIG.batchInterval);

    // Send data before page unload (with FormData for better compatibility)
    window.addEventListener('beforeunload', () => {
      if (state.activeTime > 0 || state.clicks.length > 0 || state.mediaPlays.length > 0) {
        updateActiveTime();
        
        const hsId = getHubSpotId();
        const payload = {
          userId: getUserId(),
          email: getUserEmail(),
          sessionStart: state.sessionStart,
          activeTime: state.activeTime,
          maxScrollDepth: state.maxScrollDepth,
          pageUrl: window.location.href,
          pageTitle: document.title,
          clicks: state.clicks,
          mediaPlays: state.mediaPlays,
          pageVisits: state.pageVisits,
          hasCustomEngagement: state.hasCustomEngagement,
          isUnload: true,
          timestamp: Date.now(),
        };
        
        // Use FormData for better sendBeacon compatibility
        const formData = new FormData();
        if (hsId) {
          formData.append('id', hsId);
        }
        formData.append('data', JSON.stringify(payload));
        
        navigator.sendBeacon(CONFIG.apiEndpoint, formData);
      }
    });

    console.log('[Tracker] ✓ Ready. Session started:', new Date(state.sessionStart).toISOString());
    console.log('[Tracker] HubSpot ID from URL:', getHubSpotId() || 'Not provided');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
