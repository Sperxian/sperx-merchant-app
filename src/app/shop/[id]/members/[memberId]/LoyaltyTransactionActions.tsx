"use client";

import { Dialog } from "@/src/components/shared/Dialog";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TransactionAction = "add-points" | "redeem-reward";

export default function LoyaltyTransactionActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<TransactionAction | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const openDialog = (action: TransactionAction) => {
    setIsMenuOpen(false);
    setActiveDialog(action);
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="loyalty-transaction-actions"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
        >
          Add Transaction
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>

        {isMenuOpen && (
          <div
            id="loyalty-transaction-actions"
            className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-foreground/20 bg-background p-1 shadow-lg"
          >
            <button
              type="button"
              onClick={() => openDialog("add-points")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-foreground/10"
            >
              Add Points
            </button>
            <button
              type="button"
              onClick={() => openDialog("redeem-reward")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-foreground/10"
            >
              Redeem Reward
            </button>
          </div>
        )}
      </div>

      <Dialog
        open={activeDialog !== null}
        onClose={() => setActiveDialog(null)}
        title={activeDialog === "redeem-reward" ? "Redeem Reward" : "Add Points"}
        size="md"
      >
        <p className="pb-4 text-sm text-foreground/70">
          {activeDialog === "redeem-reward"
            ? "The Redeem Reward form will be available here."
            : "The Add Points form will be available here."}
        </p>
      </Dialog>
    </>
  );
}
