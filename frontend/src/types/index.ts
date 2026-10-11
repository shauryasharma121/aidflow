export type SeverityLevel = 'S1' | 'S2' | 'S3' | 'S4' | 'Unscored';

export type NeedType = 
  | 'Medical' 
  | 'Water Rescue' 
  | 'Shelter' 
  | 'Food and Water' 
  | 'Debris' 
  | 'Other';

export type RequestStatus = 'Received' | 'Assigned' | 'In Progress' | 'Resolved';

export interface AidRequest {
  id: string;
  needType: NeedType;
  peopleCount: number;
  address: string;
  town: string;
  phone: string;
  description: string;
  hasPhoto: boolean;
  photoUrl?: string;
  photoWarning?: string;
  modelSeverity: SeverityLevel;
  modelConfidence: number; // 0.0 - 1.0
  assignedSeverity: SeverityLevel;
  overrideReason?: string;
  overrideBy?: string;
  status: RequestStatus;
  waitingMinutes: number;
  submittedAt: string;
  assignedTeamId?: string;
  assignedTeamName?: string;
  isDuplicate?: boolean;
  duplicateOf?: string;
  vulnerabilityFlags: string[];
  unverified?: boolean;
  notes?: string;
}

export interface VolunteerTeam {
  id: string;
  name: string;
  freeMembers: number;
  distanceMiles: number;
  status: 'available' | 'booked';
  initials: string;
  activeTaskId?: string;
}

export interface CommunityResource {
  id: string;
  organizationName: string;
  type: string;
  capacity: number;
  streetAddress: string;
  amenities: string[];
  isOpen24Hours: boolean;
  opensTime?: string;
  closesTime?: string;
  contactName: string;
  phone: string;
  email?: string;
  status: 'Pending' | 'Approved';
  submittedAt: string;
}

export interface SeverityOverrideLog {
  id: string;
  who: string;
  initials: string;
  when: string;
  requestId: string;
  from: SeverityLevel;
  to: SeverityLevel;
  reason: string;
}

export interface ZoneCoverage {
  town: string;
  status: 'Being worked' | 'Silent' | 'Coverage gap';
  openRequests: number;
  volunteers: number;
  notes?: string;
}
