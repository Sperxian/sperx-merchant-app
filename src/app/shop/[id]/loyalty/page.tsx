"use client";

import { useEffect, useState } from "react";
// import LoyaltyStatistics from "./LoyaltyStatistics";
import TransactionsTable from "../../../../components/shared/TransactionsTable";
import { useShop } from "../ShopContext";
import { fetchAllMemberPointTransactionsForShop } from "@/src/lib/api/loyalty";
import { LoyaltyTransactionSummary, Paginated } from "@/src/lib/types";

export default function LoyaltyPage() {
  const shop = useShop();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState<
    Paginated<LoyaltyTransactionSummary>
  >({
    page: 1,
    size: pageSize,
    total: 0,
    items: [],
  });
  
  // const statisticSummary = useMemo(
  //   () => [
  //     {
  //       title: "Granted Points",
  //       description: "Total points awarded to members",
  //       value: 1250,
  //     },
  //     {
  //       title: "Redeemed Rewards",
  //       description: "Total number of rewards redeemed by members",
  //       value: 15,
  //     },
  //     {
  //       title: "Active Members",
  //       description: "Number of active loyalty members",
  //       value: "XXX",
  //     },
  //     {
  //       title: "Pending Rewards",
  //       description: "Rewards awaiting redemption",
  //       value: "XX",
  //     },
  //   ],
  //   [],
  // );

  useEffect(() => {
    const fetchLoyaltyTransactions = async () => {
      const data = await fetchAllMemberPointTransactionsForShop(shop.id, page, pageSize);
      setLoyaltyTransactions(data);
    };

    fetchLoyaltyTransactions();
  }, [page, pageSize, shop.id]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Loyalty Transactions
      </h1>

      {/* <LoyaltyStatistics items={statisticSummary} /> */}
      <TransactionsTable
        transactions={loyaltyTransactions}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
