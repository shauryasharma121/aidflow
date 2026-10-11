import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { SeverityLevel } from '../../types';
import { SeverityBadge } from '../../components/SeverityBadge';
import { AssignModal } from '../../components/AssignModal';
import {
  ArrowLeft,
  Maximize2,
  MapPin,
  Clock,
  Phone,
  Users,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';

export const RequestReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getRequestById,
    updateRequestSeverity,
    confirmModelSeverity,
    removeVulnerabilityFlag,
    markAsDuplicate,
  } = useAidFlow();

  const request = getRequestById(id || 'Request-50') || {
    id: id || 'Request-50',
    needType: 'Medical',
    peopleCount: 3,
    address: '214 S 9th St, Noblesville',
    town: 'Noblesville',
    phone: '(317) 555-0148',
    description: "Water came in fast overnight. My father (78) has chest pain and can't walk out through the flooded street. 214 S 9th St, Noblesville.",
    hasPhoto: true,
    photoUrl: '/sample-flood-house.svg',
    modelSeverity: 'S1',
    modelConfidence: 0.71,
    assignedSeverity: 'S1',
    status: 'Received',
    waitingMinutes: 12,
    submittedAt: '12 min ago',
    vulnerabilityFlags: ['Elderly', 'Medical'],
  };

  const [selectedRating, setSelectedRating] = useState<SeverityLevel>(request.assignedSeverity);
  const [overrideReason, setOverrideReason] = useState<string>(
    'Called back: chest pain has eased, EMS already en route. Family needs help getting him out through the water.'
  );
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);

  const isOverridden = selectedRating !== request.modelSeverity;

  const quickOverrideReasons = [
    'Called back',
    'Photo is unclear',
    'Already handled',
  ];

  const handleRatingClick = (level: SeverityLevel) => {
    setSelectedRating(level);
  };

  const handlePrimaryAction = () => {
    if (isOverridden) {
      if (!overrideReason.trim()) {
        alert('Please specify an override reason to log with your name.');
        return;
      }
      updateRequestSeverity(request.id, selectedRating, overrideReason);
    } else {
      confirmModelSeverity(request.id);
    }
    // Open the dispatch assignment modal
    setIsAssignModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Breadcrumb & Request Header */}
      <div>
        <button
          onClick={() => navigate('/coordinator')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#c44d25',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '0.65rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>Sorting Queue</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <h1 style={{ fontSize: '2.6rem', lineHeight: 1 }}>
              {request.id}
            </h1>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: '#ffffff',
                border: '1px solid #d5cebf',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                color: '#2a3540',
              }}
            >
              Status: {request.status === 'Received' ? 'New' : request.status}
            </span>

            {request.vulnerabilityFlags.length > 0 && (
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: '#162330',
                  color: '#ffffff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                ↑ {request.vulnerabilityFlags.join(' · ')} · raises priority
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.85rem', color: '#68737d' }}>
            Waiting {request.waitingMinutes} min - not yet confirmed
          </span>
        </div>
      </div>

      {/* Main Review Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Photos, Narrative, Location Pin */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Photo Preview Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e1dcce',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '270px', backgroundColor: '#9aa8b2' }}>
              <img
                src={request.photoUrl || '/sample-flood-house.svg'}
                alt="Damage uploaded by requester"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(21, 33, 45, 0.85)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                }}
              >
                Photo 1 of 1
              </div>

              <button
                onClick={() => setShowFullPhoto(true)}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#16202a',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                <Maximize2 size={13} />
                <span>View full size</span>
              </button>
            </div>

            <div style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#68737d' }}>
              Sent by requester · uploaded {request.waitingMinutes - 1} min ago
            </div>
          </div>

          {/* Description and Metadata Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e1dcce',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
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
                  marginBottom: '0.4rem',
                }}
              >
                DESCRIPTION
              </div>
              <blockquote
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.45,
                  color: '#151e28',
                  fontStyle: 'normal',
                  fontWeight: 500,
                }}
              >
                "{request.description}"
              </blockquote>
            </div>

            {/* Metadata Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                borderTop: '1px solid #f0ecdf',
                paddingTop: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7a848e', textTransform: 'uppercase' }}>
                  NEED TYPE
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#16202a', marginTop: '0.2rem' }}>
                  {request.needType}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7a848e', textTransform: 'uppercase' }}>
                  PEOPLE
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#16202a', marginTop: '0.2rem' }}>
                  {request.peopleCount}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7a848e', textTransform: 'uppercase' }}>
                  SUBMITTED
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#16202a', marginTop: '0.2rem' }}>
                  {request.waitingMinutes} min ago
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7a848e', textTransform: 'uppercase' }}>
                  CONTACT
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#16202a', marginTop: '0.2rem' }}>
                  <a href={`tel:${request.phone}`} style={{ color: '#16202a', textDecoration: 'underline' }}>
                    {request.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Location with mini grid map graphic */}
            <div style={{ borderTop: '1px solid #f0ecdf', paddingTop: '1rem' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#656f7a',
                  marginBottom: '0.65rem',
                }}
              >
                LOCATION
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'center' }}>
                {/* Styled mini district map grid matching screenshot */}
                <div
                  style={{
                    height: '90px',
                    borderRadius: '8px',
                    backgroundColor: '#eae6db',
                    overflow: 'hidden',
                    border: '1px solid #d5cec2',
                    position: 'relative',
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 160 90">
                    {/* Road grid */}
                    <rect x="0" y="0" width="160" height="90" fill="#dedad0" />
                    <line x1="0" y1="35" x2="160" y2="35" stroke="#ffffff" strokeWidth="8" />
                    <line x1="0" y1="65" x2="160" y2="65" stroke="#ffffff" strokeWidth="6" />
                    <line x1="50" y1="0" x2="50" y2="90" stroke="#ffffff" strokeWidth="7" />
                    <line x1="100" y1="0" x2="100" y2="90" stroke="#ffffff" strokeWidth="8" />
                    <line x1="140" y1="0" x2="140" y2="90" stroke="#ffffff" strokeWidth="6" />

                    {/* Water creek section */}
                    <path d="M 120 0 Q 130 45 155 90 L 160 90 L 160 0 Z" fill="#b0c0ce" opacity="0.6" />

                    {/* Location Pin */}
                    <g transform="translate(70, 32)">
                      <circle cx="0" cy="0" r="7" fill="#c44d25" />
                      <circle cx="0" cy="0" r="3" fill="#ffffff" />
                    </g>
                  </svg>
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#16202a' }}>
                    {request.address}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#68737d', marginTop: '0.15rem' }}>
                    From address in description
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Human-in-the-loop Model Suggestion & Decision Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e1dcce',
              padding: '1.5rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h2 style={{ fontSize: '1.9rem', lineHeight: 1 }}>
                Model suggests
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#56606a', fontWeight: 500 }}>
                You make the final call
              </span>
            </div>

            {/* 4 Severity Selector Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {(['S1', 'S2', 'S3', 'S4'] as SeverityLevel[]).map(level => {
                const isModelPick = level === request.modelSeverity;
                const isUserPick = level === selectedRating;
                const pickLabel = isUserPick && isOverridden ? 'YOUR PICK' : isModelPick ? 'MODEL PICK' : null;

                return (
                  <SeverityBadge
                    key={level}
                    level={level}
                    interactive
                    selected={isUserPick}
                    pickType={pickLabel}
                    onClick={() => handleRatingClick(level)}
                  />
                );
              })}
            </div>

            {/* Model Confidence Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span>Confidence: {request.modelConfidence.toFixed(2)}</span>
                <span style={{ fontSize: '0.75rem', color: '#7a848e', fontWeight: 500 }}>0 ··· 1</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e8e4da', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${request.modelConfidence * 100}%`,
                    height: '100%',
                    backgroundColor: '#162330',
                    borderRadius: '999px',
                  }}
                />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#68737d', marginTop: '0.35rem' }}>
                Closer to 1 means the model is more certain about its rating.
              </p>
            </div>

            {/* Vulnerability Flag Card */}
            {request.vulnerabilityFlags.length > 0 && (
              <div
                style={{
                  backgroundColor: '#faf8f4',
                  borderRadius: '10px',
                  border: '1px solid #e7e2d6',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#162330',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                    marginTop: '2px',
                  }}
                >
                  {request.vulnerabilityFlags.join(' · ')}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#3d4650', lineHeight: 1.35 }}>
                  <strong>Vulnerability flag raises priority.</strong> Found in the description: age 78, chest pain, can't walk.{' '}
                  <button
                    onClick={() => removeVulnerabilityFlag(request.id, request.vulnerabilityFlags[0])}
                    style={{ color: '#c44d25', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Remove flag
                  </button>
                </div>
              </div>
            )}

            {/* Overridden state fields matching screenshot 6 */}
            {isOverridden && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderTop: '1px solid #eee8dd',
                  paddingTop: '1rem',
                }}
              >
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#16202a' }}>
                  Override reason <span style={{ color: '#c44d25' }}>(required)</span>
                </label>
                <textarea
                  value={overrideReason}
                  onChange={e => setOverrideReason(e.target.value)}
                  rows={3}
                  placeholder="Explain why you are overriding the model..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #d97750',
                    fontSize: '0.88rem',
                    lineHeight: 1.4,
                    outline: 'none',
                    backgroundColor: '#fffdfb',
                  }}
                />

                {/* Quick suggestions pills */}
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {quickOverrideReasons.map(reason => (
                    <button
                      type="button"
                      key={reason}
                      onClick={() => setOverrideReason(reason + ': ' + overrideReason)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: '#162330',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#68737d' }}>
                  Logged with your name in Operations: <strong>{request.modelSeverity} → {selectedRating}</strong>.
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={handlePrimaryAction}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '8px',
                backgroundColor: '#c44d25',
                color: '#ffffff',
                fontSize: '1.02rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(196, 77, 37, 0.25)',
                transition: 'background-color 0.15s ease',
              }}
            >
              {isOverridden ? `Override to ${selectedRating} and Assign` : `Confirm ${request.modelSeverity} and Assign`}
            </button>

            {/* Secondary Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={() => navigate('/coordinator/referrals')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #16202a',
                  backgroundColor: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#16202a',
                }}
              >
                Refer Out
              </button>

              <button
                onClick={() => {
                  markAsDuplicate(request.id, 'Request-48');
                  alert(`Marked ${request.id} as duplicate.`);
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #16202a',
                  backgroundColor: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#16202a',
                }}
              >
                Mark as Duplicate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Assignment Modal */}
      {isAssignModalOpen && (
        <AssignModal
          request={{ ...request, assignedSeverity: selectedRating }}
          onClose={() => setIsAssignModalOpen(false)}
          onAssigned={teamName => {
            alert(`Team "${teamName}" dispatched to ${request.id}!`);
            navigate('/coordinator');
          }}
        />
      )}

      {/* Full Size Photo Lightbox Modal */}
      {showFullPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setShowFullPhoto(false)}
        >
          <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setShowFullPhoto(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: '#ffffff',
                padding: '0.5rem',
              }}
            >
              <X size={24} />
            </button>
            <img
              src={request.photoUrl || '/sample-flood-house.svg'}
              alt="High resolution flood damage view"
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
