import QrScanPageContent from "./QrScanPageContent";

type Props = {
  searchParams: Promise<{
    mockMemberId?: string;
  }>;
};

export default async function QrScanPage({ searchParams }: Props) {
  const { mockMemberId } = await searchParams;

  return <QrScanPageContent mockMemberId={mockMemberId} />;
}
