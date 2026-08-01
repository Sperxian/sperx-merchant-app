import QrScanPageContent from "./QrScanPageContent";

type Props = {
  searchParams: Promise<{
    mockMemberId?: string;
  }>;
};

export default async function QrScanPage({ searchParams }: Props) {
  const { mockMemberId } = await searchParams;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Scanner</h1>

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col rounded-3xl border border-white/30 p-4 shadow-2xl sm:p-6 lg:p-8">
        <div className="flex-1 flex flex-col relative overflow-hidden w-full">
          <QrScanPageContent mockMemberId={mockMemberId} />
        </div>
      </div>
    </div>
  );
}
