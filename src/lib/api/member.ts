import apiClient from "./client";

const SHOP_ID = '329ec261-02ba-4600-8704-deaed7fff77f';


export async function getMemberLoyalty(memberId: string) {
  const { data } = await apiClient.get(`/shop/${SHOP_ID}/members/${memberId}`);

  return data;
}

export async function addMemberLoyaltyPoints(memberId: string, points: number) {
  const body = { points };
  const { data } = await apiClient.post(`/shop/${SHOP_ID}/members/${memberId}/points`, body);

  return data;
}

export async function redeemReward(memberId: string, rewardCode: string) {
  const body = { rewardCode };
  const { data } = await apiClient.post(`/shop/${SHOP_ID}/members/${memberId}/redeem`, body);

  return data;
}