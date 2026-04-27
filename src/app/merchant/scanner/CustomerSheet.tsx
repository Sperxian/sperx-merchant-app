"use client";

import { useRef, useState } from "react";
// import { Customer, LoyaltyConfig } from "@/src/types";
import { StampGrid } from "./StampGrid";
// import { LOYALTY_PROGRAM_NAME } from "@/src/lib/shared";
// import { StampCounter } from "./StampCounter";


const SHOP_NAME = "Café Barako";
const LOYALTY_PROGRAM_NAME = "Member Loyalty Program";

interface CustomerSheetProps {
  customer: Customer;
  config: LoyaltyConfig;
  open: boolean;
  onClose: () => void;
}
/**
 * Merchant
 */
interface Customer {
  id: string;
  name: string;
  initials: string;
  memberSince: string;
  stamps: number;
  totalStamps: number;
}

interface LoyaltyConfig {
  stampsRequired: number;
  rewardLabel: string;
}


type SheetState = "idle" | "confirmed";

export function CustomerSheet({
  customer,
  config,
  open,
  onClose,
}: CustomerSheetProps) {
  const [stamps, setStamps] = useState(customer.stamps);
  const [toAdd, setToAdd] = useState(1);
  const [newlyAdded, setNewlyAdded] = useState(0);
  const [state, setState] = useState<SheetState>("idle");
  const sheetRef = useRef<HTMLDivElement>(null);

  const remaining = config.stampsRequired - stamps;

  function handleConfirm() {
    const added = Math.min(toAdd, remaining);
    setStamps((s) => s + added);
    setNewlyAdded(added);
    setState("confirmed");
  }

  function handleReset() {
    onClose();
  }

  const successMessage =
    stamps >= config.stampsRequired
      ? `Card complete! ${customer.name} earned a ${config.rewardLabel}!`
      : `${newlyAdded} ${newlyAdded === 1 ? "stamp" : "stamps"} added to ${customer.name}!`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 z-10 transition-colors duration-300",
          open ? "bg-black/55 pointer-events-auto" : "bg-transparent pointer-events-none",
        ].join(" ")}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Sheet */}
        <div
          ref={sheetRef}
          className={[
            "absolute inset-0 bg-[#F9F1E8] z-11 overflow-y-auto",
            "transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            open ? "translate-y-0" : "translate-y-full",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-2.5 pb-3.5">
            <div className="w-9 h-1 bg-[#D4A96A] rounded-full" />
          </div>

          <div className="px-4 pb-8 flex flex-col gap-4">
            {/* Customer */}
            <div>
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#8B5E3C] mb-1.5">
                Customer
              </p>
              <CustomerCard customer={customer} />
            </div>

            {/* Loyalty card */}
            <div>
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#8B5E3C] mb-1.5">
                Loyalty card
              </p>
              <LoyaltyCard
                current={stamps}
                total={config.stampsRequired}
                rewardLabel={config.rewardLabel}
              />
            </div>

            {/* Add stamps — hidden after confirm */}
            {state === "idle" && (
              <div>
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#8B5E3C] mb-1.5">
                  Add stamps
                </p>
                <StampCounter
                  value={toAdd}
                  max={remaining}
                  onChange={setToAdd}
                />
              </div>
            )}

            {state === "idle" && (
              <button
                onClick={handleConfirm}
                disabled={remaining === 0}
                className="w-full bg-[#C8943A] text-[#120728] text-[14px] font-medium py-3.5 rounded-xl tracking-wide transition-all active:scale-[0.99] hover:bg-[#D4A84A] disabled:opacity-35 disabled:cursor-not-allowed mb-2"
              >
                {toAdd === 1 ? "Add stamp" : `Add ${toAdd} stamps`}
              </button>)}

            {/* Success */}
            {state === "confirmed" && (
              <div className="bg-[#1C3D0F] text-[#7EC860] rounded-xl px-4 py-3 text-[12px] font-medium text-center mb-2">
                {successMessage}
              </div>
            )}

            {/* Reset / scan another */}
            {state === "confirmed" && (
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="text-[#8B5E3C] text-[12px] underline underline-offset-2 bg-transparent border-none cursor-pointer"
                >
                  Scan another customer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


interface CustomerCardProps {
  customer: Customer;
}

function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-white border border-[#D4A96A]/30 rounded-2xl p-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full bg-[#120728] flex items-center justify-center text-[#F5DEB3] text-[15px] font-medium flex-shrink-0"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {customer.initials}
        </div>

        <div>
          <p
            className="text-[#120728] text-[16px] font-medium leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {customer.name}
          </p>
          <p className="text-[#8B5E3C] text-[11px] mt-0.5">
            {customer.id}
          </p>
          <p className="text-[#8B5E3C] text-[11px] mt-0.5">
            Member since {customer.memberSince}
          </p>
        </div>
      </div>
    </div>
  );
}


interface LoyaltyCardProps {
  current: number;
  total: number;
  rewardLabel: string;
  newlyAdded?: number;
}

function LoyaltyCard({
  current,
  total,
  rewardLabel,
}: LoyaltyCardProps) {
  const pct = Math.round((current / total) * 100);
  const remaining = total - current;

  return (
    <div className="bg-[#2d1060] rounded-2xl p-4">
      {/* Header row */}
      <div className="flex items-center justify-between py-4">
        <p className="text-xs text-white/50 uppercase tracking-[1.5px]">
          {LOYALTY_PROGRAM_NAME}
        </p>
        <span className="text-xs text-[#D4A96A] tracking-[1.5px] font-medium">
          {current} / {total}
        </span>
      </div>

      {/* Stamp grid */}
      <StampGrid collected={current} total={total} />

      {/* Progress bar */}
      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex-1 h-1 bg-[#5C2D0A] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8943A] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[10px] text-[#8B5E3C] whitespace-nowrap">
          {remaining > 0
            ? `${remaining} more for ${rewardLabel}`
            : `${rewardLabel} earned!`}
        </span>
      </div>
    </div>
  );
}


interface StampCounterProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}

export function StampCounter({
  value,
  min = 1,
  max,
  onChange,
}: StampCounterProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="bg-white border border-[#D4A96A]/30 rounded-2xl p-3 mb-3">
      <div className="flex items-center">
        {/* Minus */}
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-11 h-11 rounded-full border-[1.5px] border-[#C8943A] text-[#5C2D0A] flex items-center justify-center text-2xl leading-none transition-all active:scale-90 hover:bg-[#C8943A]/10 disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Remove one stamp"
        >
          −
        </button>

        {/* Value */}
        <span
          className="flex-1 text-center text-[32px] font-medium text-[#3B1A06]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {value}
        </span>

        {/* Plus */}
        <button
          onClick={increment}
          disabled={value >= max}
          className="w-11 h-11 rounded-full border-[1.5px] border-[#C8943A] text-[#5C2D0A] flex items-center justify-center text-2xl leading-none transition-all active:scale-90 hover:bg-[#C8943A]/10 disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Add one stamp"
        >
          +
        </button>
      </div>

      <p className="text-[11px] text-[#8B5E3C] mt-1">
        {value === 1 ? "1 stamp to add" : `${value} stamps to add`}
      </p>
    </div>
  );
}
