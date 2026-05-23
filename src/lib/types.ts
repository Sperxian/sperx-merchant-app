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
