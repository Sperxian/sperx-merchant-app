export type LoyaltyProgram = {
  id: string;
  name: string;
  shopId: string;
  dateCreated: Date;
  type: LoyaltyProgramType;
  config: LoyaltyProgramConfig;
};


export type LoyaltyProgramInfo = LoyaltyProgram & {
  memberJoinLink: string;
};

export type LoyaltyProgramType = "STAMP_BASED" | "WALLET_BASED";

export type LoyaltyProgramConfig = StampBasedConfig | WalletBasedConfig;

export type StampBasedConfig = {
  stampIcon: string;
  availableRewards: RewardMetadata[];
};

export type WalletBasedConfig = {
  convertibleAmountCents: number;
  pointsAwarded: number;
  availableRewards: RewardMetadata[];
};

export type RewardMetadata = {
  code: string;
  name: string;
  description?: string;
  goalPoints: number;
};
