"use client";

import { useState } from "react";
import { CustomerSheet, MODE_OPTION } from "./components/CustomerSheet";
import { getMemberLoyalty } from "@/src/lib/api/member";
import { MemberLoyalty } from "@/src/lib/types";

const LOYALTY_CONFIG = {
  stampsRequired: 10,
  rewardLabel: "free coffee",
};

const options = {
  APPLY_STAMP: { label: "Apply stamp" },
  REDEEM_REWARD: { label: "Redeem reward" },
};

export default function QrScanPage() {
  const MEMBER_ID = "3aa24af8-1798-4af9-95bd-153dc1564cce";

  const [sheetOpen, setSheetOpen] = useState(false);
  const [mode, setMode] = useState<MODE_OPTION>("APPLY_STAMP");

  const [memberLoyalty, setMemberLoyalty] = useState<MemberLoyalty>();

  const handleScan = async () => {
    await loadMemberDetails(MEMBER_ID);
    setSheetOpen(true);
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
    <div className="flex flex-col h-full gap-6 max-w-xl bg-background">
      <div className="flex-1 flex flex-col gap-4 items-center justify-center relative overflow-hidden">
        {/* <QrScanner onScan={handleScan} /> */}

        <div className="flex gap-2 rounded-xl">
          {Object.entries(options).map(([key, option]) => {
            const isActive = mode === key;

            return (
              <button
                key={key}
                onClick={() => setMode(key as MODE_OPTION)}
                className={[
                  "px-4 py-2 text-md font-medium rounded-lg transition-colors text-white",
                  isActive
                    ? "bg-primary shadow"
                    : "bg-gray-500 hover:bg-gray-600",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div>
          <button
            onClick={handleScan}
            className="bg-primary text-white text-md font-medium p-6 py-2 rounded-xl tracking-wide transition-all active:scale-95 hover:bg-secondary"
          >
            Simulate QR Scan
          </button>
        </div>
      </div>

      <CustomerSheet
        member={memberLoyalty}
        config={LOYALTY_CONFIG}
        mode={mode}
        open={sheetOpen}
        onClose={handleClose}
        onRefresh={() => loadMemberDetails(MEMBER_ID)}
      />
    </div>
  );
}
