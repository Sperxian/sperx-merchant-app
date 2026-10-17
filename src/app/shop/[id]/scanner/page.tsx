import QrScanPageContent from "./QrScanPageContent";
import { PageHeading } from "@/src/components/shared/PageHeading";

type Props = {
  searchParams: Promise<{
    memberId?: string;
  }>;
};

export default async function QrScanPage({ searchParams }: Props) {
  const { memberId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeading
        eyebrow="Member tools"
        title="Scanner"
        description="Scan a member’s QR code to view points, apply stamps, or redeem rewards."
      />

      <div className="mx-auto flex min-h-[30rem] w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-6 lg:p-8">
        <div className="relative flex w-full flex-1 flex-col overflow-hidden">
          <QrScanPageContent defaultMemberId={memberId} />
        </div>
      </div>
    </div>
  );
}
