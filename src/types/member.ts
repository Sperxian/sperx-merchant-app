import { Shop } from "../lib/types";
import type { LoyaltyProgram } from "./loyalty";

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
