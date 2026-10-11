import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { AlertTriangle, Users, MapPin, ChevronRight } from 'lucide-react';

export const CoverageMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { zoneCoverages, requests, teams } = useAidFlow();

  const [selectedTownName, setSelectedTownName] = useState<string>('Fishers');

  const selectedZone = zoneCoverages.find(z => z.town === selectedTownName) || zoneCoverages[0];

  const totalOpen = requests.filter(r => r.status === 'Received').length;
  const inProgress = requests.filter(r => r.status === 'Assigned' || r.status === 'In Progress').length;
  const idleZones = zoneCoverages.filter(z => z.status === 'Silent').length;

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 style={{ fontSize: '2.6rem', lineHeight: 1 }}>Coverage Map</h1>
        <span style={{ fontSize: '0.8rem', color: '#7a848e' }}>Updated just now</span>
      </div>

      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e1dcce',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            {totalOpen}
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#56606a', marginTop: '0.35rem' }}>
            Open
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e1dcce',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            {inProgress}
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#56606a', marginTop: '0.35rem' }}>
            In Progress
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e1dcce',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            {idleZones}
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#56606a', marginTop: '0.35rem' }}>
            Zones Idle
          </div>
        </div>
      </div>

      {/* Map & Detail Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* District Map Panel */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e1dcce',
            padding: '1.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          {/* Custom SVG Hamilton County flood districts */}
          <div style={{ width: '100%', height: '420px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#efebe3' }}>
            <svg width="100%" height="100%" viewBox="0 0 700 480" style={{ cursor: 'pointer' }}>
              <defs>
                {/* Diagonal hazard stripes pattern for coverage gap */}
                <pattern id="hazardStripes" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#d95e34" strokeWidth="8" />
                  <line x1="8" y1="0" x2="8" y2="16" stroke="#f6c2b0" strokeWidth="8" />
                </pattern>
              </defs>

              {/* District: Sheridan */}
              <g onClick={() => setSelectedTownName('Sheridan')}>
                <rect x="10" y="10" width="220" height="150" rx="4" fill="#ded9ce" stroke="#ffffff" strokeWidth="3" />
                <text x="120" y="80" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="#1e2832">Sheridan</text>
                <text x="120" y="102" textAnchor="middle" fontSize="13" fill="#67717c">0 open · silent</text>
              </g>

              {/* District: Cicero (with water lake) */}
              <g onClick={() => setSelectedTownName('Cicero')}>
                <rect x="235" y="10" width="210" height="150" rx="4" fill="#ded9ce" stroke="#ffffff" strokeWidth="3" />
                <ellipse cx="340" cy="55" rx="55" ry="18" fill="#a8bdcc" />
                <text x="340" y="100" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="#1e2832">Cicero</text>
                <text x="340" y="122" textAnchor="middle" fontSize="13" fill="#67717c">0 open · silent</text>
              </g>

              {/* District: Arcadia */}
              <g onClick={() => setSelectedTownName('Arcadia')}>
                <rect x="450" y="10" width="240" height="150" rx="4" fill="#ded9ce" stroke="#ffffff" strokeWidth="3" />
                <text x="570" y="80" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="#1e2832">Arcadia</text>
                <text x="570" y="102" textAnchor="middle" fontSize="13" fill="#67717c">0 open · silent</text>
              </g>

              {/* District: Westfield (Being worked) */}
              <g onClick={() => setSelectedTownName('Westfield')}>
                <rect x="10" y="165" width="300" height="145" rx="4" fill="#2d404e" stroke="#ffffff" strokeWidth="3" />
                <text x="160" y="235" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="#ffffff">Westfield</text>
                <text x="160" y="260" textAnchor="middle" fontSize="14" fill="#b0bec5">13 open</text>
              </g>

              {/* District: Noblesville (Being worked) */}
              <g onClick={() => setSelectedTownName('Noblesville')}>
                <rect x="315" y="165" width="375" height="145" rx="4" fill="#2d404e" stroke="#ffffff" strokeWidth="3" />
                <text x="500" y="235" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="#ffffff">Noblesville</text>
                <text x="500" y="260" textAnchor="middle" fontSize="14" fill="#b0bec5">9 open</text>
              </g>

              {/* District: Carmel (Being worked) */}
              <g onClick={() => setSelectedTownName('Carmel')}>
                <rect x="10" y="315" width="330" height="155" rx="4" fill="#2d404e" stroke="#ffffff" strokeWidth="3" />
                <text x="175" y="385" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="#ffffff">Carmel</text>
                <text x="175" y="410" textAnchor="middle" fontSize="14" fill="#b0bec5">14 open</text>
              </g>

              {/* District: Fishers (COVERAGE GAP - STRIPED PATTERN) */}
              <g onClick={() => setSelectedTownName('Fishers')}>
                <rect x="345" y="315" width="345" height="155" rx="4" fill="url(#hazardStripes)" stroke="#ffffff" strokeWidth="3" />

                {/* Dashed selected highlight box */}
                <rect
                  x="370"
                  y="330"
                  width="295"
                  height="85"
                  rx="6"
                  fill="none"
                  stroke="#162330"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Floating white label box */}
                <rect x="430" y="340" width="175" height="42" rx="6" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
                <text x="517" y="367" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="#162330">Fishers</text>
                <text x="517" y="435" textAnchor="middle" fontSize="13" fontWeight="700" fill="#751f0b">116th St to 131st St</text>
              </g>

              {/* River path meandering north to south (White River) */}
              <path
                d="M 480 0 Q 420 180 390 280 T 360 480"
                fill="none"
                stroke="#698ca1"
                strokeWidth="11"
                strokeLinecap="round"
                opacity="0.9"
                pointerEvents="none"
              />
            </svg>
          </div>

          {/* Map Legend matching screenshot */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.25rem', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#2d404e', borderRadius: '3px' }} />
              <span><strong>Being worked</strong> · volunteers on site</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#ded9ce', borderRadius: '3px' }} />
              <span><strong>Silent</strong> · no requests or activity yet</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '3px',
                  backgroundImage: 'repeating-linear-gradient(45deg, #d95e34, #d95e34 3px, #f6c2b0 3px, #f6c2b0 6px)',
                }}
              />
              <span><strong>Coverage gap</strong> · open requests, no volunteers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Zone Inspection Card + Town Breakdown Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Detail card for selected zone matching screenshot */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: selectedZone.status === 'Coverage gap' ? '2px solid #de6428' : '1px solid #e1dcce',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            {selectedZone.status === 'Coverage gap' && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#932a1e',
                  backgroundColor: '#fbece8',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                <AlertTriangle size={13} />
                <span>Coverage gap</span>
              </div>
            )}

            <h2 style={{ fontSize: '1.8rem', lineHeight: 1.1, marginBottom: '0.4rem' }}>
              {selectedZone.town}{selectedZone.town === 'Fishers' ? ', 116th St to 131st St' : ''}
            </h2>

            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#162330', marginBottom: '0.75rem' }}>
              {selectedZone.openRequests} open requests · {selectedZone.volunteers} volunteers
            </div>

            <p style={{ fontSize: '0.85rem', color: '#56606a', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              {selectedZone.notes || `${selectedZone.town} currently has active volunteer units operating.`}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <button
                onClick={() => navigate('/coordinator/assign/Request-48')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#c44d25',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                }}
              >
                Staff it
              </button>
              <button
                onClick={() => navigate('/coordinator')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #16202a',
                  backgroundColor: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: '#16202a',
                }}
              >
                View {selectedZone.openRequests} requests
              </button>
            </div>
          </div>

          {/* Town Status Table matching screenshot */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e1dcce',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee8dd', color: '#7a848e', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>TOWN</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>STATUS</th>
                  <th style={{ padding: '0.85rem 0.5rem', fontWeight: 700, textAlign: 'right' }}>OPEN</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700, textAlign: 'right' }}>VOLUNTEERS</th>
                </tr>
              </thead>
              <tbody>
                {zoneCoverages.map(zone => {
                  const isSelected = zone.town === selectedTownName;
                  return (
                    <tr
                      key={zone.town}
                      onClick={() => setSelectedTownName(zone.town)}
                      style={{
                        borderBottom: '1px solid #f4f0e6',
                        backgroundColor: isSelected ? '#fbf8f2' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#162330' }}>
                        {zone.town}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        {zone.status === 'Coverage gap' ? (
                          <span
                            style={{
                              backgroundColor: '#faebe7',
                              color: '#932a1e',
                              padding: '0.15rem 0.55rem',
                              borderRadius: '999px',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                            }}
                          >
                            Coverage gap
                          </span>
                        ) : (
                          <span style={{ color: '#56606a', fontWeight: 500 }}>
                            {zone.status}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right', fontWeight: 700, color: '#162330' }}>
                        {zone.openRequests}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 700, color: '#162330' }}>
                        {zone.volunteers}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
