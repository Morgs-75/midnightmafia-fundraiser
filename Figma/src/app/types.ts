export type NumberStatus = "available" | "held" | "sold";

export interface NumberData {
  number: number;
  status: NumberStatus;
  displayName?: string;
  message?: string;
  isTeamNumber?: boolean; // Team's free numbers for the chance to win
}

export interface SupporterEntry {
  number: number;
  displayName: string;
  message: string;
  timestamp: Date;
}