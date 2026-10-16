import { MemberLoyaltyDto, MemberLoyaltySummary, MemberPointTransaction } from "@/src/types/member";
import { Paginated } from "../types";
import { MemberSummary as EnrichedMemberSummary } from "@/src/types/member";
import apiClient from "./client";

export async function getMemberLoyalty(shopId: string, memberId: string): Promise<MemberLoyaltyDto> {
  const { data } = await apiClient.get(`/shop/${shopId}/members/${memberId}`);

  return {
    ...data,
    dateCreated: new Date(data.dateCreated),
  };
}

export async function getMemberSummary(shopId: string, memberId: string): Promise<EnrichedMemberSummary> {
  const { data } = await apiClient.get<EnrichedMemberSummary>(`/shop/${shopId}/members/${memberId}/summary`);

  return {
    ...data,
    dateCreated: new Date(data.dateCreated),
  };
}

export async function getMemberLoyaltyHistory(shopId: string, memberId: string, page = 0, size = 50)
  : Promise<Paginated<MemberPointTransaction>> {
  const { data } = await apiClient.get(`/shop/${shopId}/members/${memberId}/loyalty/history`,
    { params: { page, size } });

  return {
    ...data,
    items: data.items.map((item: Record<string, string>) => ({
      ...item,
      points: Number(item.points),
      dateCreated: new Date(item.dateCreated),
    })),
  };
}

export async function addMemberLoyaltyPoints(
  shopId: string,
  memberId: string,
  points: number,
  notes?: string,
) {
  const body = notes ? { points, notes } : { points };
  const { data } = await apiClient.post(`/shop/${shopId}/members/${memberId}/points`, body);

  return data;
}

export async function redeemReward(shopId: string, memberId: string, rewardCode: string, notes?: string) {
  const body = { rewardCode, notes };
  const { data } = await apiClient.post(`/shop/${shopId}/members/${memberId}/redeem`, body);

  return data;
}

export async function getMembers(shopId: string, page = 0, size = 50): Promise<Paginated<MemberLoyaltySummary>> {
  const { data } = await apiClient.get<Paginated<MemberLoyaltySummary>>(
    `/shop/${shopId}/members`,
    { params: { page, size } }
  );

  return {
    ...data,
    items: data.items.map((item: MemberLoyaltySummary) => ({
      ...item,
      points: Number(item.points),
      dateCreated: new Date(item.dateCreated),
    })),
  };
}