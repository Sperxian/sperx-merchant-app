import QrScanPageContent from "./QrScanPageContent";

type Props = {
  searchParams: Promise<{ mock?: string }>;
};

export default async function QrScanPage({ searchParams }: Props) {
  const { mock: mockQr } = await searchParams;

  return <QrScanPageContent mockQr={mockQr}/>;
}
