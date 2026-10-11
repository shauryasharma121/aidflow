import React from 'react';

interface AidFlowLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  onClick?: () => void;
}

export const AidFlowLogo: React.FC<AidFlowLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  subtitleText,
  onClick,
}) => {
  const iconDimensions = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const fontSize = size === 'sm' ? '1.25rem' : size === 'lg' ? '1.85rem' : '1.5rem';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: iconDimensions,
          height: iconDimensions,
          backgroundColor: '#c44d25',
          borderRadius: size === 'sm' ? '6px' : '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(196, 77, 37, 0.25)',
        }}
      >
        <svg
          width={iconDimensions * 0.65}
          height={iconDimensions * 0.65}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Lifebuoy / upload aid beacon */}
          <path d="M12 3v11" />
          <path d="m7 8 5-5 5 5" />
          <path d="M5 21h14" />
        </svg>
      </div>
      <div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            display: 'block',
          }}
        >
          AidFlow
        </span>
        {showSubtitle && subtitleText && (
          <span
            style={{
              fontSize: '0.72rem',
              color: '#9aa5b1',
              fontWeight: 500,
              display: 'block',
              marginTop: '0.1rem',
            }}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
