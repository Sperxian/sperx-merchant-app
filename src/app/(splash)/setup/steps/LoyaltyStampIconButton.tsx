"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconName, ICON_MAP } from "@/src/app/shop/[id]/scanner/components/LoyaltyStamp";

type LoyaltyStampIconButtonProps = {
  stampIcon: IconName;
  onChange?: (icon: IconName) => void;
};

export default function LoyaltyStampIconButton({ stampIcon, onChange }: LoyaltyStampIconButtonProps) {
  const IconComponent = ICON_MAP[stampIcon];
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const iconKeys = Object.keys(ICON_MAP) as IconName[];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center justify-center aspect-square h-12 mr-2 text-center cursor-pointer rounded-lg border border-foreground/10 hover:border-foreground/50"
      >
        <IconComponent />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-48 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-background p-2 shadow-lg">
          <div className="grid grid-cols-4 gap-2">
            {iconKeys.map((key) => {
              const Icon = ICON_MAP[key];
              return (
                <button
                  key={key}
                  type="button"
                  className="flex items-center justify-center aspect-square h-10 rounded-md hover:bg-primary"
                  onClick={() => {
                    setOpen(false);
                    onChange?.(key);
                  }}
                >
                  <Icon />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
