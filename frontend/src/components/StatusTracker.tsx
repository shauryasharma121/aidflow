import React from 'react';
import { RequestStatus } from '../types';

interface StatusTrackerProps {
  status: RequestStatus;
  mode?: 'vertical' | 'horizontal';
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ status, mode = 'vertical' }) => {
  const steps = [
    {
      id: 'Received',
      title: 'Received',
      subtitle: 'Just now',
      altTitle: 'New',
    },
    {
      id: 'Assigned',
      title: 'Assigned',
      subtitle: 'A coordinator is choosing a volunteer team',
      altTitle: 'Assigned',
    },
    {
      id: 'In Progress',
      title: 'Help on the way',
      subtitle: "We'll text you when a team is dispatched",
      altTitle: 'In Progress',
    },
    {
      id: 'Resolved',
      title: 'Done',
      subtitle: "We'll text you when the request is closed",
      altTitle: 'Resolved',
    },
  ];

  const getStepIndex = (st: RequestStatus) => {
    switch (st) {
      case 'Received':
        return 0;
      case 'Assigned':
        return 1;
      case 'In Progress':
        return 2;
      case 'Resolved':
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  if (mode === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <React.Fragment key={step.id}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? '#141d24' : '#ffffff',
                    border: isCurrent ? '3px solid #c44d25' : isDone ? '2px solid #141d24' : '2px solid #cfc8bd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCurrent ? '0 0 0 3px rgba(196, 77, 37, 0.2)' : 'none',
                  }}
                >
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : isCurrent ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c44d25' }} />
                  ) : null}
                </div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#141d24' : '#737a82',
                    marginTop: '0.35rem',
                  }}
                >
                  {step.altTitle}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: idx < currentIndex ? '#141d24' : '#dfdbd0',
                    margin: '0 0.5rem',
                    marginBottom: '1.2rem',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Vertical timeline matching screenshot 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {steps.map((step, idx) => {
        const isDone = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isPending = idx > currentIndex;

        return (
          <div key={step.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
            {/* Timeline icon column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isDone ? '#151d24' : '#ffffff',
                  border: isCurrent
                    ? '3px solid #c44d25'
                    : isDone
                    ? '2px solid #151d24'
                    : '2px solid #ccc6b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(196, 77, 37, 0.15)' : 'none',
                  zIndex: 2,
                }}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : isCurrent ? (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#c44d25' }} />
                ) : null}
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    width: '2px',
                    height: '42px',
                    backgroundColor: isDone ? '#151d24' : '#dcd6cb',
                    margin: '2px 0',
                  }}
                />
              )}
            </div>

            {/* Timeline content */}
            <div style={{ paddingBottom: idx === steps.length - 1 ? 0 : '1.25rem' }}>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: isPending ? '#8a9199' : '#141d24',
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: isPending ? '#9ea5ad' : '#57606a',
                  marginTop: '0.15rem',
                }}
              >
                {step.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
