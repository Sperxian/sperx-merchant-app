"use client";

import { useEffect, useState } from "react";
import { useShop } from "../../ShopContext";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { useParams, useRouter } from "next/navigation";
import { MemberLoyaltyDto } from "@/src/types/member";
import MemberInfoSection from "./MemberInfoSection";
import LoyaltyTransactionsSection from "./LoyaltyTransactionsSection";
import { ChevronRight, UsersIcon } from "lucide-react";

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
      <Breadcrumbs memberId={memberId} shopId={shop.id} />

      {memberLoyaltyDto && (
        <>
          <MemberInfoSection member={memberLoyaltyDto} />
          <LoyaltyTransactionsSection shop={shop} memberId={memberId} />
        </>
      )}
    </div>
  );
}

function Breadcrumbs({
  memberId,
  shopId,
}: {
  memberId: string;
  shopId: string;
}) {
  const router = useRouter();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <span
            className="inline-flex items-center text-sm font-medium text-body cursor-pointer"
            onClick={() => router.push(`/shop/${shopId}/members`)}
          >
            <UsersIcon size={16} className="mr-2" />
            Members
          </span>
        </li>
        <li aria-current="page">
          <div className="flex items-center space-x-1.5">
            <ChevronRight size={16} className="text-body" />
            <span className="inline-flex items-center text-sm font-medium text-body-subtle">
              {memberId}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
