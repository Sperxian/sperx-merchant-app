"use client";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

type QrScannerProps = {
  mockMemberId?: string;
  onScan: (memberId: string) => void;
};

export function QrScanner({ mockMemberId,onScan }: QrScannerProps) {
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
      <button
        onClick={() => onScan(mockMemberId)}
        className="bg-primary text-white text-md font-medium p-6 py-2 rounded-xl tracking-wide transition-all active:scale-95 hover:bg-secondary"
      >
        Simulate QR Scan
      </button>
    );
  }

  const highlightCodeOnCanvas = (
    detectedCodes: IDetectedBarcode[],
    ctx: CanvasRenderingContext2D,
  ) => {
    detectedCodes.forEach((detectedCode) => {
      const { boundingBox, cornerPoints } = detectedCode;

      // Draw bounding box
      ctx.strokeStyle = "#ffb800";
      ctx.lineWidth = 4;
      ctx.strokeRect(
        boundingBox.x,
        boundingBox.y,
        boundingBox.width,
        boundingBox.height,
      );

      // Draw corner points
      ctx.fillStyle = "#ffb800";
      cornerPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <p className="text-xs font-medium text-primary dark:text-primary-lighter mb-4">
        Point camera at customer QR code
      </p>

      <div className="relative w-full max-w-[280px] aspect-square bg-primary-lighter rounded-2xl overflow-hidden">
        <Scanner
          onScan={handleScan}
          sound={true}
          components={{
            tracker: highlightCodeOnCanvas,
            onOff: true,
          }}
        />
      </div>

      {memberId && <p className="text-primary dark:text-primary-lighter text-xs pt-4">{memberId}</p>}
    </div>
  );
}
