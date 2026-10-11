import React from 'react';
import { SeverityLevel } from '../types';

interface SeverityBadgeProps {
  level: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  sublabel?: string; // e.g. "Model 0.71", "SW override from S3", "Needs your rating"
  interactive?: boolean;
  selected?: boolean;
  pickType?: 'MODEL PICK' | 'YOUR PICK' | null;
  onClick?: () => void;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  size = 'md',
  sublabel,
  interactive = false,
  selected = false,
  pickType,
  onClick,
}) => {
  const getBadgeColors = () => {
    switch (level) {
      case 'S1':
        return { bg: '#741f17', text: '#ffffff', label: 'Critical' };
      case 'S2':
        return { bg: '#d65b2d', text: '#ffffff', label: 'High' };
      case 'S3':
        return { bg: '#e8b776', text: '#2f200c', label: 'Moderate' };
      case 'S4':
        return { bg: '#b4bdc6', text: '#1d252f', label: 'Low' };
      case 'Unscored':
      default:
        return { bg: '#edeae1', text: '#474036', label: 'Unscored', dashed: true };
    }
  };

  const colors = getBadgeColors();

  if (interactive) {
    // Large selector card used in the "Model suggests / You make the final call" panel
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          minWidth: '70px',
          padding: '0.65rem 0.5rem',
          borderRadius: '10px',
          border: selected ? '2px solid #141d24' : '1px solid #d5cec2',
          backgroundColor: '#ffffff',
          boxShadow: selected ? '0 3px 8px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.15s ease',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            fontWeight: 800,
            fontSize: '0.9rem',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            marginBottom: '0.35rem',
            border: colors.dashed ? '1px dashed #7a7062' : 'none',
          }}
        >
          {level}
        </div>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#1e2832',
          }}
        >
          {colors.label}
        </span>
        {pickType && (
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: pickType === 'MODEL PICK' ? '#5a626a' : '#141d24',
              marginTop: '0.25rem',
              letterSpacing: '0.03em',
            }}
          >
            {pickType}
          </span>
        )}
      </button>
    );
  }

  // Standard inline badge
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        onClick={onClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: size === 'sm' ? '0.15rem 0.45rem' : '0.25rem 0.65rem',
          borderRadius: '6px',
          backgroundColor: colors.bg,
          color: colors.text,
          border: colors.dashed ? '1.5px dashed #8b8070' : 'none',
          fontSize: size === 'sm' ? '0.75rem' : '0.85rem',
          fontWeight: 700,
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        <span>{level}</span>
        <span style={{ fontWeight: 600, opacity: 0.95 }}>{colors.label}</span>
      </div>
      {sublabel && (
        <span
          style={{
            fontSize: '0.68rem',
            color: '#656e77',
            marginTop: '0.25rem',
            fontWeight: 500,
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};
