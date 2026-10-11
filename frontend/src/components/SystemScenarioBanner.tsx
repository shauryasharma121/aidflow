import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Sparkles, UserCheck } from 'lucide-react';

export const SystemScenarioBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#1b2631',
        borderBottom: '1px solid #293847',
        color: '#e2e8f0',
        padding: collapsed ? '0.45rem 1.25rem' : '0.65rem 1.25rem',
        fontSize: '0.85rem',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#c44d25',
              color: '#ffffff',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <UserCheck size={12} />
            Human-in-the-Loop Triage
          </div>

          {!collapsed && (
            <p style={{ margin: 0, color: '#cfd8dc', lineHeight: 1.4, fontSize: '0.82rem' }}>
              <strong style={{ color: '#ffffff' }}>Operational Principle:</strong> "During a local flood, people submit aid requests from their phones, with an optional photo. A model rates the photo's damage severity (S1 Critical to S4 Low). A volunteer coordinator reviews each request, confirms or overrides the rating, and assigns a volunteer team.{' '}
              <span style={{ color: '#ffb74d', fontWeight: 600 }}>The model only suggests. A person always makes the final call.</span>"
            </p>
          )}

          {collapsed && (
            <span style={{ color: '#90a4ae', fontSize: '0.78rem' }}>
              The model only suggests. A person always makes the final call.
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: '#90a4ae',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
          title={collapsed ? 'Expand scenario description' : 'Minimize'}
        >
          {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
    </div>
  );
};
