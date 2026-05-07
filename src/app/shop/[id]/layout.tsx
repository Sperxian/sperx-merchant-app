import type { Metadata } from "next";
import "./../../globals.css";
import { AppHeader } from "./scanner/components/AppHeader";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";
import { getShop } from "@/src/lib/api/shop";
import { ShopContextProvider } from "./ShopContext";
import { LoyaltyProgramContextProvider } from "./LoyaltyProgramContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

async function loadShopAndLoyaltyProgram(shopId: string) {
  const shop = await getShop(shopId);

  const { data: loyaltyPrograms } = await getLoyaltyPrograms(shopId);
  const [loyaltyProgram] = loyaltyPrograms;

  return { shop, loyaltyProgram };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: shopId } = await params;
  const { shop, loyaltyProgram } = await loadShopAndLoyaltyProgram(shopId);

  return {
    title: shop.name,
    description: loyaltyProgram.name,
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { id: shopId } = await params;
  const { shop, loyaltyProgram } = await loadShopAndLoyaltyProgram(shopId);

  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="h-full bg-gray-100 flex justify-center">
        {/* phone shell */}
        <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl bg-white shadow flex flex-col overflow-hidden">
          {/* header */}
          <ShopContextProvider value={shop}>
            <LoyaltyProgramContextProvider value={loyaltyProgram}>
              <AppHeader />

              {/* scroll area wrapper */}
              <div className="flex-1 relative overflow-hidden">
                {/* actual scroll container */}
                <main className="h-full overflow-y-auto">{children}</main>

                {/* bottom fade indicator */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white via-white/75 via-white/30 to-transparent" />
              </div>
            </LoyaltyProgramContextProvider>
          </ShopContextProvider>
        </div>
      </body>
    </html>
  );
}
