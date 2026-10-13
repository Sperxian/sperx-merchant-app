"use client";

import { useCallback, useEffect, useState } from "react";
import { useShop } from "../../ShopContext";
import { getMemberSummary } from "@/src/lib/api/member";
import { useParams } from "next/navigation";
import MemberInfoSection from "./MemberInfoSection";
import LoyaltyTransactionsSection from "./LoyaltyTransactionsSection";
import { UsersIcon } from "lucide-react";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import { MemberSummary } from "@/src/types/member";

export default function MemberIdPage() {
  const shop = useShop();
  const params = useParams<{ memberId: string }>();
  const [memberSummary, setMemberSummary] = useState<MemberSummary>();

  const memberId = params?.memberId;

  const refreshMember = useCallback(async () => {
    const data = await getMemberSummary(shop.id, memberId);
    setMemberSummary(data);
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

      {memberSummary && (
        <div className="flex flex-col gap-8">
          <MemberInfoSection memberSummary={memberSummary} />
          <LoyaltyTransactionsSection
            shop={shop}
            memberId={memberId}
            onMemberRefresh={refreshMember}
          />
        </div>
      )}
    </div>
  );
}
