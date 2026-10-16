"use client";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { ActionButton } from "@/src/components/shared/ActionButton";

type QrScannerProps = {
  mockMemberId?: string;
  paused?: boolean;
  onScan: (memberId: string) => void;
};

export function QrScanner({
  mockMemberId,
  paused = false,
  onScan,
}: QrScannerProps) {
  const [memberId, setMemberId] = useState<string | null>();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes) {
      console.log("Scanned QR Code:", detectedCodes);
    }
    setMemberId(
      detectedCodes.length > 0
        ? detectedCodes.map((code) => code.rawValue).join(", ")
        : null,
    );
    const [memberId = null] = detectedCodes.map((code) => code.rawValue);
    if (memberId) {
      onScan(memberId);
    }
  };

  if (mockMemberId) {
    return (
      <div className="flex flex-col flex-1 justify-center min-h-[350px]">
        <ActionButton
          onClick={() => onScan(mockMemberId)}
          className="rounded-xl px-6 py-3 text-sm active:scale-[0.98]"
        >
          Simulate QR Scan
        </ActionButton>
      </div>
    );
  }

  const highlightCodeOnCanvas = (
    detectedCodes: IDetectedBarcode[],
    ctx: CanvasRenderingContext2D,
  ) => {
    const primaryColor =
      getComputedStyle(ctx.canvas).getPropertyValue("--primary").trim() ||
      "#2d1060";

    detectedCodes.forEach((detectedCode) => {
      const { boundingBox, cornerPoints } = detectedCode;

      // Draw bounding box
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(
        boundingBox.x,
        boundingBox.y,
        boundingBox.width,
        boundingBox.height,
      );

      // Draw corner points
      ctx.fillStyle = primaryColor;
      cornerPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  return (
    // TODO: Turn off camera upon sheet overlay
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <p className="mb-4 text-xs font-medium text-primary dark:text-primary-lighter">
        Point camera at customer QR code
      </p>

      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-white/10">
        <Scanner
          paused={paused}
          onScan={handleScan}
          sound={true}
          components={{
            tracker: highlightCodeOnCanvas,
            onOff: true,
          }}
        />
      </div>

      {memberId && (
        <p className="pt-4 text-xs text-slate-500 dark:text-slate-400">
          {memberId}
        </p>
      )}
    </div>
  );
}
