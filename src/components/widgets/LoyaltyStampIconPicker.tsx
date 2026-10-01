"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  IconName,
  ICON_MAP,
} from "@/src/app/shop/[id]/scanner/components/LoyaltyStamp";

type Props = {
  stampIcon: IconName;
  onChange?: (icon: IconName) => void;
};

export default function LoyaltyStampIconPicker({
  stampIcon,
  onChange,
}: Props) {
  const IconComponent = ICON_MAP[stampIcon];
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
        className="flex aspect-square h-12 mr-2 items-center justify-center rounded-lg border border-foreground/10 text-center hover:border-foreground/50"
      >
        <IconComponent />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-48 overflow-auto rounded-lg border border-gray-200 bg-background p-2 shadow-lg">
          <div className="grid grid-cols-4 gap-2">
            {iconKeys.map((key) => {
              const Icon = ICON_MAP[key];
              return (
                <button
                  key={key}
                  type="button"
                  className="flex aspect-square h-10 items-center justify-center rounded-md hover:bg-primary"
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