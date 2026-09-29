import { LoyaltyProgram, LoyaltyProgramType, LoyaltyTransactionSummary, Paginated } from "../types";
import apiClient from "./client";

export async function getLoyaltyPrograms(
  shopId: string,
): Promise<LoyaltyProgram[]> {
  const { data: { data } } = await apiClient.get(`/shop/${shopId}/loyalty`);

  return data.map((program: LoyaltyProgram) => ({
    ...program,
    dateCreated: new Date(program.dateCreated),
  }));
}

export async function getLoyaltyProgram(
  shopId: string,
  programId: string,
): Promise<LoyaltyProgram> {
  const { data } = await apiClient.get(`/shop/${shopId}/loyalty/${programId}`);

  return {
    ...data,
    dateCreated: new Date(data.dateCreated),
  };
}

export async function updateLoyaltyProgram(
  shopId: string,
  programId: string,
  loyaltyProgram: UpdateLoyaltyProgramParams,
) {
  const { data } = await apiClient.put(
    `/shop/${shopId}/loyalty/${programId}`,
    loyaltyProgram,
  );

  return data;
}

export async function fetchAllMemberPointTransactionsForShop(shopId: string, page = 0, size = 50): Promise<Paginated<LoyaltyTransactionSummary>> {
  const { data } = await apiClient.get(`/shop/${shopId}/loyalty-transactions`, { params: { page, size } });

  return {
    ...data,
    items: data.items.map((item: Record<string, string>) => ({
      ...item,
      points: Number(item.points),
      dateCreated: new Date(item.dateCreated),
    })),
  };
}

export type UpdateLoyaltyProgramParams = {
  name: string;
  type: LoyaltyProgramType;
  config: {
    stampIcon: string;
    availableRewards: {
      name: string;
      description?: string;
      goalPoints: number;
    }[];
  };
};
