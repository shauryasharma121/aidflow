import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTriage } from '../../hooks/useTriage';
import { SeverityBadge } from '../../components/SeverityBadge';
import {
  Search,
  Check,
  CameraOff,
  Image as ImageIcon,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import '../../styles/common.css';
import '../../styles/SortingQueue.css';

/**
 * SortingQueuePage
 * 
 * Main triage intake queue for volunteer coordinators.
 * Requests arrive from citizen phones and are initially rated by the damage model.
 * Note: Unscored requests (no photo attached) temporarily sort alongside S2
 * until human coordinators perform manual assessment.
 */
export const SortingQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const [forceEmptyState, setForceEmptyState] = useState(false);

  // Custom hook encapsulating disaster priority sorting & query filters
  const {
    requests,
    sortMode,
    setSortMode,
    selectedTown,
    setSelectedTown,
    selectedNeed,
    setSelectedNeed,
    searchQuery,
    setSearchQuery,
  } = useTriage();

  const visibleRequests = forceEmptyState ? [] : requests;

  const towns = ['All', 'Noblesville', 'Fishers', 'Carmel', 'Westfield', 'Cicero'];
  const needs = ['All', 'Medical', 'Water Rescue', 'Shelter', 'Food and Water', 'Debris', 'Other'];

  return (
    <div className="page-container">
      {/* Incident Header */}
      <div className="queue-header-row">
        <div>
          <h1 className="title-main">
            All Requests · {visibleRequests.length} open
          </h1>
          <p className="title-sub">
            Sorted by severity, then time waiting. Unscored requests sort with S2 until you rate them.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Quick debug toggle for empty state presentation */}
          <button
            onClick={() => setForceEmptyState(!forceEmptyState)}
            style={{ fontSize: '0.75rem', color: '#656f7a', textDecoration: 'underline' }}
          >
            {forceEmptyState ? 'Restore Queue' : 'Preview Empty State'}
          </button>
          <span style={{ fontSize: '0.8rem', color: '#7e8790' }}>Updated just now</span>
        </div>
      </div>

      {/* Triage Filtering Bar */}
      <div className="queue-controls-bar">
        <div className="queue-filters-group">
          {/* Sort selection */}
          <div className="sort-pill-container">
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444d56', marginRight: '0.25rem' }}>
              Sort:
            </span>
            {(['Severity', 'New', 'Unassigned'] as const).map(option => (
              <button
                key={option}
                onClick={() => setSortMode(option)}
                className={`sort-pill-btn ${sortMode === option ? 'active' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '22px', backgroundColor: '#d5cec1' }} />

          {/* District selector */}
          <div className="filter-select-wrapper">
            <select
              value={selectedTown}
              onChange={e => setSelectedTown(e.target.value)}
              className="filter-select"
            >
              {towns.map(t => (
                <option key={t} value={t}>
                  Area: {t === 'All' ? 'All towns' : t}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#68737d' }} />
          </div>

          {/* Need category selector */}
          <div className="filter-select-wrapper">
            <select
              value={selectedNeed}
              onChange={e => setSelectedNeed(e.target.value)}
              className="filter-select"
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
        <div className="search-input-wrapper">
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#7a848e' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search address or ID"
            className="search-input-field"
          />
        </div>
      </div>

      {/* Main Request Stream */}
      {visibleRequests.length === 0 ? (
        <div className="empty-queue-container">
          <div className="empty-icon-circle">
            <Check size={32} strokeWidth={2.5} color="#15212d" />
          </div>

          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.5rem' }}>No open requests</h2>
          <p style={{ color: '#56606a', fontSize: '0.95rem', maxWidth: '440px', lineHeight: 1.45, marginBottom: '2rem' }}>
            Every request has been assigned or resolved. New requests show up here on their own as soon as they come in.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('/coordinator/operations')} className="btn-secondary">
              See operations overview
            </button>
            <button onClick={() => navigate('/coordinator/map')} className="btn-secondary">
              Check coverage map
            </button>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#7a848e' }}>
            Filters on? Clear them to make sure nothing is hidden.
          </span>
        </div>
      ) : (
        <div className="requests-list">
          {visibleRequests.map(req => {
            // Coordinator override badge annotation
            const hasModelOverride = !!req.overrideReason;
            const sublabel = req.assignedSeverity === 'Unscored'
              ? 'Needs your rating'
              : hasModelOverride
              ? `${req.overrideBy === 'Serena Williams' ? 'SW' : 'Coord'} override from ${req.modelSeverity}`
              : `Model ${req.modelConfidence.toFixed(2)}`;

            return (
              <div
                key={req.id}
                onClick={() => navigate(`/coordinator/review/${req.id}`)}
                className="triage-card"
              >
                {/* Severity Badge */}
                <div>
                  <SeverityBadge level={req.assignedSeverity} sublabel={sublabel} />
                </div>

                {/* Narrative Details */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span className="triage-card-title">{req.id}</span>
                    <span style={{ color: '#7a848e' }}>·</span>
                    <span className="triage-card-town">{req.town}</span>

                    {/* Auto-extracted vulnerability markers */}
                    {req.vulnerabilityFlags.length > 0 && (
                      <span className="badge-pill badge-dark">
                        {req.vulnerabilityFlags.join(' · ')}
                      </span>
                    )}

                    {/* Proximity / duplicate warning */}
                    {req.isDuplicate && (
                      <span className="badge-pill badge-danger">
                        Possible duplicate of {req.duplicateOf || 'earlier request'}
                      </span>
                    )}

                    {req.unverified && (
                      <span className="badge-pill badge-danger">
                        <AlertTriangle size={12} /> Unverified
                      </span>
                    )}
                  </div>

                  <p className="triage-card-snippet">{req.description}</p>

                  {/* Metadata Chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span className="badge-pill badge-neutral">
                      {req.hasPhoto ? <ImageIcon size={12} /> : <CameraOff size={12} />}
                      {req.hasPhoto ? 'Photo' : 'No Photo'}
                    </span>
                    <span className="badge-pill badge-neutral">{req.needType}</span>
                    <span className="badge-pill badge-neutral">
                      {req.peopleCount} {req.peopleCount === 1 ? 'person' : 'people'}
                    </span>
                    <span className="badge-pill badge-neutral">Waiting {req.waitingMinutes} min</span>
                  </div>
                </div>

                {/* Right Photo Thumbnail */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {req.hasPhoto ? (
                    <div className="triage-thumbnail-box">
                      <img
                        src={req.photoUrl || '/sample-flood-house.svg'}
                        alt="Thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className="triage-no-photo-box">
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
