"use client";

import { useState } from "react";
import { MemberSheet } from "./components/MemberSheet";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { MemberLoyalty } from "@/src/lib/types";
import { QrScanner } from "./components/QrScanner";
import { useShop } from "../ShopContext";
import { Alert } from "@/src/components/shared/Alert";

type Props = {
  mockMemberId?: string;
};

export default function QrScanPageContent({ mockMemberId }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [memberLoyalty, setMemberLoyalty] = useState<MemberLoyalty>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const shop = useShop();

  const handleScan = async (memberId: string | null) => {
    setErrorMessage("");
    setMemberId(memberId);
    if (memberId) {
      await loadMemberDetails(memberId);
    }
  };

  const loadMemberDetails = async (memberId: string) => {
    const data = await getMemberLoyalty(shop.id, memberId);

    if (!data) {
      setErrorMessage(`Member scanned was not found. Please scan again.`);
      return;
    }

    setMemberLoyalty({
      id: data.id,
      points: data.points,
      dateCreated: data.dateCreated,
    });

    setSheetOpen(true);
  };

  function handleClose() {
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col h-full bg-background py-10">
      <div className="flex-1 flex flex-col gap-2 items-center justify-center relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-8 gap-4">
          <QrScanner
            onScan={handleScan}
            mockMemberId={mockMemberId}
            paused={sheetOpen}
          />
          {errorMessage && <Alert variant="error" message={errorMessage} />}
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
