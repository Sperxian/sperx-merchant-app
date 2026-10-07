"use client";

import { useEffect, useRef, useState } from "react";
import { CopyIcon } from "lucide-react";
import { toastError } from "@/src/lib/toast";

export default function CopyableText({ text }: { text: string }) {
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(
    () => () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    },
    [],
  );

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = setTimeout(() => setIsCopied(false), 1500);
    } catch (error) {
      toastError(error);
    }
  }

  return (
    <div className="inline-flex w-full items-center justify-center gap-2 text-sm">
      <div className="group relative min-w-0">
        <p
          className="truncate cursor-pointer"
          title={text}
          onClick={copyText}
        >
          {text}
        </p>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 max-w-[80vw] -translate-x-1/2 break-all rounded bg-foreground px-2 py-1 text-background opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {text}
        </span>
      </div>
      <div className="relative shrink-0">
        <button
          type="button"
          aria-label="Copy text"
          className="rounded-lg cursor-pointer transition-all hover:scale-90"
          onClick={copyText}
        >
          <CopyIcon color="var(--primary)" />
        </button>
        {isCopied ? (
          <span
            role="status"
            className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-background shadow"
          >
            Copied
          </span>
        ) : null}
      </div>
    </div>
  );
}
