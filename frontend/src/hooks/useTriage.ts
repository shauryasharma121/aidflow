import { useMemo, useState } from 'react';
import { useAidFlow } from '../context/AidFlowContext';
import { SeverityLevel, AidRequest } from '../types';

export type SortMode = 'Severity' | 'New' | 'Unassigned';

interface UseTriageOptions {
  initialSort?: SortMode;
  initialTown?: string;
  initialNeed?: string;
}

/**
 * Custom hook to manage the disaster triage sorting queue.
 * Handles severity-weighted ordering, town filters, and search queries.
 */
export function useTriage(options: UseTriageOptions = {}) {
  const { requests } = useAidFlow();

  const [sortMode, setSortMode] = useState<SortMode>(options.initialSort || 'Severity');
  const [selectedTown, setSelectedTown] = useState<string>(options.initialTown || 'All');
  const [selectedNeed, setSelectedNeed] = useState<string>(options.initialNeed || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // S1 Critical > S2 High > Unscored (sorts with S2 per protocol) > S3 Moderate > S4 Low
  const severityRank: Record<SeverityLevel, number> = {
    S1: 5,
    S2: 4,
    Unscored: 3.5,
    S3: 2,
    S4: 1,
  };

  const filteredRequests = useMemo(() => {
    return requests
      .filter((req: AidRequest) => {
        // Exclude closed/resolved cases from the active triage queue
        if (req.status === 'Resolved') return false;

        if (selectedTown !== 'All' && req.town !== selectedTown) {
          return false;
        }

        if (selectedNeed !== 'All' && req.needType !== selectedNeed) {
          return false;
        }

        if (sortMode === 'Unassigned' && req.status !== 'Received') {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchId = req.id.toLowerCase().includes(q);
          const matchAddr = req.address.toLowerCase().includes(q);
          const matchDesc = req.description.toLowerCase().includes(q);
          if (!matchId && !matchAddr && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortMode === 'New') {
          return a.waitingMinutes - b.waitingMinutes;
        }
        // Primary sort: severity rank descending
        const diff = (severityRank[b.assignedSeverity] || 0) - (severityRank[a.assignedSeverity] || 0);
        if (diff !== 0) return diff;
        // Secondary sort: longest waiting first
        return b.waitingMinutes - a.waitingMinutes;
      });
  }, [requests, sortMode, selectedTown, selectedNeed, searchQuery]);

  // Summary counts for quick coordinator triage overview
  const stats = useMemo(() => {
    return {
      totalOpen: requests.filter(r => r.status === 'Received').length,
      criticalCount: requests.filter(r => r.assignedSeverity === 'S1' && r.status === 'Received').length,
      unscoredCount: requests.filter(r => r.assignedSeverity === 'Unscored').length,
    };
  }, [requests]);

  return {
    requests: filteredRequests,
    totalCount: filteredRequests.length,
    sortMode,
    setSortMode,
    selectedTown,
    setSelectedTown,
    selectedNeed,
    setSelectedNeed,
    searchQuery,
    setSearchQuery,
    stats,
  };
}
