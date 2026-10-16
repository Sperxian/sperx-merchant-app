import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border-[24px] border-primary/10" />
      <div className="absolute -bottom-10 -left-8 h-64 w-64 rounded-full border-[24px] border-primary/5" />
      <div className="relative z-10">
        <SignIn />
      </div>
    </div>
  );
}
