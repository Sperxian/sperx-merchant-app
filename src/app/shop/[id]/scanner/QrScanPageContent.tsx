"use client";

import { useState } from "react";
import { MemberSheet } from "./components/MemberSheet";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { QrScanner } from "./components/QrScanner";
import { useShop } from "../ShopContext";
import { MemberLoyaltyDto } from "@/src/types/member";
import { toastError } from "@/src/lib/toast";

type Props = {
  defaultMemberId?: string;
};

export default function QrScanPageContent({ defaultMemberId }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [memberLoyalty, setMemberLoyalty] = useState<MemberLoyaltyDto>();

  const shop = useShop();

  const handleScan = async (memberId: string | null) => {
    setMemberId(memberId);
    if (memberId) {
      await loadMemberDetails(memberId);
    }
  };

  const loadMemberDetails = async (memberId: string) => {
    try {
      const data = await getMemberLoyalty(shop.id, memberId);
      setMemberLoyalty(data);
      setSheetOpen(true);
    } catch (error) {
      toastError(error);
    }
  };

  function handleClose() {
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col h-full py-10">
      <div className="flex-1 flex flex-col gap-2 items-center justify-center relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-8 gap-4">
          <QrScanner
            onScan={handleScan}
            defaultMemberId={defaultMemberId}
            paused={sheetOpen}
          />
        </div>
      </div>

      <MemberSheet
        member={memberLoyalty}
        open={sheetOpen}
        onClose={handleClose}
        onRefresh={() => memberId && loadMemberDetails(memberId)}
      />
    </div>
  );
}
