import { LoyaltyProgram, Shop } from "../lib/types";

export type MemberLoyaltyDto = {
  id: string;
  points: number;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgram: LoyaltyProgram;
  shop: Shop;
  dateCreated: Date;
};

export type MemberPointTransaction = {
  id?: number;
  memberId: string;
  points: number;
  notes?: string;
  dateCreated: Date;
};
