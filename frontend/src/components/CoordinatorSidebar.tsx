import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AidFlowLogo } from './AidFlowLogo';
import { useAidFlow } from '../context/AidFlowContext';
import {
  ListFilter,
  Eye,
  Users,
  MapPin,
  Share2,
  BarChart2,
  Smartphone,
} from 'lucide-react';

export const CoordinatorSidebar: React.FC = () => {
  const { requests } = useAidFlow();
  const location = useLocation();
  const navigate = useNavigate();

  const openCount = requests.filter(r => r.status === 'Received').length;

  const navItems = [
    {
      to: '/coordinator',
      label: 'Sorting Queue',
      icon: ListFilter,
      badge: openCount,
    },
    {
      to: '/coordinator/review/Request-50',
      label: 'Request Review',
      icon: Eye,
      isActiveMatch: (path: string) => path.startsWith('/coordinator/review'),
    },
    {
      to: '/coordinator/assign/Request-50',
      label: 'Assign Teams',
      icon: Users,
      isActiveMatch: (path: string) => path.startsWith('/coordinator/assign'),
    },
    {
      to: '/coordinator/map',
      label: 'Coverage Map',
      icon: MapPin,
    },
    {
      to: '/coordinator/referrals',
      label: 'Referrals',
      icon: Share2,
    },
    {
      to: '/coordinator/operations',
      label: 'Operations',
      icon: BarChart2,
    },
  ];

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        backgroundColor: '#141d26',
        color: '#d4dbe0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid #1f2a36',
        zIndex: 20,
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.25rem',
            borderBottom: '1px solid #1e2833',
          }}
        >
          <AidFlowLogo onClick={() => navigate('/coordinator')} />
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '0.75rem 0.5rem' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isCurrent = item.isActiveMatch
              ? item.isActiveMatch(location.pathname)
              : location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  marginBottom: '0.25rem',
                  textDecoration: 'none',
                  color: isCurrent ? '#ffffff' : '#9ca6af',
                  backgroundColor: isCurrent ? '#233140' : 'transparent',
                  fontWeight: isCurrent ? 600 : 500,
                  fontSize: '0.9rem',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} strokeWidth={isCurrent ? 2.25 : 1.75} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: '#c44d25',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px',
                      minWidth: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Active Incident & Mode Switcher */}
      <div style={{ padding: '1rem', borderTop: '1px solid #1e2833' }}>
        {/* Mode switcher to citizen intake */}
        <button
          onClick={() => navigate('/request')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.55rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#e2e8f0',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'background-color 0.15s ease',
          }}
        >
          <Smartphone size={15} />
          <span>Switch to Citizen View</span>
        </button>

        <div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#76828e',
            }}
          >
            ACTIVE EVENT
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f0f4f8', marginTop: '0.15rem' }}>
            Flood Response
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a1ad' }}>
            Hamilton County, IN
          </div>
        </div>
      </div>
    </aside>
  );
};
