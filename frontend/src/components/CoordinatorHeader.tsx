import React from 'react';
import { useAidFlow } from '../context/AidFlowContext';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CoordinatorHeader: React.FC = () => {
  const { currentCoordinator } = useAidFlow();
  const navigate = useNavigate();

  return (
    <header
      style={{
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e7e2d7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Event indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#16202a' }}>
          Flood Response · Hamilton County, IN
        </span>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.15rem 0.55rem',
            borderRadius: '999px',
            backgroundColor: '#fbeee8',
            color: '#c44d25',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#c44d25',
              display: 'inline-block',
            }}
          />
          Active
        </div>
      </div>

      {/* Right controls: Coordinator profile + switch link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          onClick={() => navigate('/request')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#c44d25',
            backgroundColor: '#fff',
            border: '1px solid #ebd8ce',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <ExternalLink size={14} />
          Submit Citizen Request
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#141d24', lineHeight: 1.2 }}>
              {currentCoordinator.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#68727d', fontWeight: 500 }}>
              {currentCoordinator.role}
            </div>
          </div>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#151e28',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
            }}
          >
            {currentCoordinator.initials}
          </div>
        </div>
      </div>
    </header>
  );
};
