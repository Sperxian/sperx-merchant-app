export type MemberLoyalty = {
  id: string;
  name?: string;
  points: number;
  dateCreated: Date;
};

export type LoyaltyReward = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
};
