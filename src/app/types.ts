export type NumberStatus = "available" | "held" | "sold";

export interface NumberData {
  number: number;
  status: NumberStatus;
  displayName?: string;
  message?: string;

}

export interface SupporterEntry {
  number: number;
  displayName: string;
  message: string;
  timestamp: Date;
}