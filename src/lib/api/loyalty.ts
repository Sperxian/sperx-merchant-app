import { LoyaltyTransactionSummary, Paginated } from "../types";
import apiClient from "./client";

export async function getLoyaltyPrograms(shopId: string) {
  const { data } = await apiClient.get(`/shop/${shopId}/loyalty`);

  return data;
}

export async function fetchAllMemberPointTransactionsForShop(shopId: string, page = 0, size = 50): Promise<Paginated<LoyaltyTransactionSummary>> {
  const { data } = await apiClient.get(`/shop/${shopId}/member-point-transactions`, { params: { page, size } });

  return {
    ...data,
    items: data.items.map((item: Record<string, string>) => ({
      ...item,
      points: Number(item.points),
      dateCreated: new Date(item.dateCreated),
    })),
  };
}
