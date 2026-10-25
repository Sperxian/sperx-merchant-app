import type { LoyaltyProgram } from "./loyalty";

export type MemberSummary = {
  id: string;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgram: LoyaltyProgram;
  netPoints: number;
  totalAccumulatedPoints: number;
  totalRedeemedPoints: number;
  totalRedeemedRewards: number;
  dateCreated: Date;
};

export type MemberLoyaltyDto = {
  id: string;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgram: LoyaltyProgram;
  points: number;
  dateCreated: Date;
};

export type MemberLoyaltySummary = {
  id: string;
  points: number;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgramId: string;
  loyaltyProgramName: string;
  loyaltyProgramType: string;
  dateCreated: Date;
}

export type MemberPointTransaction = {
  id?: number;
  memberId: string;
  points: number;
  notes?: string;
  dateCreated: Date;
};
