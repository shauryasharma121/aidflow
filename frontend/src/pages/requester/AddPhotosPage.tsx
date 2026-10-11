import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, Image, AlertTriangle, Check } from 'lucide-react';

export const AddPhotosPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requestId = (location.state as any)?.requestId || 'Request-50';

  const [hasPhotoAttached, setHasPhotoAttached] = useState<boolean>(true);
  const [photoKept, setPhotoKept] = useState<boolean>(false);

  const handleFinish = () => {
    navigate(`/request/status/${requestId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Request sent confirmation banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          backgroundColor: '#e6eef5',
          border: '1px solid #d2dfea',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          color: '#1a2734',
          fontSize: '0.92rem',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#162330',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Check size={12} strokeWidth={3} />
        </div>
        <span>
          <strong>Request sent · {requestId}.</strong> A coordinator is reviewing it now.
        </span>
      </div>

      {/* Header */}
      <div>
        <div style={{ fontSize: '0.85rem', color: '#68737d', fontWeight: 600, marginBottom: '0.15rem' }}>
          Step 2 of 2 · optional
        </div>
        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.05, marginBottom: '0.35rem' }}>
          Add photos of the damage
        </h1>
        <p style={{ color: '#56606a', fontSize: '0.95rem' }}>
          Photos help coordinators see what's happening.
        </p>
        <p style={{ color: '#16202a', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.15rem' }}>
          Skipping won't lower your priority.
        </p>
      </div>

      {/* Uploaded photo with AI quality warning */}
      {hasPhotoAttached && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e1dcce',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Dark image preview */}
            <div
              style={{
                width: '105px',
                height: '105px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#151b22',
                flexShrink: 0,
              }}
            >
              <img
                src="/sample-dark-photo.svg"
                alt="Uploaded damage snapshot"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Warning text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#8b271d',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginBottom: '0.25rem',
                }}
              >
                <AlertTriangle size={16} />
                <span>Too dark to see</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#55606b', lineHeight: 1.35 }}>
                Try again with more light or the flash on. You can keep it if that's not possible.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => setHasPhotoAttached(false)}
              style={{
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1.5px solid #1f2a36',
                backgroundColor: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
              }}
            >
              <Camera size={16} />
              Retake
            </button>
            <button
              type="button"
              onClick={() => setPhotoKept(true)}
              style={{
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #cfc8bd',
                backgroundColor: photoKept ? '#e8edf1' : '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#1f2a36',
              }}
            >
              {photoKept ? 'Kept' : 'Keep anyway'}
            </button>
          </div>
        </div>
      )}

      {/* Alternative photo options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setHasPhotoAttached(true)}
          style={{
            border: '1.5px dashed #1f2a36',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
          }}
        >
          <Camera size={26} color="#1f2a36" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Take a photo</span>
        </button>

        <button
          type="button"
          onClick={() => setHasPhotoAttached(true)}
          style={{
            border: '1.5px dashed #1f2a36',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
          }}
        >
          <Image size={26} color="#1f2a36" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Choose from library</span>
        </button>
      </div>

      <p style={{ fontSize: '0.82rem', color: '#68737d', lineHeight: 1.4 }}>
        Up to 3 photos. They upload in the background, so you can close this page once you tap Upload.
      </p>

      {/* Primary and secondary submission controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={handleFinish}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#c44d25',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontWeight: 700,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(196, 77, 37, 0.25)',
          }}
        >
          {hasPhotoAttached ? 'Upload 1 photo' : 'Done'}
        </button>

        <button
          type="button"
          onClick={handleFinish}
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '8px',
            backgroundColor: '#f2eee5',
            color: '#1f2a36',
            border: '1.5px solid #d5cebf',
            fontSize: '0.95rem',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Skip photos
        </button>
      </div>
    </div>
  );
};
