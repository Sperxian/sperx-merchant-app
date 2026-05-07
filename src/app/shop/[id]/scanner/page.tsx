import QrScanPageContent from "./QrScanPageContent";

type Props = {
  searchParams: Promise<{ mock?: string }>;
};

export default async function QrScanPage({ searchParams }: Props) {
  const { mock } = await searchParams;
  const mockQr = mock === "true";

  return <QrScanPageContent mockQr={mockQr} />;
}
