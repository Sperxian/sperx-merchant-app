"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toastError } from "@/src/lib/toast";
import CopyableText from "@/src/components/shared/CopyableText";

const qrCenterImage = "/sperx-logo.png";

type Props = {
  loyaltyProgramName: string;
  data: string;
  onClose: () => void;
};

export default function QrDialogContent({
  loyaltyProgramName,
  data,
  onClose,
}: Props) {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);

  async function downloadQrCode() {
    const qrCode = qrCodeContainerRef.current?.querySelector("svg");
    if (!qrCode) {
      toastError(new Error("QR code is unavailable."));
      return;
    }

    const downloadableQrCode = qrCode.cloneNode(true) as SVGSVGElement;
    const qrCodeStyles = getComputedStyle(qrCode);
    downloadableQrCode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    downloadableQrCode.style.setProperty(
      "--primary",
      qrCodeStyles.getPropertyValue("--primary").trim(),
    );
    downloadableQrCode.style.setProperty(
      "--background",
      qrCodeStyles.getPropertyValue("--background").trim(),
    );

    let svgUrl: string | undefined;

    try {
      const logoResponse = await fetch(qrCenterImage);
      if (!logoResponse.ok) {
        throw new Error("Unable to load the QR code logo.");
      }
      const logoBlob = await logoResponse.blob();
      const logoDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Unable to read the QR code logo."));
          }
        };
        reader.onerror = () =>
          reject(reader.error ?? new Error("Unable to read the QR code logo."));
        reader.readAsDataURL(logoBlob);
      });

      downloadableQrCode.querySelectorAll("image").forEach((imageElement) => {
        imageElement.setAttribute("href", logoDataUrl);
      });

      const imageSourceUrl = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(downloadableQrCode)], {
          type: "image/svg+xml;charset=utf-8",
        }),
      );
      svgUrl = imageSourceUrl;
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Unable to render the QR code."));
        image.src = imageSourceUrl;
      });

      const canvas = document.createElement("canvas");
      const scale = 3;
      canvas.width = image.naturalWidth * scale;
      canvas.height = image.naturalHeight * scale;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Unable to render the QR code.");
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Unable to create the QR code PNG."));
          }
        }, "image/png");
      });
      const pngUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "loyalty-program-qr-code.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(pngUrl), 0);
    } catch (error) {
      toastError(error);
    } finally {
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="self-start text-2xl">QR Code</h2>
      <div ref={qrCodeContainerRef} className="w-[50vw] max-w-[256px] gap-4">
        <QRCodeSVG
          value={data}
          style={{ display: "block", height: "auto", width: "100%" }}
          bgColor={"var(--background)"}
          fgColor={"var(--primary)"}
          level="H"
          imageSettings={{
            src: qrCenterImage,
            height: 48,
            width: 48,
            excavate: true,
          }}
        />
      </div>

      <div className="flex text-xl text-primary font-medium">
        {loyaltyProgramName}
      </div>
      <div className="w-[80%]">
        <CopyableText text={data} />
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-foreground/10"
        >
          Close
        </button>
        <button
          type="button"
          onClick={downloadQrCode}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-secondary"
        >
          Download QR code (PNG)
        </button>
      </div>
    </div>
  );
}
