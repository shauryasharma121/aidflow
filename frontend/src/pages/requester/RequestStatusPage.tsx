import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { StatusTracker } from '../../components/StatusTracker';
import { Check, MessageSquare, Copy, AlertCircle } from 'lucide-react';

export const RequestStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRequestById } = useAidFlow();

  const [copied, setCopied] = useState(false);

  const request = getRequestById(id || 'Request-50') || {
    id: id || 'Request-50',
    needType: 'Medical',
    peopleCount: 3,
    address: '214 S 9th St, Noblesville',
    phone: '(317) 555-0148',
    status: 'Assigned',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(request.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Big Success Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#162330',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Check size={26} strokeWidth={3} />
        </div>
        <h1 style={{ fontSize: '2.4rem', lineHeight: 1.1, textTransform: 'none' }}>
          We got your request
        </h1>
      </div>

      {/* Ticket Number Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e1dcce',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#656f7a',
              marginBottom: '0.2rem',
            }}
          >
            YOUR TICKET NUMBER
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: '2.1rem',
              fontWeight: 800,
              color: '#151e28',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {request.id}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#56606a', marginTop: '0.25rem' }}>
            {request.needType} · {request.peopleCount} people · {request.address.split(',')[0]}
          </div>
        </div>

        <button
          onClick={handleCopy}
          style={{
            padding: '0.55rem 1.1rem',
            borderRadius: '8px',
            border: '1.5px solid #d5cebf',
            backgroundColor: '#ffffff',
            fontWeight: 600,
            fontSize: '0.88rem',
            color: '#151e28',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'background-color 0.15s ease',
          }}
        >
          <Copy size={15} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Status Tracker Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e1dcce',
          padding: '1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <h2 style={{ fontSize: '1.65rem', marginBottom: '1.25rem' }}>
          Status
        </h2>
        <StatusTracker status={request.status as any} mode="vertical" />
      </div>

      {/* Text message notice banner */}
      <div
        style={{
          display: 'flex',
          gap: '0.85rem',
          backgroundColor: '#e7edf3',
          border: '1px solid #d0dbe6',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          fontSize: '0.9rem',
          color: '#1c2834',
          lineHeight: 1.45,
        }}
      >
        <MessageSquare size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#273849' }} />
        <div>
          We'll text <strong>{request.phone}</strong> when help is dispatched and when your request is closed. You don't need to keep this page open.
        </div>
      </div>

      {/* 911 Escalation Card */}
      <div
        style={{
          backgroundColor: '#fbece8',
          border: '1px solid #f2d4cd',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          color: '#8b271d',
          fontSize: '0.92rem',
        }}
      >
        <strong>If things get worse</strong>, call <a href="tel:911" style={{ color: '#8b271d', fontWeight: 700, textDecoration: 'underline' }}>911</a>.
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => navigate('/request')}
          style={{
            padding: '0.85rem',
            borderRadius: '8px',
            border: '1.5px solid #16202a',
            backgroundColor: '#ffffff',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: '#16202a',
          }}
        >
          Update request
        </button>

        <button
          onClick={() => navigate('/request/photos', { state: { requestId: request.id } })}
          style={{
            padding: '0.85rem',
            borderRadius: '8px',
            border: '1.5px solid #d5cebf',
            backgroundColor: '#f0ece3',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: '#16202a',
          }}
        >
          Add photos
        </button>
      </div>
    </div>
  );
};
