"use client";

import React from "react";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-5xl",
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  size = "lg",
}: DialogProps) {
  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "rounded-none overflow-hidden ",
        "bg-black/60 shadow-lg p-0 m-0 w-full h-full max-w-none max-h-[none]",
        "sm:m-auto sm:w-auto sm:h-auto sm:rounded-lg",
        "transition-opacity duration-300",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          `${sizeClasses[size]} w-full h-full sm:max-h-3/4 sm:m-auto sm:mt-10 flex flex-col bg-background`,
          "transition-all duration-300 ease-out",
          open
            ? "sm:opacity-100 translate-y-0  scale-100"
            : "sm:opacity-0 sm:translate-y-4 translate-y-full scale-95",
        ].join(" ")}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 pb-0">{children}</div>
      </div>
    </div>
  );
}
