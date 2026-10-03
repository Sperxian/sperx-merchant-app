export type Shop = {
  id: string;
  name: string;
  status: string;
  config: Record<string, unknown>;
  dateJoined: Date;
  dateCreated: Date;
}

export type ShopConfig = {
  iconLocation: string;
  theme?: ThemeColors;
}

export type ThemeColors = {
  primary?: string;
  primaryLightest?: string;
  primaryLighter?: string;
  primaryLight?: string;
  primaryDark?: string;
  primaryDarker?: string;
  primaryDarkest?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryLightest?: string;
  secondaryLighter?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  secondaryDarker?: string;
  secondaryDarkest?: string;
  secondaryForeground?: string;
};



export type LoyaltyProgram = {
  id: string;
  name: string;
  type: LoyaltyProgramType;
  config: StampBasedConfig;
  shopId: string;
  dateCreated: Date;
}

export type LoyaltyProgramType = 'STAMP_BASED';

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

export type LoyaltyTransactionSummary = {
  id: string;
  memberId: string;
  points: number;
  notes: string | null;
  loyaltyProgramName: string | null;
  rewardName: string | null;
  dateCreated: Date;
};

export type MemberSummary = {
  id: string;
  points: number;
  identityId: string | null;
  guestId: string | null;
  loyaltyProgramId: string;
  loyaltyProgramName: string;
  loyaltyProgramType: string;
  dateCreated: Date;
}

export type Paginated<T> = {
  page: number;
  size: number;
  total: number;
  items: T[];
}
