import { CopyIcon } from "lucide-react";
import { toastError, toastSuccess } from "@/src/lib/toast";

export default function CopyableText({ text }: { text: string }) {
  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      toastSuccess("Copied text to clipboard");
    } catch (error) {
      toastError(error);
    }
  }

  return (
    <div className="inline-flex w-full items-center justify-center gap-2 overflow-visible text-sm">
      <div className="group relative min-w-0 overflow-visible">
        <p
          className="truncate cursor-pointer"
          title={text}
          onClick={copyText}
        >
          {text}
        </p>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 max-w-[80vw] -translate-x-1/2 break-all rounded bg-foreground px-2 py-1 text-background opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {text}
        </span>
      </div>
      <button
        type="button"
        aria-label="Copy text"
        className="relative shrink-0 cursor-pointer rounded-lg transition-all hover:scale-90"
        onClick={copyText}
      >
        <CopyIcon className="text-primary dark:text-primary-lighter" />
      </button>
    </div>
  );
}
