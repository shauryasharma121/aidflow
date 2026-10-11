import { useState, useMemo } from 'react';
import { useAidFlow } from '../context/AidFlowContext';
import { VolunteerTeam, AidRequest } from '../types';

export type TeamFilterMode = 'available' | 'nearest';

/**
 * Custom hook for coordinating field teams and dispatch operations.
 */
export function useDispatch(targetRequest?: AidRequest) {
  const { teams, assignTeamToRequest } = useAidFlow();
  const [filterMode, setFilterMode] = useState<TeamFilterMode>('available');

  const processedTeams = useMemo(() => {
    let result = [...teams];

    if (filterMode === 'available') {
      result = result.sort((a, b) => {
        if (a.status === 'available' && b.status === 'booked') return -1;
        if (a.status === 'booked' && b.status === 'available') return 1;
        return a.distanceMiles - b.distanceMiles;
      });
    } else {
      // Nearest first regardless of status
      result = result.sort((a, b) => a.distanceMiles - b.distanceMiles);
    }

    return result;
  }, [teams, filterMode]);

  const nearestAvailableTeam = useMemo(() => {
    return teams.find(t => t.status === 'available');
  }, [teams]);

  const dispatchTeam = (teamId: string) => {
    if (!targetRequest) return;
    assignTeamToRequest(targetRequest.id, teamId);
  };

  return {
    teams: processedTeams,
    nearestAvailableTeam,
    filterMode,
    setFilterMode,
    dispatchTeam,
    totalAvailable: teams.filter(t => t.status === 'available').length,
  };
}
