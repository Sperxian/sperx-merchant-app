"use client";

import { useState } from "react";
import { MemberSheet, MODE_OPTION } from "./components/MemberSheet";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { MemberLoyalty } from "@/src/lib/types";
import { QrScanner } from "./components/QrScanner";
import { GiftIcon, StampIcon } from "lucide-react";

const LOYALTY_CONFIG = {
  stampsRequired: 10,
  rewardLabel: "free coffee",
};
  
const MOCK_MEMBER_ID = "3aa24af8-1798-4af9-95bd-153dc1564cce";

export default function QrScanPage() {

  const [isMock] = useState(!true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [_memberId, setMemberId] = useState<string | null>(null);
  const [mode, setMode] = useState<MODE_OPTION>("APPLY_STAMP");

  const [memberLoyalty, setMemberLoyalty] = useState<MemberLoyalty>();

  const handleScan = async (memberId: string | null) => {
    setMemberId(memberId);
    if (memberId) {
      await loadMemberDetails(memberId);
      setSheetOpen(true);
    }
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
    setMode("APPLY_STAMP");
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col h-full max-w-xl bg-background pb-10">
      <div className="flex-1 flex flex-col gap-2 items-center justify-center relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-8">
          {isMock ? (
            <button
              onClick={() => handleScan(MOCK_MEMBER_ID)}
              className="bg-primary text-white text-md font-medium p-6 py-2 rounded-xl tracking-wide transition-all active:scale-95 hover:bg-secondary"
            >
              Simulate QR Scan
            </button>
          ) : (
            <QrScanner onScan={handleScan} />
          )}
        </div>

        <div className="flex gap-4 rounded-xl">
          <div className="flex flex-col max-w-24 items-center">
            <button
              onClick={() => setMode("APPLY_STAMP")}
              className={[
                "px-4 py-2 rounded-lg transition-colors aspect-square max-w-20",
                "text-md font-medium",
                "border border-4 border-solid",
                mode === "APPLY_STAMP"
                  ? "border-primary text-white bg-primary"
                  : "border-primary/80 text-primary/80 bg-primary/10 hover:bg-primary",
                "flex items-center justify-center",
              ].join(" ")}
            >
              <StampIcon size={32} />
            </button>
            <p className="uppercase tracking-wider whitespace-normal font-medium text-primary text-center pt-4">
              Apply Stamp
            </p>
          </div>

          <div className="flex flex-col max-w-24 items-center">
            <button
              onClick={() => setMode("REDEEM_REWARD")}
              className={[
                "px-4 py-2 rounded-lg transition-colors aspect-square max-w-20",
                "text-md font-medium",
                "border border-4 border-solid",
                mode === "REDEEM_REWARD"
                  ? "border-primary text-white bg-primary"
                  : "border-primary/80 text-primary/80 bg-primary/10 hover:bg-primary",
                "flex items-center justify-center",
              ].join(" ")}
            >
              <GiftIcon size={32} />
            </button>
            <p className="uppercase tracking-wider whitespace-normal font-medium text-primary text-center pt-4">
              Redeem Reward
            </p>
          </div>
        </div>
      </div>

      <MemberSheet
        member={memberLoyalty}
        config={LOYALTY_CONFIG}
        mode={mode}
        open={sheetOpen}
        onClose={handleClose}
        onRefresh={() => loadMemberDetails(MOCK_MEMBER_ID)}
      />
    </div>
  );
}
