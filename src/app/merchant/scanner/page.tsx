"use client";

import { useState } from "react";
import { CustomerSheet } from "./components/CustomerSheet";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { MemberLoyalty } from "@/src/lib/types";

const LOYALTY_CONFIG = {
  stampsRequired: 10,
  rewardLabel: "free coffee",
};

export default function QrScanPage() {
  const MEMBER_ID = "3aa24af8-1798-4af9-95bd-153dc1564cce";

  const [sheetOpen, setSheetOpen] = useState(false);

  const [memberLoyalty, setMemberLoyalty] = useState<
    MemberLoyalty | undefined
  >();

  const handleScan = async () => {
    setSheetOpen(true);
    await loadMemberDetails(MEMBER_ID);
  };

  const loadMemberDetails = async (memberId: string) => {
    const data = await getMemberLoyalty(memberId);
    setMemberLoyalty({
      id: data.id,
      points: data.points,
      dateCreated: data.dateCreated,
    });
  };

  function handleClose() {
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col h-full gap-6 max-w-xl bg-background">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* <QrScanner onScan={handleScan} /> */}

        <button
          onClick={handleScan}
          className="bg-primary text-white text-md font-medium p-6 py-2 rounded-xl tracking-wide transition-all active:scale-95 hover:bg-secondary"
        >
          Simulate QR Scan
        </button>
      </div>

      <CustomerSheet
        member={memberLoyalty}
        config={LOYALTY_CONFIG}
        open={sheetOpen}
        onClose={handleClose}
        onRefresh={() => loadMemberDetails(MEMBER_ID)}
      />
    </div>
  );
}
