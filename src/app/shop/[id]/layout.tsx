import type { Metadata } from "next";
import "./../../globals.css";
import { AppHeader } from "./scanner/components/AppHeader";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";

export const SHOP_NAME = "Café Barako";
export const LOYALTY_PROGRAM_NAME = "Member Loyalty Program";

export const metadata: Metadata = {
  title: SHOP_NAME,
  description: LOYALTY_PROGRAM_NAME,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { id: shopId } = await params;

  const { data: loyaltyPrograms } = await getLoyaltyPrograms(shopId);
  const [loyaltyProgram] = loyaltyPrograms;

  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="h-full bg-gray-100 flex justify-center">
        {/* phone shell */}
        <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl bg-white shadow flex flex-col overflow-hidden">
          {/* header */}
          <AppHeader
            shopName="Caef barako"
            loyaltyProgramName={loyaltyProgram.name}
          />

          {/* scroll area wrapper */}
          <div className="flex-1 relative overflow-hidden">
            {/* actual scroll container */}
            <main className="h-full overflow-y-auto">{children}</main>

            {/* bottom fade indicator */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white via-white/75 via-white/30 to-transparent" />
          </div>
        </div>
      </body>
    </html>
  );
}
