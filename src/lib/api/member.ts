import apiClient from "./client";

export async function getMemberLoyalty(shopId: string, memberId: string) {
  const { data } = await apiClient.get(`/shop/${shopId}/members/${memberId}`);

  return data;
}

export async function addMemberLoyaltyPoints(shopId: string, memberId: string, points: number) {
  const body = { points };
  const { data } = await apiClient.post(`/shop/${shopId}/members/${memberId}/points`, body);

  return data;
}

export async function redeemReward(shopId: string, memberId: string, rewardCode: string) {
  const body = { rewardCode };
  const { data } = await apiClient.post(`/shop/${shopId}/members/${memberId}/redeem`, body);

  return data;
}