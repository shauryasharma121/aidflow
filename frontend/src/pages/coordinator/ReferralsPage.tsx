import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { Home, Phone, MapPin, Check, Plus, ExternalLink } from 'lucide-react';

export const ReferralsPage: React.FC = () => {
  const navigate = useNavigate();
  const { resources } = useAidFlow();

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.6rem', lineHeight: 1, marginBottom: '0.25rem' }}>
            Referrals & Community Resources
          </h1>
          <p style={{ color: '#56606a', fontSize: '0.92rem' }}>
            Shelters, meal centers, and aid groups available to take referrals during the flood.
          </p>
        </div>

        <button
          onClick={() => navigate('/register-resource')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: '#c44d25',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 12px rgba(196, 77, 37, 0.25)',
          }}
        >
          <Plus size={16} />
          <span>Register New Resource</span>
        </button>
      </div>

      {/* Grid of registered shelters / resources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {resources.map(res => (
          <div
            key={res.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e1dcce',
              padding: '1.5rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    backgroundColor: '#162330',
                    color: '#ffffff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                  }}
                >
                  {res.type}
                </span>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#2e7d32',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                  <span>Approved for dispatch</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.65rem', lineHeight: 1.15, marginBottom: '0.35rem' }}>
                {res.organizationName}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#56606a', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
                <MapPin size={15} />
                <span>{res.streetAddress}</span>
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16202a', marginBottom: '0.85rem' }}>
                Capacity: {res.capacity} people · {res.isOpen24Hours ? 'Open 24 hours' : `${res.opensTime} - ${res.closesTime}`}
              </div>

              {/* Amenities tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {res.amenities.map(am => (
                  <span
                    key={am}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#f1eee6',
                      color: '#38414a',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                    }}
                  >
                    {am}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0ece3', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#68737d' }}>
                Contact: <strong>{res.contactName}</strong> · <a href={`tel:${res.phone}`} style={{ color: '#16202a', textDecoration: 'underline' }}>{res.phone}</a>
              </div>

              <button
                onClick={() => alert(`Address & hours for "${res.organizationName}" sent via SMS to citizen!`)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #16202a',
                  color: '#16202a',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                }}
              >
                Send SMS Referral
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
