import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { SeverityBadge } from '../../components/SeverityBadge';
import { SeverityLevel, NeedType } from '../../types';
import {
  Search,
  Check,
  CameraOff,
  Image as ImageIcon,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

export const SortingQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const { requests } = useAidFlow();

  const [activeSort, setActiveSort] = useState<'Severity' | 'New' | 'Unassigned'>('Severity');
  const [selectedTown, setSelectedTown] = useState<string>('All');
  const [selectedNeed, setSelectedNeed] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [forceEmptyState, setForceEmptyState] = useState<boolean>(false);

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    if (forceEmptyState) return [];

    return requests.filter(req => {
      // Must not be already resolved
      if (req.status === 'Resolved') return false;

      // Filter by town
      if (selectedTown !== 'All' && req.town !== selectedTown) return false;

      // Filter by need type
      if (selectedNeed !== 'All' && req.needType !== selectedNeed) return false;

      // Filter by unassigned sort
      if (activeSort === 'Unassigned' && req.status !== 'Received') return false;

      // Search address or ID
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = req.id.toLowerCase().includes(query);
        const matchesAddress = req.address.toLowerCase().includes(query);
        const matchesDesc = req.description.toLowerCase().includes(query);
        if (!matchesId && !matchesAddress && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (activeSort === 'New') {
        return a.waitingMinutes - b.waitingMinutes;
      }
      // Sort by severity (S1 > S2 > Unscored > S3 > S4)
      const severityRank: Record<SeverityLevel, number> = {
        S1: 5,
        S2: 4,
        Unscored: 3.5, // Unscored sorts with S2 until rated as noted in UI
        S3: 2,
        S4: 1,
      };
      const rankDiff = (severityRank[b.assignedSeverity] || 0) - (severityRank[a.assignedSeverity] || 0);
      if (rankDiff !== 0) return rankDiff;
      return b.waitingMinutes - a.waitingMinutes;
    });
  }, [requests, activeSort, selectedTown, selectedNeed, searchQuery, forceEmptyState]);

  const towns = ['All', 'Noblesville', 'Fishers', 'Carmel', 'Westfield', 'Cicero'];
  const needs: string[] = ['All', 'Medical', 'Water Rescue', 'Shelter', 'Food and Water', 'Debris', 'Other'];

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.6rem', lineHeight: 1.05, marginBottom: '0.25rem' }}>
            All Requests · {forceEmptyState ? 0 : filteredRequests.length} open
          </h1>
          <p style={{ color: '#56606a', fontSize: '0.92rem' }}>
            Sorted by severity, then time waiting. Unscored requests sort with S2 until you rate them.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setForceEmptyState(!forceEmptyState)}
            style={{
              fontSize: '0.75rem',
              color: '#656f7a',
              textDecoration: 'underline',
              padding: '0.2rem',
            }}
          >
            {forceEmptyState ? 'Restore Queue Data' : 'Preview Empty State'}
          </button>
          <span style={{ fontSize: '0.8rem', color: '#7e8790' }}>
            Updated just now
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Sort pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444d56', marginRight: '0.25rem' }}>
              Sort:
            </span>
            {(['Severity', 'New', 'Unassigned'] as const).map(sortOption => (
              <button
                key={sortOption}
                onClick={() => setActiveSort(sortOption)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  backgroundColor: activeSort === sortOption ? '#15212d' : '#ffffff',
                  color: activeSort === sortOption ? '#ffffff' : '#273442',
                  border: activeSort === sortOption ? 'none' : '1px solid #d5cec1',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {sortOption}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '22px', backgroundColor: '#d5cec1' }} />

          {/* Area dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedTown}
              onChange={e => setSelectedTown(e.target.value)}
              style={{
                appearance: 'none',
                padding: '0.35rem 2rem 0.35rem 0.85rem',
                borderRadius: '999px',
                border: '1px solid #d5cec1',
                backgroundColor: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#273442',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {towns.map(t => (
                <option key={t} value={t}>
                  Area: {t === 'All' ? 'All towns' : t}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#68737d' }} />
          </div>

          {/* Need type dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedNeed}
              onChange={e => setSelectedNeed(e.target.value)}
              style={{
                appearance: 'none',
                padding: '0.35rem 2rem 0.35rem 0.85rem',
                borderRadius: '999px',
                border: '1px solid #d5cec1',
                backgroundColor: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#273442',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {needs.map(n => (
                <option key={n} value={n}>
                  Need type: {n}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#68737d' }} />
          </div>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#7a848e' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search address or ID"
            style={{
              width: '100%',
              padding: '0.45rem 1rem 0.45rem 2.25rem',
              borderRadius: '8px',
              border: '1px solid #d5cec1',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Empty State View matching screenshot 7 */}
      {filteredRequests.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e1dcce',
            padding: '5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ece8de',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <Check size={32} strokeWidth={2.5} color="#15212d" />
          </div>

          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.5rem' }}>
            No open requests
          </h2>

          <p style={{ color: '#56606a', fontSize: '0.95rem', maxWidth: '440px', lineHeight: 1.45, marginBottom: '2rem' }}>
            Every request has been assigned or resolved. New requests show up here on their own as soon as they come in.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => navigate('/coordinator/operations')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: '1.5px solid #15212d',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: '#15212d',
              }}
            >
              See operations overview
            </button>
            <button
              onClick={() => navigate('/coordinator/map')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: '1.5px solid #15212d',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: '#15212d',
              }}
            >
              Check coverage map
            </button>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#7a848e' }}>
            Filters on? Clear them to make sure nothing is hidden.
          </span>
        </div>
      ) : (
        /* Requests Queue Cards List matching screenshot 4 */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredRequests.map(req => {
            const hasModelOverride = req.overrideReason;
            const sublabel = req.assignedSeverity === 'Unscored'
              ? 'Needs your rating'
              : hasModelOverride
              ? `${req.overrideBy === 'Serena Williams' ? 'SW' : 'Coord'} override from ${req.modelSeverity}`
              : `Model ${req.modelConfidence.toFixed(2)}`;

            return (
              <div
                key={req.id}
                onClick={() => navigate(`/coordinator/review/${req.id}`)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e1dcce',
                  padding: '1.15rem 1.35rem',
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr 140px',
                  gap: '1.25rem',
                  alignItems: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'transform 0.1s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                }}
              >
                {/* Left: Severity badge */}
                <div>
                  <SeverityBadge
                    level={req.assignedSeverity}
                    sublabel={sublabel}
                  />
                </div>

                {/* Middle: Request details and description */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#16212c' }}>
                      {req.id}
                    </span>
                    <span style={{ color: '#7a848e', fontSize: '0.85rem' }}>·</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#4f5761' }}>
                      {req.town}
                    </span>

                    {/* Vulnerability badges */}
                    {req.vulnerabilityFlags.length > 0 && (
                      <span
                        style={{
                          backgroundColor: '#16212c',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '999px',
                        }}
                      >
                        {req.vulnerabilityFlags.join(' · ')}
                      </span>
                    )}

                    {/* Duplicate tag */}
                    {req.isDuplicate && (
                      <span
                        style={{
                          backgroundColor: '#faebe7',
                          color: '#932a1e',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '999px',
                        }}
                      >
                        Possible duplicate of {req.duplicateOf || 'earlier request'}
                      </span>
                    )}

                    {/* Unverified tag */}
                    {req.unverified && (
                      <span
                        style={{
                          backgroundColor: '#faebe7',
                          color: '#932a1e',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <AlertTriangle size={12} />
                        Unverified
                      </span>
                    )}
                  </div>

                  {/* Summary text */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#343e48',
                      lineHeight: 1.35,
                      marginBottom: '0.65rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {req.description}
                  </p>

                  {/* Metadata Chips Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: '#f1eee6',
                        color: '#464f58',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      {req.hasPhoto ? <ImageIcon size={12} /> : <CameraOff size={12} />}
                      {req.hasPhoto ? 'Photo' : 'No Photo'}
                    </span>

                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: '#f1eee6',
                        color: '#464f58',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      {req.needType}
                    </span>

                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: '#f1eee6',
                        color: '#464f58',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      {req.peopleCount} {req.peopleCount === 1 ? 'person' : 'people'}
                    </span>

                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: '#f1eee6',
                        color: '#464f58',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      Waiting {req.waitingMinutes} min
                    </span>
                  </div>
                </div>

                {/* Right: Graphic thumbnail */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {req.hasPhoto ? (
                    <div
                      style={{
                        width: '105px',
                        height: '68px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #dcd6c8',
                        backgroundColor: '#9aa8b2',
                      }}
                    >
                      <img
                        src={req.photoUrl || '/sample-flood-house.svg'}
                        alt="Flood photo thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '105px',
                        height: '68px',
                        borderRadius: '8px',
                        border: '1.5px dashed #cfc8ba',
                        backgroundColor: '#faf8f4',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        color: '#8b95a0',
                      }}
                    >
                      <CameraOff size={18} />
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>No photo</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
