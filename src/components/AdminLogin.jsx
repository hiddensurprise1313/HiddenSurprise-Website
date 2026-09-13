import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import { adminLogin } from '../utils/analytics';
import logoImg from '../assets/logo.png';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = adminLogin(username, password, remember);
      setIsLoading(false);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Invalid credentials. Please verify username and password.');
      }
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07090E',
        backgroundImage: `
          radial-gradient(circle at 50% 15%, rgba(248, 220, 108, 0.12) 0%, transparent 55%),
          radial-gradient(circle at 85% 85%, rgba(245, 158, 11, 0.08) 0%, transparent 45%),
          linear-gradient(to bottom, #07090E, #000000)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          opacity: 0.7
        }}
      />

      <div
        className="admin-login-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#0D111A',
          border: '1px solid rgba(248, 220, 108, 0.25)',
          borderRadius: '28px',
          padding: '2.8rem 2.4rem',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(248, 220, 108, 0.08)',
          position: 'relative',
          zIndex: 10,
          color: '#FFFFFF'
        }}
      >
        {/* Top Brand Pill */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(248, 220, 108, 0.3)',
              borderRadius: '999px',
              padding: '6px 18px 6px 8px',
              marginBottom: '1.2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            <img
              src={logoImg}
              alt="Hidden Surprise"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #F8DC6C',
                boxShadow: '0 0 12px rgba(248, 220, 108, 0.4)'
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.1 }}>
                HIDDEN <span style={{ color: '#F8DC6C' }}>SURPRISE</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#F8DC6C', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
                Admin & Analytics Portal
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Executive Access
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.88rem', margin: 0 }}>
            Sign in to view real-time traffic, impressions & leads
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '14px',
              padding: '0.85rem 1rem',
              marginBottom: '1.4rem',
              fontSize: '0.85rem',
              color: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <ShieldCheck size={18} style={{ flexShrink: 0, color: '#EF4444' }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Username */}
          <div>
            <label
              htmlFor="admin-username"
              style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.45rem' }}
            >
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF'
                }}
              />
              <input
                id="admin-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '14px',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
                className="admin-input"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.45rem' }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF'
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '0.85rem 2.75rem 0.85rem 2.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '14px',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
                className="admin-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Helper text */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.75)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: '#F8DC6C', cursor: 'pointer' }}
              />
              Keep me logged in
            </label>
            <span style={{ color: '#F8DC6C', opacity: 0.8, fontSize: '0.78rem' }}>
              Default: admin / surprise1313
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '0.95rem',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '0.4rem',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <KeyRound size={18} /> Enter Dashboard
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            onClick={onBackToSite}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            className="back-to-site-btn"
          >
            <ArrowLeft size={16} /> Return to Hidden Surprise Website
          </button>
        </div>
      </div>

      <style>{`
        .admin-input:focus {
          border-color: #F8DC6C !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 15px rgba(248, 220, 108, 0.2) !important;
        }
        .back-to-site-btn:hover {
          color: #F8DC6C !important;
        }
        @media (max-width: 480px) {
          .admin-login-card {
            padding: 2rem 1.4rem !important;
            border-radius: 22px !important;
          }
        }
      `}</style>
    </div>
  );
}
