"use client";

import { useEffect, useState } from "react";
import { useShop } from "../../ShopContext";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { useParams } from "next/navigation";
import { MemberLoyaltyDto } from "@/src/types/member";
import MemberInfoSection from "./MemberInfoSection";
import LoyaltyTransactionsSection from "./LoyaltyTransactionsSection";

export default function MemberIdPage() {
  const shop = useShop();
  const params = useParams<{ memberId: string }>();
  const [memberLoyaltyDto, setMemberLoyaltyDto] = useState<MemberLoyaltyDto>();

  const memberId = params?.memberId;

  useEffect(() => {
    const fetchMember = async () => {
      const data = await getMemberLoyalty(shop.id, memberId);

      setMemberLoyaltyDto(data);
    };
    fetchMember();
  }, [shop.id, memberId]);

  return (
    <div className="flex flex-col gap-4">
      {memberLoyaltyDto && <MemberInfoSection member={memberLoyaltyDto} />}

      <LoyaltyTransactionsSection shop={shop} memberId={memberId} />
    </div>
  );
}
