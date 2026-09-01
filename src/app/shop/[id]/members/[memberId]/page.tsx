"use client";

import { useEffect, useState } from "react";
import { useShop } from "../../ShopContext";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { useParams } from "next/navigation";
import { MemberLoyaltyDto } from "@/src/types/member";
import MemberInfoSection from "./MemberInfoSection";

export default function MemberIdPage() {
  const shop = useShop();
  const params = useParams<{ memberId: string }>();
  const [memberLoyaltyDto, setMemberLoyaltyDto] = useState<MemberLoyaltyDto>();

  const memberId = params?.memberId;

  useEffect(() => {
    const fetchMember = async () => {
      const data = await getMemberLoyalty(shop.id, memberId);
      console.log(data);

      setMemberLoyaltyDto(data);
    };
    fetchMember();
  }, [shop.id, memberId]);

  return (
    <div className="flex flex-col gap-4">
      {memberLoyaltyDto && <MemberInfoSection member={memberLoyaltyDto} />}

      <LoyaltyTransactionsSection />
    </div>
  );
}

function LoyaltyTransactionsSection() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Loyalty Transactions
      </h1>
    </>
  );
}
