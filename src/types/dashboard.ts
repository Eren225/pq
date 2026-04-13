export type RoommateId = 'elie' | 'erwan' | 'matteo' | 'mathis';

export type Roommate = {
  id: RoommateId;
  name: string;
  opened: number;
  lastActive: string;
  avatar: string;
};

export type DashboardAuthState = {
  currentUserId: RoommateId | '';
  availableUsers: Array<{
    id: RoommateId;
    label: string;
  }>;
};

export type DashboardState = {
  totalRolls: number;
  rollsLeft: number;
  usedTotal: number;
  percentLeft: number;
  activeUsers: number;
  lastBuyer: string;
  nextBuyer: string;
  auth: DashboardAuthState;
  roommates: Roommate[];
};