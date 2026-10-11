import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AidFlowLogo } from '../../components/AidFlowLogo';
import { SystemScenarioBanner } from '../../components/SystemScenarioBanner';
import { LayoutDashboard } from 'lucide-react';

export const RequesterLayout: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f1ea', display: 'flex', flexDirection: 'column' }}>
      {/* Top Scenario Principle Banner */}
      <SystemScenarioBanner />

      {/* Citizen Top App Bar */}
      <header
        style={{
          backgroundColor: '#161f28',
          color: '#ffffff',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #233140',
        }}
      >
        <AidFlowLogo size="md" onClick={() => navigate('/request')} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language selector matching screenshot */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              padding: '2px',
            }}
          >
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '4px',
                backgroundColor: language === 'en' ? '#ffffff' : 'transparent',
                color: language === 'en' ? '#161f28' : '#cbd5e1',
                transition: 'all 0.15s ease',
              }}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('es')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '4px',
                backgroundColor: language === 'es' ? '#ffffff' : 'transparent',
                color: language === 'es' ? '#161f28' : '#cbd5e1',
                transition: 'all 0.15s ease',
              }}
            >
              Español
            </button>
          </div>

          {/* Quick link to Coordinator portal */}
          <button
            onClick={() => navigate('/coordinator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#c44d25',
              color: '#ffffff',
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <LayoutDashboard size={14} />
            <span>Coordinator View</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '1.5rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: location.pathname.includes('register-resource') ? '920px' : '480px' }}>
          <Outlet />
        </div>
      </main>

      {/* Bottom helper footer */}
      <footer
        style={{
          padding: '1.25rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#7b838c',
          borderTop: '1px solid #e7e2d6',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '0.4rem' }}>
          <button onClick={() => navigate('/request')} style={{ color: '#57606a', fontWeight: 600 }}>
            Request Help
          </button>
          <button onClick={() => navigate('/request/status/Request-50')} style={{ color: '#57606a', fontWeight: 600 }}>
            Track Request-50
          </button>
          <button onClick={() => navigate('/register-resource')} style={{ color: '#57606a', fontWeight: 600 }}>
            Register Shelter / Resource
          </button>
        </div>
        <div>AidFlow · Hamilton County Emergency Disaster Response · Call 911 in life-threatening emergencies</div>
      </footer>
    </div>
  );
};
