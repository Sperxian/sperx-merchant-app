import apiClient from "./client";

export async function getShop(shopId: string) {
  const { data } = await apiClient.get(`/shop/${shopId}`);

  return data;
}
