import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AidRequest,
  VolunteerTeam,
  CommunityResource,
  SeverityOverrideLog,
  ZoneCoverage,
  SeverityLevel,
  RequestStatus,
} from '../types';

interface AidFlowContextType {
  requests: AidRequest[];
  teams: VolunteerTeam[];
  resources: CommunityResource[];
  overrideLogs: SeverityOverrideLog[];
  zoneCoverages: ZoneCoverage[];
  currentCoordinator: { name: string; initials: string; role: string };
  // Actions
  createRequest: (newReq: Omit<AidRequest, 'id' | 'submittedAt' | 'waitingMinutes' | 'status' | 'modelSeverity' | 'modelConfidence' | 'assignedSeverity' | 'vulnerabilityFlags'>) => string;
  updateRequestSeverity: (requestId: string, newSeverity: SeverityLevel, reason: string) => void;
  confirmModelSeverity: (requestId: string) => void;
  assignTeamToRequest: (requestId: string, teamId: string) => void;
  markAsDuplicate: (requestId: string, targetId: string) => void;
  removeVulnerabilityFlag: (requestId: string, flag: string) => void;
  registerResource: (resource: Omit<CommunityResource, 'id' | 'submittedAt' | 'status'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  getRequestById: (id: string) => AidRequest | undefined;
}

const AidFlowContext = createContext<AidFlowContextType | undefined>(undefined);

// Initial realistic seed data matching screenshots
const INITIAL_REQUESTS: AidRequest[] = [
  {
    id: 'Request-50',
    needType: 'Medical',
    peopleCount: 3,
    address: '214 S 9th St, Noblesville',
    town: 'Noblesville',
    phone: '(317) 555-0148',
    description: "Water came in fast overnight. My father (78) has chest pain and can't walk out through the flooded street. 214 S 9th St, Noblesville.",
    hasPhoto: true,
    photoUrl: '/sample-flood-house.svg',
    modelSeverity: 'S1',
    modelConfidence: 0.71,
    assignedSeverity: 'S1',
    status: 'Received',
    waitingMinutes: 12,
    submittedAt: '12 min ago',
    vulnerabilityFlags: ['Elderly', 'Medical'],
  },
  {
    id: 'Request-48',
    needType: 'Water Rescue',
    peopleCount: 4,
    address: 'East 116th St & Allisonville Rd',
    town: 'Fishers',
    phone: '(317) 555-0892',
    description: 'Family of four on roof, water still rising.',
    hasPhoto: true,
    photoUrl: '/sample-flood-roof.svg',
    modelSeverity: 'S3',
    modelConfidence: 0.62,
    assignedSeverity: 'S2',
    overrideReason: 'Caller confirms four people on the roof, including a child.',
    overrideBy: 'Serena Williams',
    status: 'Received',
    waitingMinutes: 18,
    submittedAt: '18 min ago',
    vulnerabilityFlags: ['Water Rescue'],
  },
  {
    id: 'Request-51',
    needType: 'Water Rescue',
    peopleCount: 4,
    address: 'Near 126th St',
    town: 'Fishers',
    phone: '(317) 555-0914',
    description: 'Saw people on a roof near 126th St, water rising fast.',
    hasPhoto: true,
    photoUrl: '/sample-flood-roof.svg',
    modelSeverity: 'S2',
    modelConfidence: 0.66,
    assignedSeverity: 'S2',
    isDuplicate: true,
    duplicateOf: 'Request-48',
    status: 'Received',
    waitingMinutes: 9,
    submittedAt: '9 min ago',
    vulnerabilityFlags: [],
  },
  {
    id: 'Request-52',
    needType: 'Food and Water',
    peopleCount: 1,
    address: 'Oak Ridge Rd',
    town: 'Westfield',
    phone: '(317) 555-0341',
    description: "Elderly neighbor out of drinking water and can't drive. Roads around her are closed.",
    hasPhoto: false,
    modelSeverity: 'Unscored',
    modelConfidence: 0.0,
    assignedSeverity: 'Unscored',
    status: 'Received',
    waitingMinutes: 3,
    submittedAt: '3 min ago',
    vulnerabilityFlags: ['Elderly'],
  },
  {
    id: 'Request-46',
    needType: 'Shelter',
    peopleCount: 2,
    address: 'Guilford Rd',
    town: 'Carmel',
    phone: '(317) 555-0774',
    description: 'Basement flooded. Two adults need a place to stay tonight.',
    hasPhoto: true,
    photoUrl: '/sample-flood-basement.svg',
    modelSeverity: 'S3',
    modelConfidence: 0.58,
    assignedSeverity: 'S3',
    unverified: true,
    status: 'Received',
    waitingMinutes: 26,
    submittedAt: '26 min ago',
    vulnerabilityFlags: [],
  },
  {
    id: 'Request-44',
    needType: 'Debris',
    peopleCount: 1,
    address: 'Main St & 4th Ave',
    town: 'Carmel',
    phone: '(317) 555-0129',
    description: 'Fallen tree blocking driveway, no injuries.',
    hasPhoto: false,
    modelSeverity: 'S4',
    modelConfidence: 0.85,
    assignedSeverity: 'S4',
    status: 'Received',
    waitingMinutes: 35,
    submittedAt: '35 min ago',
    vulnerabilityFlags: [],
  },
  // Additional untouched requests for Operations overview
  {
    id: 'Request-31',
    needType: 'Shelter',
    peopleCount: 3,
    address: 'Spring Mill Rd',
    town: 'Westfield',
    phone: '(317) 555-0455',
    description: 'First floor damp, need dry shelter for family before nightfall.',
    hasPhoto: false,
    modelSeverity: 'S3',
    modelConfidence: 0.60,
    assignedSeverity: 'S3',
    status: 'Received',
    waitingMinutes: 134,
    submittedAt: '2 h 14 min ago',
    vulnerabilityFlags: [],
  },
  {
    id: 'Request-29',
    needType: 'Debris',
    peopleCount: 1,
    address: '106th St',
    town: 'Carmel',
    phone: '(317) 555-0812',
    description: 'Storm debris pushed across culvert, slow drainage.',
    hasPhoto: false,
    modelSeverity: 'S4',
    modelConfidence: 0.74,
    assignedSeverity: 'S4',
    status: 'Received',
    waitingMinutes: 118,
    submittedAt: '1 h 58 min ago',
    vulnerabilityFlags: [],
  },
  {
    id: 'Request-33',
    needType: 'Food and Water',
    peopleCount: 2,
    address: 'Rangeline Rd',
    town: 'Carmel',
    phone: '(317) 555-0991',
    description: 'Power out, well pump not working, need clean bottled water.',
    hasPhoto: false,
    modelSeverity: 'Unscored',
    modelConfidence: 0.0,
    assignedSeverity: 'Unscored',
    status: 'Received',
    waitingMinutes: 100,
    submittedAt: '1 h 40 min ago',
    vulnerabilityFlags: [],
  },
  {
    id: 'Request-36',
    needType: 'Shelter',
    peopleCount: 4,
    address: '161st St',
    town: 'Westfield',
    phone: '(317) 555-0633',
    description: 'Crawlspace submerged, smelling gas, evacuated to porch.',
    hasPhoto: false,
    modelSeverity: 'S3',
    modelConfidence: 0.67,
    assignedSeverity: 'S3',
    status: 'Received',
    waitingMinutes: 82,
    submittedAt: '1 h 22 min ago',
    vulnerabilityFlags: [],
  },
];

const INITIAL_TEAMS: VolunteerTeam[] = [
  {
    id: 'team-wr',
    name: 'White River',
    freeMembers: 4,
    distanceMiles: 6,
    status: 'available',
    initials: 'WR',
  },
  {
    id: 'team-ml',
    name: 'Morse Lake',
    freeMembers: 2,
    distanceMiles: 9,
    status: 'available',
    initials: 'ML',
  },
  {
    id: 'team-cc',
    name: 'Cool Creek',
    freeMembers: 0,
    distanceMiles: 12,
    status: 'booked',
    initials: 'CC',
    activeTaskId: 'Request-41',
  },
];

const INITIAL_OVERRIDE_LOGS: SeverityOverrideLog[] = [
  {
    id: 'ov-1',
    who: 'Serena Williams',
    initials: 'SW',
    when: '10 m ago',
    requestId: 'Request-48',
    from: 'S3',
    to: 'S2',
    reason: 'Caller confirms four people on the roof, including a child.',
  },
  {
    id: 'ov-2',
    who: 'Dana Kim',
    initials: 'DK',
    when: '34 m ago',
    requestId: 'Request-42',
    from: 'S2',
    to: 'S3',
    reason: 'Called back: injury is minor, family moved upstairs.',
  },
  {
    id: 'ov-3',
    who: 'Serena Williams',
    initials: 'SW',
    when: '52 min ago',
    requestId: 'Request-37',
    from: 'S2',
    to: 'S4',
    reason: 'Photo shows old damage, not from this flood.',
  },
  {
    id: 'ov-4',
    who: 'Dana Kim',
    initials: 'DK',
    when: '1 h 5 min ago',
    requestId: 'Request-35',
    from: 'Unscored',
    to: 'S3',
    reason: 'No photo. Rated from description: shelter for three.',
  },
];

const INITIAL_ZONES: ZoneCoverage[] = [
  { town: 'Fishers', status: 'Coverage gap', openRequests: 6, volunteers: 0, notes: 'Fishers, 116th St to 131st St · 6 open requests · 0 volunteers. Includes Request-48 (S2 High, Water Rescue).' },
  { town: 'Carmel', status: 'Being worked', openRequests: 14, volunteers: 9 },
  { town: 'Westfield', status: 'Being worked', openRequests: 13, volunteers: 8 },
  { town: 'Noblesville', status: 'Being worked', openRequests: 9, volunteers: 12 },
  { town: 'Cicero', status: 'Silent', openRequests: 0, volunteers: 0 },
  { town: 'Sheridan', status: 'Silent', openRequests: 0, volunteers: 0 },
  { town: 'Arcadia', status: 'Silent', openRequests: 0, volunteers: 0 },
];

const INITIAL_RESOURCES: CommunityResource[] = [
  {
    id: 'res-1',
    organizationName: 'Grace Community Church Shelter',
    type: 'Shelter',
    capacity: 60,
    streetAddress: '5504 E 146th St, Noblesville, IN 46062',
    amenities: ['Overnight beds', 'Hot meals', 'Drinking water', 'Pets allowed'],
    isOpen24Hours: true,
    contactName: 'Pastor David Clark',
    phone: '(317) 555-8821',
    email: 'info@gracecommunity.example',
    status: 'Approved',
    submittedAt: 'Today, 8:00 AM',
  },
  {
    id: 'res-2',
    organizationName: 'Hamilton County Fairgrounds Exhibition Hall',
    type: 'Emergency Hub',
    capacity: 150,
    streetAddress: '2003 Pleasant St, Noblesville, IN 46060',
    amenities: ['Overnight beds', 'Hot meals', 'Drinking water', 'Showers', 'Phone charging', 'Medical care'],
    isOpen24Hours: true,
    contactName: 'County Emergency Management',
    phone: '(317) 555-9000',
    status: 'Approved',
    submittedAt: 'Today, 6:30 AM',
  },
];

export const AidFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<AidRequest[]>(() => {
    const saved = localStorage.getItem('aidflow_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [teams, setTeams] = useState<VolunteerTeam[]>(() => {
    const saved = localStorage.getItem('aidflow_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [resources, setResources] = useState<CommunityResource[]>(() => {
    const saved = localStorage.getItem('aidflow_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [overrideLogs, setOverrideLogs] = useState<SeverityOverrideLog[]>(() => {
    const saved = localStorage.getItem('aidflow_overrides');
    return saved ? JSON.parse(saved) : INITIAL_OVERRIDE_LOGS;
  });

  const [zoneCoverages, setZoneCoverages] = useState<ZoneCoverage[]>(INITIAL_ZONES);

  const currentCoordinator = {
    name: 'Serena Williams',
    initials: 'SW',
    role: 'Coordinator',
  };

  useEffect(() => {
    localStorage.setItem('aidflow_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('aidflow_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('aidflow_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('aidflow_overrides', JSON.stringify(overrideLogs));
  }, [overrideLogs]);

  // Citizen creates request
  const createRequest = (newReq: Omit<AidRequest, 'id' | 'submittedAt' | 'waitingMinutes' | 'status' | 'modelSeverity' | 'modelConfidence' | 'assignedSeverity' | 'vulnerabilityFlags'>): string => {
    const nextNum = requests.length + 50;
    const newId = `Request-${nextNum}`;

    // Simple realistic heuristics for the simulated AI triage model
    let modelPick: SeverityLevel = 'S3';
    let conf = 0.68;
    const flags: string[] = [];

    const text = (newReq.description + ' ' + newReq.needType).toLowerCase();
    if (text.includes('chest pain') || text.includes('trapped') || text.includes('water rescue') || text.includes('roof')) {
      modelPick = 'S1';
      conf = 0.74;
    } else if (text.includes('flooded') || text.includes('rising') || text.includes('medical')) {
      modelPick = 'S2';
      conf = 0.71;
    } else if (text.includes('debris') || text.includes('tree') || text.includes('driveway')) {
      modelPick = 'S4';
      conf = 0.82;
    }

    if (!newReq.hasPhoto) {
      modelPick = 'Unscored';
      conf = 0.0;
    }

    if (text.includes('elderly') || text.includes('father (78)') || text.includes('grandparent') || text.includes('78')) {
      flags.push('Elderly');
    }
    if (text.includes('medical') || text.includes('chest pain') || text.includes('injured')) {
      flags.push('Medical');
    }

    const created: AidRequest = {
      ...newReq,
      id: newId,
      submittedAt: 'Just now',
      waitingMinutes: 1,
      status: 'Received',
      modelSeverity: modelPick,
      modelConfidence: conf,
      assignedSeverity: modelPick,
      vulnerabilityFlags: flags,
      photoUrl: newReq.hasPhoto ? '/sample-flood-house.svg' : undefined,
    };

    setRequests(prev => [created, ...prev]);
    return newId;
  };

  // Human coordinator overrides model severity rating
  const updateRequestSeverity = (requestId: string, newSeverity: SeverityLevel, reason: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const oldSeverity = r.assignedSeverity;
          // Log the override
          const newLog: SeverityOverrideLog = {
            id: 'ov-' + Date.now(),
            who: currentCoordinator.name,
            initials: currentCoordinator.initials,
            when: 'Just now',
            requestId: r.id,
            from: oldSeverity,
            to: newSeverity,
            reason: reason,
          };
          setOverrideLogs(logs => [newLog, ...logs]);

          return {
            ...r,
            assignedSeverity: newSeverity,
            overrideReason: reason,
            overrideBy: currentCoordinator.name,
          };
        }
        return r;
      })
    );
  };

  // Human coordinator confirms model suggestion
  const confirmModelSeverity = (requestId: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, assignedSeverity: r.modelSeverity } : r))
    );
  };

  // Human coordinator assigns team
  const assignTeamToRequest = (requestId: string, teamId: string) => {
    const selectedTeam = teams.find(t => t.id === teamId);
    if (!selectedTeam) return;

    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Assigned',
            assignedTeamId: teamId,
            assignedTeamName: selectedTeam.name,
          };
        }
        return r;
      })
    );

    // Update team availability
    setTeams(prev =>
      prev.map(t => {
        if (t.id === teamId) {
          return {
            ...t,
            freeMembers: Math.max(0, t.freeMembers - 1),
            status: t.freeMembers <= 1 ? 'booked' : 'available',
            activeTaskId: requestId,
          };
        }
        return t;
      })
    );
  };

  const markAsDuplicate = (requestId: string, targetId: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, isDuplicate: true, duplicateOf: targetId } : r))
    );
  };

  const removeVulnerabilityFlag = (requestId: string, flag: string) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? { ...r, vulnerabilityFlags: r.vulnerabilityFlags.filter(f => f !== flag) }
          : r
      )
    );
  };

  const registerResource = (resourceData: Omit<CommunityResource, 'id' | 'submittedAt' | 'status'>) => {
    const newEntry: CommunityResource = {
      ...resourceData,
      id: 'res-' + (resources.length + 1),
      status: 'Pending',
      submittedAt: 'Just now',
    };
    setResources(prev => [newEntry, ...prev]);
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests(prev => prev.map(r => (r.id === requestId ? { ...r, status } : r)));
  };

  const getRequestById = (id: string) => {
    return requests.find(r => r.id === id);
  };

  return (
    <AidFlowContext.Provider
      value={{
        requests,
        teams,
        resources,
        overrideLogs,
        zoneCoverages,
        currentCoordinator,
        createRequest,
        updateRequestSeverity,
        confirmModelSeverity,
        assignTeamToRequest,
        markAsDuplicate,
        removeVulnerabilityFlag,
        registerResource,
        updateRequestStatus,
        getRequestById,
      }}
    >
      {children}
    </AidFlowContext.Provider>
  );
};

export const useAidFlow = () => {
  const context = useContext(AidFlowContext);
  if (!context) {
    throw new Error('useAidFlow must be used within an AidFlowProvider');
  }
  return context;
};
