import { LoyaltyProgramType, Shop } from "../types";
import apiClient from "./client";

export async function getShop(shopId: string) {
  const { data } = await apiClient.get(`/shop/${shopId}`);

  return data;
}

export async function setupShop(setupParams: ShopSetupParams) {
  const { data } = await apiClient.post(`/shop/setup`, setupParams);

  return data;
}

export type ShopSetupParams = {
  shop: {
    name: string;
  };
  loyaltyProgram: {
    name: string;
    type: LoyaltyProgramType;
    config: {
      stampIcon: string;
      availableRewards: {
        code: string;
        name: string;
        description?: string;
        goalPoints: number;
      }[];
    };
  }
}