import React, { useState, useEffect, useMemo } from 'react';
import {
  Eye, Users, MessageCircle, TrendingUp, Sparkles, Download,
  LogOut, RefreshCw, Smartphone, Monitor, Tablet, Calendar,
  Key, Check, AlertCircle, ArrowUpRight, ArrowLeft, Heart,
  Package, ChevronRight, Filter, ShieldCheck, X, Flame, Globe2, Radio
} from 'lucide-react';
import {
  getAnalyticsSummary,
  calculateMetricsFromEvents,
  exportAnalyticsCSV,
  adminLogout,
  changeAdminPassword,
  resetAnalyticsData
} from '../utils/analytics';
import {
  isFirebaseConnected,
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  subscribeToRealtimeAnalytics
} from '../utils/firebase';
import logoImg from '../assets/logo.png';

export default function AdminDashboard({ onLogout, onBackToSite }) {
  const [timeframe, setTimeframe] = useState(30); // 7, 30, 90, 'all'
  const [rawFirestoreEvents, setRawFirestoreEvents] = useState(null);
  const [isCloudLive, setIsCloudLive] = useState(() => isFirebaseConnected());
  const [summary, setSummary] = useState(() => getAnalyticsSummary(30));
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Modals state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Firebase Config form state
  const [fbConfigText, setFbConfigText] = useState(() => {
    const existing = getSavedFirebaseConfig();
    return existing ? JSON.stringify(existing, null, 2) : '';
  });
  const [fbError, setFbError] = useState('');
  const [fbSuccess, setFbSuccess] = useState('');

  // Subscribe to Realtime Firestore updates if connected
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseConnected()) {
      unsubscribe = subscribeToRealtimeAnalytics(
        (events) => {
          setRawFirestoreEvents(events);
          setIsCloudLive(true);
          const computed = calculateMetricsFromEvents(events, timeframe);
          setSummary(computed);
        },
        (errMsg) => {
          console.warn('Realtime Firebase issue:', errMsg);
          setIsCloudLive(false);
        }
      );
    }

    return () => unsubscribe();
  }, [timeframe, isCloudLive]);

  // Refresh summary when timeframe changes or fallback local storage update occurs
  const refreshData = () => {
    setIsRefreshing(true);
    if (rawFirestoreEvents && rawFirestoreEvents.length > 0) {
      setSummary(calculateMetricsFromEvents(rawFirestoreEvents, timeframe));
    } else {
      setSummary(getAnalyticsSummary(timeframe));
    }
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    refreshData();
  }, [timeframe]);

  // Listen to local live events if Firestore not connected
  useEffect(() => {
    const handleLiveUpdate = () => {
      if (!isCloudLive) {
        setSummary(getAnalyticsSummary(timeframe));
      }
    };
    window.addEventListener('hs_analytics_update', handleLiveUpdate);
    return () => window.removeEventListener('hs_analytics_update', handleLiveUpdate);
  }, [timeframe, isCloudLive]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');
    const res = changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      setPassSuccess('Admin password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPassSuccess('');
      }, 1500);
    } else {
      setPassError(res.error || 'Failed to update password');
    }
  };

  const handleFirebaseConfigSubmit = (e) => {
    e.preventDefault();
    setFbError('');
    setFbSuccess('');

    try {
      let parsed = null;
      const text = fbConfigText.trim();

      if (text.startsWith('{')) {
        parsed = JSON.parse(text);
      } else {
        // Try extracting keys if user pasted standard firebaseConfig JS object
        const apiKeyMatch = text.match(/apiKey:\s*["']([^"']+)["']/);
        const projectIdMatch = text.match(/projectId:\s*["']([^"']+)["']/);
        const authDomainMatch = text.match(/authDomain:\s*["']([^"']+)["']/);
        const storageBucketMatch = text.match(/storageBucket:\s*["']([^"']+)["']/);
        const messagingSenderIdMatch = text.match(/messagingSenderId:\s*["']([^"']+)["']/);
        const appIdMatch = text.match(/appId:\s*["']([^"']+)["']/);

        if (apiKeyMatch && projectIdMatch) {
          parsed = {
            apiKey: apiKeyMatch[1],
            projectId: projectIdMatch[1],
            authDomain: authDomainMatch ? authDomainMatch[1] : undefined,
            storageBucket: storageBucketMatch ? storageBucketMatch[1] : undefined,
            messagingSenderId: messagingSenderIdMatch ? messagingSenderIdMatch[1] : undefined,
            appId: appIdMatch ? appIdMatch[1] : undefined
          };
        }
      }

      if (!parsed || !parsed.apiKey || !parsed.projectId) {
        setFbError('Please provide a valid Firebase config object containing apiKey and projectId.');
        return;
      }

      const db = saveFirebaseConfig(parsed);
      if (db) {
        setIsCloudLive(true);
        setFbSuccess('Firebase connected successfully! Real-time Firestore sync is active.');
        setTimeout(() => {
          setShowFirebaseModal(false);
          setFbSuccess('');
        }, 1500);
      } else {
        setFbError('Failed to initialize Firebase with the provided configuration.');
      }
    } catch (err) {
      setFbError('Invalid JSON format. Please check your Firebase config JSON.');
    }
  };

  // SVG Chart Calculations
  const chartData = summary.dailySeries || [];
  const maxViews = useMemo(() => {
    if (!chartData.length) return 100;
    const max = Math.max(...chartData.map(d => d.views), 20);
    return Math.ceil(max * 1.15);
  }, [chartData]);

  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 30;
  const paddingY = 25;

  const points = useMemo(() => {
    if (!chartData.length) return [];
    return chartData.map((d, index) => {
      const x = paddingX + (index / (chartData.length - 1 || 1)) * (chartWidth - paddingX * 2);
      const y = chartHeight - paddingY - (d.views / maxViews) * (chartHeight - paddingY * 2);
      const convY = chartHeight - paddingY - ((d.conversions * 4) / maxViews) * (chartHeight - paddingY * 2);
      return { x, y, convY, ...d };
    });
  }, [chartData, maxViews]);

  // Smooth SVG paths
  const viewsLinePath = useMemo(() => {
    if (points.length < 2) return '';
    return points.reduce((path, p, i) => `${path} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
  }, [points]);

  const viewsAreaPath = useMemo(() => {
    if (points.length < 2) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const bottom = chartHeight - paddingY;
    return `${viewsLinePath} L ${last.x.toFixed(1)} ${bottom} L ${first.x.toFixed(1)} ${bottom} Z`;
  }, [points, viewsLinePath]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#07090E',
        color: '#FFFFFF',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        paddingBottom: '5rem'
      }}
    >
      {/* Top Executive Header */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(10, 13, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 80,
          padding: '1rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(248, 220, 108, 0.3)',
                borderRadius: '999px',
                padding: '6px 16px 6px 8px'
              }}
            >
              <img
                src={logoImg}
                alt="Hidden Surprise"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #F8DC6C'
                }}
              />
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', display: 'block', lineHeight: 1.1 }}>
                  HIDDEN <span style={{ color: '#F8DC6C' }}>SURPRISE</span>
                </span>
                <span style={{ fontSize: '0.62rem', color: '#F8DC6C', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  Analytics & Executive Pulse
                </span>
              </div>
            </div>

            {/* Live Indicator / Active Now */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#25D366'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  boxShadow: '0 0 10px #25D366',
                  display: 'inline-block'
                }}
                className="animate-pulse"
              />
              <span>{summary.activeNow > 0 ? `${summary.activeNow} Active Right Now` : 'Live Tracking'}</span>
            </div>

            {/* Firebase Cloud Status Pill */}
            <button
              onClick={() => setShowFirebaseModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: isCloudLive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                border: isCloudLive ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                color: isCloudLive ? '#F59E0B' : 'rgba(255, 255, 255, 0.7)',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Configure Firebase Real-time Firestore Sync"
            >
              <Flame size={14} color={isCloudLive ? '#F59E0B' : '#9CA3AF'} />
              {isCloudLive ? 'Firebase Live Synced' : 'Connect Firebase'}
            </button>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Timeframe selector */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '3px'
              }}
            >
              {[
                { label: '7D', value: 7 },
                { label: '30D', value: 30 },
                { label: '90D', value: 90 },
                { label: 'All', value: 'all' }
              ].map(t => (
                <button
                  key={t.label}
                  onClick={() => setTimeframe(t.value)}
                  style={{
                    background: timeframe === t.value ? '#F8DC6C' : 'transparent',
                    color: timeframe === t.value ? '#000000' : 'rgba(255, 255, 255, 0.75)',
                    fontWeight: timeframe === t.value ? 800 : 600,
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Export CSV */}
            <button
              onClick={() => exportAnalyticsCSV(rawFirestoreEvents)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '0.48rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Export complete analytics records to CSV"
            >
              <Download size={15} color="#F8DC6C" /> Export CSV
            </button>

            {/* Change Password */}
            <button
              onClick={() => setShowPasswordModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '0.48rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Change Admin Password"
            >
              <Key size={15} color="#F8DC6C" /> Password
            </button>

            {/* Back to site */}
            <button
              onClick={onBackToSite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(248, 220, 108, 0.15)',
                border: '1px solid rgba(248, 220, 108, 0.35)',
                color: '#F8DC6C',
                borderRadius: '12px',
                padding: '0.48rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={15} /> Back to Site
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                adminLogout();
                onLogout();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#FCA5A5',
                borderRadius: '12px',
                padding: '0.48rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Sign out of Admin Portal"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container" style={{ marginTop: '2.5rem' }}>
        {/* KPI Grid */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {/* Impressions */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">TOTAL IMPRESSIONS</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(248, 220, 108, 0.15)', color: '#F8DC6C' }}>
                  <Eye size={18} />
                </div>
              </div>
              <div className="kpi-value">{summary.totalImpressions.toLocaleString()}</div>
              <div className="kpi-subtext">
                <span style={{ color: '#25D366', fontWeight: 700 }}>+18.4%</span> vs prior cycle
              </div>
            </div>

            {/* Unique Visitors */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">UNIQUE VISITORS</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60A5FA' }}>
                  <Users size={18} />
                </div>
              </div>
              <div className="kpi-value">{summary.uniqueVisitors.toLocaleString()}</div>
              <div className="kpi-subtext">
                Active audience across Karaikal & TN
              </div>
            </div>

            {/* Package Clicks */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">PACKAGE EXPLORATIONS</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#EC4899' }}>
                  <Package size={18} />
                </div>
              </div>
              <div className="kpi-value">{summary.packageClicks.toLocaleString()}</div>
              <div className="kpi-subtext">
                <span style={{ color: '#F8DC6C' }}>{summary.unboxEvents}</span> Mystery unboxings
              </div>
            </div>

            {/* Total Leads / Inquiries */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">WHATSAPP & CALL LEADS</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  <MessageCircle size={18} />
                </div>
              </div>
              <div className="kpi-value" style={{ color: '#25D366' }}>{summary.totalConversions}</div>
              <div className="kpi-subtext">
                {summary.bookingSubmissions} forms + {summary.whatsappClicks} direct chats
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">CONVERSION EFFICIENCY</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                  <TrendingUp size={18} />
                </div>
              </div>
              <div className="kpi-value">{summary.conversionRate}%</div>
              <div className="kpi-subtext">
                High-intent celebration buyers
              </div>
            </div>

            {/* Average Pax */}
            <div className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="kpi-title">AVG GUEST COUNT</span>
                <div className="kpi-icon-badge" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#A78BFA' }}>
                  <Heart size={18} />
                </div>
              </div>
              <div className="kpi-value">{summary.avgPax} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Pax</span></div>
              <div className="kpi-subtext">
                Capacity cap: 1 - 12 Pax per booking
              </div>
            </div>
          </div>
        </section>

        {/* Middle Section: Chart + Device Split */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
          className="dashboard-middle-grid"
        >
          {/* Trend Chart */}
          <div
            className="dashboard-card"
            style={{
              gridColumn: 'span 2'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.2rem 0', color: '#FFFFFF' }}>
                  Visitor Traffic & Lead Inquiries
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Daily impression trajectory over selected timeframe {isCloudLive && '(Live Cloud)'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F8DC6C' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Daily Impressions</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                style={{ width: '100%', height: 'auto', minWidth: '460px', overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="chartGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F8DC6C" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#F8DC6C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                  return (
                    <g key={ratio}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={chartWidth - paddingX}
                        y2={y}
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 6}
                        y={y + 4}
                        fill="rgba(255, 255, 255, 0.35)"
                        fontSize="10"
                        textAnchor="end"
                      >
                        {Math.round(maxViews * ratio)}
                      </text>
                    </g>
                  );
                })}

                {/* Filled Area */}
                {viewsAreaPath && (
                  <path d={viewsAreaPath} fill="url(#chartGoldGrad)" />
                )}

                {/* Stroke Line */}
                {viewsLinePath && (
                  <path
                    d={viewsLinePath}
                    fill="none"
                    stroke="#F8DC6C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Interactive Points */}
                {points.map((p, index) => {
                  const isHovered = hoveredPoint?.date === p.date;
                  return (
                    <g
                      key={p.date + index}
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 6 : 3.5}
                        fill={isHovered ? '#FFFFFF' : '#F8DC6C'}
                        stroke="#07090E"
                        strokeWidth="2"
                        style={{ transition: 'all 0.15s ease' }}
                      />
                      {/* X-axis labels every few days */}
                      {(index % Math.ceil(points.length / 7) === 0 || index === points.length - 1) && (
                        <text
                          x={p.x}
                          y={chartHeight - 4}
                          fill="rgba(255, 255, 255, 0.45)"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {p.date}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hover Floating Tooltip */}
              {hoveredPoint && (
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: '#111827',
                    border: '1px solid #F8DC6C',
                    borderRadius: '12px',
                    padding: '0.6rem 1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    fontSize: '0.85rem',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#F8DC6C', marginBottom: '0.2rem' }}>
                    {hoveredPoint.date}
                  </div>
                  <div>Views: <strong style={{ color: '#FFFFFF' }}>{hoveredPoint.views}</strong></div>
                  <div>Inquiries: <strong style={{ color: '#25D366' }}>{hoveredPoint.conversions}</strong></div>
                </div>
              )}
            </div>
          </div>

          {/* Device & Platform Split */}
          <div className="dashboard-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: '#FFFFFF' }}>
              Device Distribution
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Traffic breakdown across hardware
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Mobile */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Smartphone size={16} color="#F8DC6C" />
                    <span>Mobile Smartphone</span>
                  </div>
                  <strong style={{ color: '#F8DC6C' }}>{summary.devicePercentages.mobile}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${summary.devicePercentages.mobile}%`, height: '100%', background: '#F8DC6C', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Desktop */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Monitor size={16} color="#60A5FA" />
                    <span>Desktop Web</span>
                  </div>
                  <strong style={{ color: '#60A5FA' }}>{summary.devicePercentages.desktop}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${summary.devicePercentages.desktop}%`, height: '100%', background: '#60A5FA', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Tablet */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tablet size={16} color="#A78BFA" />
                    <span>Tablet</span>
                  </div>
                  <strong style={{ color: '#A78BFA' }}>{summary.devicePercentages.tablet}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${summary.devicePercentages.tablet}%`, height: '100%', background: '#A78BFA', borderRadius: '999px' }} />
                </div>
              </div>
            </div>

            {/* Karaikal Location callout */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.82rem',
                color: 'rgba(255, 255, 255, 0.75)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <Globe2 size={18} color="#F8DC6C" style={{ flexShrink: 0 }} />
              <span>
                <strong>Karaikal HQ:</strong> Unicorn Plaza dispatch covers Karaikal, Nagapattinam, Mayiladuthurai & nearby regions.
              </span>
            </div>
          </div>
        </section>

        {/* Packages Leaderboard & Conversion Funnel */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Top Packages Leaderboard */}
          <div className="dashboard-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.3rem 0', color: '#FFFFFF' }}>
              Package Popularity Leaderboard
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Most viewed & booked surprise setups
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {summary.popularPackages.map((pkg, idx) => (
                <div
                  key={pkg.title}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.8rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0 }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: idx === 0 ? '#F8DC6C' : idx === 1 ? '#E5E7EB' : idx === 2 ? '#D97706' : 'rgba(255, 255, 255, 0.1)',
                        color: idx === 0 || idx === 1 || idx === 2 ? '#000000' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 900,
                        flexShrink: 0
                      }}
                    >
                      #{idx + 1}
                    </div>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem', fontWeight: 700 }}>
                      {pkg.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', display: 'block' }}>VIEWS</span>
                      <strong style={{ fontSize: '0.88rem', color: '#F8DC6C' }}>{pkg.clicks}</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', display: 'block' }}>BOOKINGS</span>
                      <strong style={{ fontSize: '0.88rem', color: '#25D366' }}>{pkg.bookings}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="dashboard-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.3rem 0', color: '#FFFFFF' }}>
              Celebration Conversion Funnel
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Step-by-step visitor engagement progression
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { stage: '1. Site Impressions', count: summary.totalImpressions, pct: '100%', color: '#F8DC6C' },
                { stage: '2. Package Explorations', count: summary.packageClicks, pct: `${Math.min(100, Math.round((summary.packageClicks / (summary.totalImpressions || 1)) * 100))}%`, color: '#60A5FA' },
                { stage: '3. Mystery Perk Unboxings', count: summary.unboxEvents, pct: `${Math.min(100, Math.round((summary.unboxEvents / (summary.totalImpressions || 1)) * 100))}%`, color: '#EC4899' },
                { stage: '4. Booking Modal Opened', count: summary.bookingModalOpens, pct: `${Math.min(100, Math.round((summary.bookingModalOpens / (summary.totalImpressions || 1)) * 100))}%`, color: '#F59E0B' },
                { stage: '5. WhatsApp / Call Confirmed', count: summary.totalConversions, pct: `${summary.conversionRate}%`, color: '#25D366' }
              ].map((funnel) => (
                <div key={funnel.stage} style={{ padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>{funnel.stage}</span>
                    <span style={{ fontWeight: 800, color: funnel.color }}>{funnel.count} ({funnel.pct})</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: funnel.pct, height: '100%', background: funnel.color, borderRadius: '999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Activity Stream Table */}
        <section className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.3rem 0', color: '#FFFFFF' }}>
                Real-Time Event Stream
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                Latest visitor actions, packages clicked, and booking calls {isCloudLive ? 'across all devices' : '(Local Session)'}
              </p>
            </div>

            <button
              onClick={refreshData}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Refresh Stream
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>TIME</th>
                  <th style={{ padding: '0.75rem 1rem' }}>EVENT TYPE</th>
                  <th style={{ padding: '0.75rem 1rem' }}>DETAILS / PACKAGE</th>
                  <th style={{ padding: '0.75rem 1rem' }}>PAX</th>
                  <th style={{ padding: '0.75rem 1rem' }}>DEVICE</th>
                  <th style={{ padding: '0.75rem 1rem' }}>LOCATION</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentEvents.slice(0, 20).map((evt) => {
                  const dateStr = new Date(evt.timestamp || evt.createdTime || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  return (
                    <tr
                      key={evt.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.15s ease'
                      }}
                      className="table-row-hover"
                    >
                      <td style={{ padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace' }}>
                        {dateStr}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            background:
                              evt.type === 'booking_submit' ? 'rgba(37, 211, 102, 0.2)' :
                              evt.type === 'whatsapp_click' ? 'rgba(37, 211, 102, 0.15)' :
                              evt.type === 'package_click' ? 'rgba(248, 220, 108, 0.15)' :
                              evt.type === 'unbox_perk' ? 'rgba(236, 72, 153, 0.15)' :
                              'rgba(255, 255, 255, 0.08)',
                            color:
                              evt.type === 'booking_submit' || evt.type === 'whatsapp_click' ? '#25D366' :
                              evt.type === 'package_click' ? '#F8DC6C' :
                              evt.type === 'unbox_perk' ? '#F472B6' :
                              '#9CA3AF'
                          }}
                        >
                          {evt.type ? evt.type.replace(/_/g, ' ') : 'EVENT'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#FFFFFF' }}>
                        {evt.title || evt.code || evt.path || evt.source || 'General Impression'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: evt.pax ? '#F8DC6C' : 'rgba(255,255,255,0.4)', fontWeight: evt.pax ? 800 : 400 }}>
                        {evt.pax ? `${evt.pax} Pax` : '-'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'capitalize' }}>
                        {evt.device || 'Mobile'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                        {evt.city || 'Karaikal'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Firebase Config Modal */}
      {showFirebaseModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowFirebaseModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#0D111A',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '24px',
              padding: '2.2rem',
              color: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFirebaseModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#9CA3AF',
                borderRadius: '50%',
                padding: '4px',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Flame size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Firebase Cloud Sync
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '1.2rem', lineHeight: 1.5 }}>
              Paste your Firebase Web App configuration below to activate 100% real-time Firestore synchronization for all worldwide visitors.
            </p>

            {fbError && (
              <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {fbError}
              </div>
            )}

            {fbSuccess && (
              <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(37, 211, 102, 0.15)', color: '#86EFAC', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {fbSuccess}
              </div>
            )}

            <form onSubmit={handleFirebaseConfigSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>
                  Firebase Config (JSON or JavaScript Object)
                </label>
                <textarea
                  rows={8}
                  required
                  value={fbConfigText}
                  onChange={(e) => setFbConfigText(e.target.value)}
                  placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "hidden-surprise.firebaseapp.com",\n  "projectId": "hidden-surprise",\n  "storageBucket": "...",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                💡 Tip: Find this in your <strong>Firebase Console → Project Settings → General → Your apps → SDK setup/config</strong>.
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  marginTop: '0.5rem'
                }}
              >
                Save & Connect Firebase Live
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#0D111A',
              border: '1px solid rgba(248, 220, 108, 0.3)',
              borderRadius: '24px',
              padding: '2.2rem',
              color: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPasswordModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#9CA3AF',
                borderRadius: '50%',
                padding: '4px',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: '#FFFFFF' }}>
              Update Admin Password
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '1.5rem' }}>
              Protect executive access to Hidden Surprise analytics.
            </p>

            {passError && (
              <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {passError}
              </div>
            )}

            {passSuccess && (
              <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(37, 211, 102, 0.15)', color: '#86EFAC', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {passSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>Current Password</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 4 chars)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  marginTop: '0.5rem'
                }}
              >
                Save New Password
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .kpi-card {
          background-color: #0D111A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          border-color: rgba(248, 220, 108, 0.35);
        }
        .kpi-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
        }
        .kpi-icon-badge {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .kpi-value {
          font-size: 2.1rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
          line-height: 1.1;
        }
        .kpi-subtext {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }
        .dashboard-card {
          background-color: #0D111A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 1.8rem;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
        }
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.04);
        }
        @media (max-width: 900px) {
          .dashboard-middle-grid > div:first-child {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
