import React, { useState } from 'react';
import { AidRequest } from '../types';
import { useAidFlow } from '../context/AidFlowContext';
import { StatusTracker } from './StatusTracker';
import { SeverityBadge } from './SeverityBadge';
import { X } from 'lucide-react';

interface AssignModalProps {
  request: AidRequest;
  onClose: () => void;
  onAssigned?: (teamName: string) => void;
}

export const AssignModal: React.FC<AssignModalProps> = ({ request, onClose, onAssigned }) => {
  const { teams, assignTeamToRequest } = useAidFlow();
  const [filterMode, setFilterMode] = useState<'available' | 'nearest'>('available');

  const handlePick = (teamId: string, teamName: string) => {
    assignTeamToRequest(request.id, teamId);
    if (onAssigned) {
      onAssigned(teamName);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 33, 0.65)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.22)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Assign {request.id}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
              <SeverityBadge level={request.assignedSeverity} size="sm" />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: '#f1ede4',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '999px',
                  color: '#343c44',
                }}
              >
                {request.needType}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: '#f1ede4',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '999px',
                  color: '#343c44',
                }}
              >
                {request.peopleCount} {request.peopleCount === 1 ? 'person' : 'people'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#68737d' }}>
                {request.address}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.35rem',
              borderRadius: '8px',
              border: '1px solid #e2ddd2',
              color: '#555f69',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress tracker */}
        <div
          style={{
            backgroundColor: '#f9f8f5',
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            border: '1px solid #ebe6dc',
          }}
        >
          <StatusTracker status={request.status} mode="horizontal" />
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333b43' }}>
              Show:
            </span>
            <button
              onClick={() => setFilterMode('available')}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '0.35rem 0.8rem',
                borderRadius: '999px',
                backgroundColor: filterMode === 'available' ? '#141d24' : '#ffffff',
                color: filterMode === 'available' ? '#ffffff' : '#3d4650',
                border: filterMode === 'available' ? 'none' : '1px solid #d5cec2',
              }}
            >
              Available Now
            </button>
            <button
              onClick={() => setFilterMode('nearest')}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '0.35rem 0.8rem',
                borderRadius: '999px',
                backgroundColor: filterMode === 'nearest' ? '#141d24' : '#ffffff',
                color: filterMode === 'nearest' ? '#ffffff' : '#3d4650',
                border: filterMode === 'nearest' ? 'none' : '1px solid #d5cec2',
              }}
            >
              Nearest First
            </button>
          </div>

          <span style={{ fontSize: '0.82rem', color: '#7a848e', fontWeight: 500 }}>
            {teams.length} teams
          </span>
        </div>

        {/* Teams List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {teams.map(team => {
            const isBooked = team.status === 'booked';
            const isNearest = team.id === 'team-wr';

            return (
              <div
                key={team.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: isBooked ? '#f5f3ee' : '#ffffff',
                  border: isBooked ? '1px solid #e7e2d6' : '1px solid #dfd8cc',
                  boxShadow: isBooked ? 'none' : '0 1px 3px rgba(0,0,0,0.03)',
                  opacity: isBooked ? 0.75 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {/* Team badge / avatar */}
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: isBooked ? '#b2bcc4' : '#141d24',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    {team.initials}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#16202a' }}>
                      {team.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#68727d', marginTop: '0.1rem' }}>
                      {isBooked ? (
                        <span>Booked · {team.distanceMiles} mi away</span>
                      ) : (
                        <span>
                          <strong style={{ color: '#16202a' }}>{team.freeMembers} free</strong> · {team.distanceMiles} mi away
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {isNearest && !isBooked && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: '#e6ebef',
                        color: '#2a3b4c',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      Nearest available
                    </span>
                  )}

                  {isBooked ? (
                    <button
                      disabled
                      style={{
                        padding: '0.45rem 1.25rem',
                        borderRadius: '6px',
                        backgroundColor: '#ded8cb',
                        color: '#7f786c',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'not-allowed',
                      }}
                    >
                      Booked
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePick(team.id, team.name)}
                      style={{
                        padding: '0.45rem 1.25rem',
                        borderRadius: '6px',
                        backgroundColor: isNearest ? '#c44d25' : '#ffffff',
                        color: isNearest ? '#ffffff' : '#16202a',
                        border: isNearest ? 'none' : '1px solid #16202a',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'opacity 0.15s ease',
                      }}
                    >
                      Pick
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Cancel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #eee8dd', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#68727d' }}>
            The team gets the task on their phones. Status moves to Assigned.
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              border: '1px solid #cfc7ba',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#2c353f',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
