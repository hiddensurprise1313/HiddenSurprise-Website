// Hidden Surprise Client-Side Analytics & Admin Auth Engine

const STORAGE_KEYS = {
  EVENTS: 'hs_analytics_events',
  AUTH: 'hs_admin_auth',
  CONFIG: 'hs_admin_config',
  VISITOR_ID: 'hs_visitor_id'
};

const DEFAULT_CONFIG = {
  adminUser: 'admin',
  adminPass: 'surprise1313',
  seeded: false
};

// Generate or retrieve persistent visitor UUID
export const getVisitorId = () => {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, id);
  }
  return id;
};

// Detect device type
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua) || window.innerWidth <= 768) {
    return 'mobile';
  }
  return 'desktop';
};

// Get stored events or initialize with rich realistic baseline data
export const getStoredEvents = () => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse stored events', e);
    }
  }

  // Generate realistic 30-day baseline analytics if empty
  const initialEvents = generateBaselineEvents();
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEvents));
  return initialEvents;
};

// Realistic baseline event generator for realistic initial dashboard
function generateBaselineEvents() {
  const events = [];
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  const packages = [
    'Premium Package (1.5 Hours)',
    'Elite VIP Package (2 Hours)',
    'Basic Package (45 Mins)',
    'Car Trunk Surprise',
    '12 O\'Clock Door Surprise',
    'Candle Light Dinner Cabana',
    'Flower Bouquet (Dutch Roses)',
    'Chocolate Bouquet (Ferrero Rocher)',
    'Red Carpet Banner Entry'
  ];

  const devices = ['mobile', 'mobile', 'mobile', 'desktop', 'desktop', 'tablet'];
  const cities = ['Karaikal', 'Karaikal', 'Karaikal', 'Nagapattinam', 'Tharangambadi', 'Mayiladuthurai'];

  // Past 30 days of data
  for (let i = 30; i >= 0; i--) {
    const dayTimestamp = now - (i * DAY_MS);
    // 60 to 140 daily impressions with weekend spikes
    const isWeekend = new Date(dayTimestamp).getDay() === 0 || new Date(dayTimestamp).getDay() === 6;
    const dailyViews = isWeekend ? Math.floor(95 + Math.random() * 50) : Math.floor(60 + Math.random() * 40);

    for (let j = 0; j < dailyViews; j++) {
      const time = dayTimestamp + Math.floor(Math.random() * DAY_MS);
      const dev = devices[Math.floor(Math.random() * devices.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const visitor = 'v_seed_' + Math.floor(Math.random() * 300);

      // Pageview impression
      events.push({
        id: 'evt_' + Math.random().toString(36).substring(2, 9),
        type: 'pageview',
        path: '/',
        device: dev,
        city,
        visitorId: visitor,
        timestamp: time
      });

      // 45% also explore a package
      if (Math.random() < 0.45) {
        const pkg = packages[Math.floor(Math.random() * packages.length)];
        events.push({
          id: 'evt_' + Math.random().toString(36).substring(2, 9),
          type: 'package_click',
          title: pkg,
          device: dev,
          city,
          visitorId: visitor,
          timestamp: time + 12000
        });
      }

      // 25% play mystery box unboxing
      if (Math.random() < 0.25) {
        events.push({
          id: 'evt_' + Math.random().toString(36).substring(2, 9),
          type: 'unbox_perk',
          code: 'VIPUPGRADE',
          device: dev,
          city,
          visitorId: visitor,
          timestamp: time + 25000
        });
      }

      // 10% open booking modal
      if (Math.random() < 0.10) {
        events.push({
          id: 'evt_' + Math.random().toString(36).substring(2, 9),
          type: 'booking_modal_open',
          source: 'Hero / Card',
          device: dev,
          city,
          visitorId: visitor,
          timestamp: time + 45000
        });

        // 65% of opened modals convert to WhatsApp submission
        if (Math.random() < 0.65) {
          const pax = Math.floor(2 + Math.random() * 4);
          const bookedPkg = packages[Math.floor(Math.random() * 5)];
          events.push({
            id: 'evt_' + Math.random().toString(36).substring(2, 9),
            type: 'booking_submit',
            title: bookedPkg,
            pax,
            device: dev,
            city,
            visitorId: visitor,
            timestamp: time + 65000
          });
        }
      }

      // 8% direct WhatsApp / Call clicks
      if (Math.random() < 0.08) {
        events.push({
          id: 'evt_' + Math.random().toString(36).substring(2, 9),
          type: 'whatsapp_click',
          source: 'Floating Button',
          device: dev,
          city,
          visitorId: visitor,
          timestamp: time + 30000
        });
      }
    }
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
}

// Track a new live event
export const trackEvent = (type, data = {}) => {
  if (typeof window === 'undefined') return;

  try {
    const events = getStoredEvents();
    const newEvent = {
      id: 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
      type,
      device: getDeviceType(),
      visitorId: getVisitorId(),
      timestamp: Date.now(),
      ...data
    };

    // Keep up to 2,500 latest events
    const updated = [newEvent, ...events].slice(0, 2500);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updated));

    // Dispatch custom event for real-time dashboard listeners
    window.dispatchEvent(new CustomEvent('hs_analytics_update', { detail: newEvent }));
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
};

// Helper: Track Page View
export const trackPageView = (path = window.location.pathname) => {
  trackEvent('pageview', { path, referrer: document.referrer || 'Direct' });
};

// Calculate Aggregated Metrics for Dashboard
export const getAnalyticsSummary = (days = 30) => {
  const allEvents = getStoredEvents();
  const now = Date.now();
  const cutoff = days === 'all' ? 0 : now - (days * 24 * 60 * 60 * 1000);

  const filtered = allEvents.filter(e => e.timestamp >= cutoff);

  // Impressions & Visitors
  const pageviews = filtered.filter(e => e.type === 'pageview');
  const uniqueVisitors = new Set(filtered.map(e => e.visitorId)).size;

  // Key Conversions
  const packageClicks = filtered.filter(e => e.type === 'package_click');
  const unboxEvents = filtered.filter(e => e.type === 'unbox_perk');
  const bookingModalOpens = filtered.filter(e => e.type === 'booking_modal_open');
  const bookingSubmissions = filtered.filter(e => e.type === 'booking_submit');
  const whatsappClicks = filtered.filter(e => e.type === 'whatsapp_click');
  const callClicks = filtered.filter(e => e.type === 'phone_call');

  const totalConversions = bookingSubmissions.length + whatsappClicks.length + callClicks.length;
  const conversionRate = pageviews.length > 0
    ? ((totalConversions / pageviews.length) * 100).toFixed(1)
    : '0.0';

  // Average Pax Calculation
  const paxEvents = bookingSubmissions.filter(e => e.pax && Number(e.pax) > 0);
  const avgPax = paxEvents.length > 0
    ? (paxEvents.reduce((sum, e) => sum + Number(e.pax), 0) / paxEvents.length).toFixed(1)
    : '2.4';

  // Device Breakdown
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  filtered.forEach(e => {
    const d = e.device || 'desktop';
    if (deviceCounts[d] !== undefined) deviceCounts[d]++;
  });
  const totalDeviceEvents = filtered.length || 1;
  const devicePercentages = {
    mobile: Math.round((deviceCounts.mobile / totalDeviceEvents) * 100),
    desktop: Math.round((deviceCounts.desktop / totalDeviceEvents) * 100),
    tablet: Math.round((deviceCounts.tablet / totalDeviceEvents) * 100)
  };

  // Top Packages Breakdown
  const packageStats = {};
  filtered.forEach(e => {
    if (e.title) {
      if (!packageStats[e.title]) {
        packageStats[e.title] = { clicks: 0, bookings: 0 };
      }
      if (e.type === 'package_click') packageStats[e.title].clicks++;
      if (e.type === 'booking_submit') packageStats[e.title].bookings++;
    }
  });

  const popularPackages = Object.entries(packageStats)
    .map(([title, stats]) => ({
      title,
      clicks: stats.clicks,
      bookings: stats.bookings,
      score: stats.clicks + (stats.bookings * 3)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  // Time-Series Daily Data for Charts (last N days)
  const chartDays = days === 'all' ? 30 : days;
  const dailySeries = [];
  const DAY_MS = 24 * 60 * 60 * 1000;

  for (let i = chartDays - 1; i >= 0; i--) {
    const dayStart = new Date(now - i * DAY_MS);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart.getTime() + DAY_MS);

    const dayEvents = filtered.filter(e => e.timestamp >= dayStart.getTime() && e.timestamp < dayEnd.getTime());
    const dayViews = dayEvents.filter(e => e.type === 'pageview').length;
    const dayConversions = dayEvents.filter(e => e.type === 'booking_submit' || e.type === 'whatsapp_click').length;

    const label = dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    dailySeries.push({
      date: label,
      views: dayViews,
      conversions: dayConversions
    });
  }

  return {
    totalImpressions: pageviews.length,
    uniqueVisitors,
    packageClicks: packageClicks.length,
    unboxEvents: unboxEvents.length,
    bookingModalOpens: bookingModalOpens.length,
    bookingSubmissions: bookingSubmissions.length,
    whatsappClicks: whatsappClicks.length,
    totalConversions,
    conversionRate,
    avgPax,
    devicePercentages,
    popularPackages,
    dailySeries,
    recentEvents: filtered.slice(0, 40)
  };
};

// Export Analytics Data to CSV
export const exportAnalyticsCSV = () => {
  const events = getStoredEvents();
  if (!events || events.length === 0) return;

  const headers = ['Event ID', 'Event Type', 'Details / Title', 'Pax', 'Device', 'City', 'Timestamp', 'Date'];
  const rows = events.map(e => [
    e.id,
    e.type,
    `"${(e.title || e.code || e.source || e.path || '').replace(/"/g, '""')}"`,
    e.pax || '',
    e.device || 'desktop',
    e.city || 'Karaikal',
    e.timestamp,
    new Date(e.timestamp).toISOString()
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `hidden_surprise_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Admin Authentication Management
export const getAdminConfig = () => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_CONFIG;
};

export const setAdminConfig = (newConfig) => {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
};

export const checkAdminAuth = () => {
  if (typeof window === 'undefined') return false;
  const authSession = sessionStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem(STORAGE_KEYS.AUTH);
  return authSession === 'authenticated';
};

export const adminLogin = (username, password, remember = false) => {
  const config = getAdminConfig();
  if (
    username.trim().toLowerCase() === config.adminUser.toLowerCase() &&
    password.trim() === config.adminPass
  ) {
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
    } else {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
    }
    return { success: true };
  }
  return { success: false, error: 'Invalid admin username or password.' };
};

export const adminLogout = () => {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  localStorage.removeItem(STORAGE_KEYS.AUTH);
};

export const changeAdminPassword = (oldPass, newPass) => {
  const config = getAdminConfig();
  if (oldPass !== config.adminPass) {
    return { success: false, error: 'Current password does not match.' };
  }
  if (!newPass || newPass.length < 4) {
    return { success: false, error: 'New password must be at least 4 characters.' };
  }
  const updated = { ...config, adminPass: newPass };
  setAdminConfig(updated);
  return { success: true };
};

export const resetAnalyticsData = () => {
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
  return getStoredEvents();
};
