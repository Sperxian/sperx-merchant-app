export type LoyaltyProgram = {
  id: string;
  name: string;
  type: LoyaltyProgramType;
  config: StampBasedConfig;
  shopId: string;
  dateCreated: Date;
};

export type LoyaltyProgramInfo = LoyaltyProgram & {
  memberJoinLink: string;
};

export type LoyaltyProgramType = 'STAMP_BASED';

export type StampBasedConfig = {
  stampIcon: string;
  availableRewards: RewardMetadata[];
};

export type RewardMetadata = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
};
