"use client";

import { useState } from "react";
import { CustomerSheet } from "./CustomerSheet";

const LOYALTY_CONFIG = {
  stampsRequired: 12,
  rewardLabel: "free coffee",
};

// Simulated customer returned after a QR scan
const MOCK_CUSTOMER = {
  id: "b18da224-f443-4243-aeaf-8fca36ae0aea",
  name: "Juan Karlos",
  initials: "JK",
  memberSince: "Jan 2024",
  stamps: 9,
  totalStamps: 12,
};

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleScan() {
    setSheetOpen(true);
  }

  function handleClose() {
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col h-full gap-6 max-w-xl rounded-3xl border border-slate-200 bg-white shadow-sm">
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
        customer={MOCK_CUSTOMER}
        config={LOYALTY_CONFIG}
        open={sheetOpen}
        onClose={handleClose}
      />
    </div>
  );
}
