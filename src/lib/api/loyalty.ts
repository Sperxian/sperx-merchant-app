import apiClient from "./client";

export async function getLoyaltyPrograms(shopId: string) {
  const { data } = await apiClient.get(`/shop/${shopId}/loyalty`);

  return data;
}
