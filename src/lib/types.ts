export type Shop = {
  id: string;
  name: string;
  status: string;
  config: Record<string, unknown>;
  dateJoined: Date;
  dateCreated: Date;
}

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
