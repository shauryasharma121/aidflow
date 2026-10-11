import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { StatusTracker } from '../../components/StatusTracker';
import { Check, MessageSquare, Copy } from 'lucide-react';
import '../../styles/common.css';
import '../../styles/CitizenFlow.css';

/**
 * RequestStatusPage
 * 
 * Citizen ticket tracking view.
 * Displays the 4-phase lifecycle (Received -> Assigned -> Help on the way -> Done)
 * and SMS callback notification details.
 */
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
    <div className="citizen-phone-wrapper">
      {/* Success Header */}
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
        <h1 className="title-main" style={{ fontSize: '2.4rem' }}>
          We got your request
        </h1>
      </div>

      {/* Ticket Number Card */}
      <div className="panel-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem' }}>
        <div>
          <div className="metadata-label" style={{ marginBottom: '0.2rem' }}>
            YOUR TICKET NUMBER
          </div>
          <div className="ticket-number-hero">
            {request.id}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#56606a', marginTop: '0.25rem' }}>
            {request.needType} · {request.peopleCount} people · {request.address.split(',')[0]}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <Copy size={15} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Status Tracker Card */}
      <div className="panel-card">
        <h2 className="title-main" style={{ fontSize: '1.65rem', marginBottom: '1.25rem' }}>
          Status
        </h2>
        <StatusTracker status={request.status as any} mode="vertical" />
      </div>

      {/* SMS notification notice */}
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

      {/* 911 Escalation */}
      <div className="danger-alert-box" style={{ fontSize: '0.92rem' }}>
        <span>
          <strong>If things get worse</strong>, call <a href="tel:911" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>911</a>.
        </span>
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.5rem' }}>
        <button onClick={() => navigate('/request')} className="btn-secondary">
          Update request
        </button>

        <button
          onClick={() => navigate('/request/photos', { state: { requestId: request.id } })}
          className="btn-secondary"
          style={{ backgroundColor: '#f0ece3', borderColor: '#d5cebf' }}
        >
          Add photos
        </button>
      </div>
    </div>
  );
};
