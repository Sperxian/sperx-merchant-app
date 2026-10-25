import "@/src/app/globals.css";
import Image from "next/image";

type Props = {
  defaultSlot: React.ReactNode;
  actionSlot?: React.ReactNode;
};

export default function SplashPageTemplate({ defaultSlot, actionSlot }: Props) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full flex-col items-center justify-between gap-8 overflow-hidden bg-slate-50 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute -right-7 -top-7 h-[120px] w-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute -bottom-5 left-[18px] h-[180px] w-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] h-[320px] w-[320px] rounded-full border-[12px] border-primary/5" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 px-5 pt-8">
        <Image
          className="aspect-square animate-pulse object-cover"
          src={"/sperx-logo.png"}
          alt="Sperx"
          width={120}
          height={120}
          priority
        />
        <div className="w-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          {defaultSlot}
        </div>
      </div>

      {actionSlot && (
        <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-4 p-8">
          {actionSlot}
        </div>
      )}
    </div>
  );
}
