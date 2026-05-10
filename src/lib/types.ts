export type Shop = {
  id: string;
  name: string;
  status: string;
  config: Record<string, unknown>;
  dateJoined: Date;
  dateCreated: Date;
}

export type LoyaltyProgram = {
  id: string;
  name: string;
  type: string;
  config: StampBasedConfig;
  shopId: string;
  dateCreated: Date;
}

export type StampBasedConfig = {
  stampIcon: string;
  availableRewards: RewardMetadata[];
}

export type RewardMetadata = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
}

export type MemberLoyalty = {
  id: string;
  name?: string;
  points: number;
  dateCreated: Date;
};
