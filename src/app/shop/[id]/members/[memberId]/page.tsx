"use client";

import { useCallback, useEffect, useState } from "react";
import { useShop } from "../../ShopContext";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { useParams } from "next/navigation";
import { MemberLoyaltyDto } from "@/src/types/member";
import MemberInfoSection from "./MemberInfoSection";
import LoyaltyTransactionsSection from "./LoyaltyTransactionsSection";
import { UsersIcon } from "lucide-react";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";

export default function MemberIdPage() {
  const shop = useShop();
  const params = useParams<{ memberId: string }>();
  const [memberLoyaltyDto, setMemberLoyaltyDto] = useState<MemberLoyaltyDto>();

  const memberId = params?.memberId;

  const refreshMember = useCallback(async () => {
    const data = await getMemberLoyalty(shop.id, memberId);
    setMemberLoyaltyDto(data);
  }, [shop.id, memberId]);

  useEffect(() => {
    const fetchMember = async () => {
      await refreshMember();
    };
    void fetchMember();
  }, [refreshMember]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs
        items={[
          {
            label: "Members",
            href: `/shop/${shop.id}/members`,
            icon: UsersIcon,
          },
          { label: memberId },
        ]}
      />

      {memberLoyaltyDto && (
        <>
          <MemberInfoSection member={memberLoyaltyDto} />
          <LoyaltyTransactionsSection
            shop={shop}
            memberId={memberId}
            onMemberRefresh={refreshMember}
          />
        </>
      )}
    </div>
  );
}
