import type { LoyaltyProgram } from "./loyalty";

export type MemberSummary = {
  id: string;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgram: LoyaltyProgram;
  netPoints: number;
  walletBalance: number | null;
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
  walletBalance?: number | null;
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

export type MemberLoyaltyHistoryItem = {
  walletTransactionId: number | null;
  pointTransactionId: number | null;
  transactionDate: Date;
  type: 'ACCUMULATION' | 'WALLET_TOP_UP' | 'WALLET_SPEND' | 'REDEMPTION'
  points: number | null;
  balance: number | null;
  notes?: string;
}
