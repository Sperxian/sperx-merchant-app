import apiClient from "./client";

const SHOP_ID = '329ec261-02ba-4600-8704-deaed7fff77f';


export async function getMemberLoyalty(memberId: string) {
  const { data } = await apiClient.get(`/shop/${SHOP_ID}/members/${memberId}`);
  console.log({ data });
  return data;
}