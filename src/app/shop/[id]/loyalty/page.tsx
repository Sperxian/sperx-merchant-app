"use client";

import { useMemo } from "react";
import LoyaltyStatistics from "./LoyaltyStatistics";
import TransactionsTable from "./TransactionsTable";

type MemberLoyaltyTransaction = {
  member: string;
  points: number;
  date: Date;
  loyaltyProgram: {
    id: string;
    name: string;
  };
  reward: {
    name: string;
  };
};

const generatedTransactions: MemberLoyaltyTransaction[] = Array.from(
  { length: 15 },
  (_, index) => ({
    member: `Member ${index + 1}`,
    points: [50, 120, 75, 200, 25, 90, 150, 300][index % 8],
    date: new Date(2026, 6, index + 1),
    loyaltyProgram: {
      id: `program-${index + 1}`,
      name: "Barako Rewards",
    },
    reward: {
      name: index % 2 === 0 ? "Free Coffee" : "Discount Voucher",
    },
  }),
);

export default function LoyaltyPage() {
  const statisticSummary = useMemo(
    () => [
      {
        title: "Granted Points",
        description: "Total points awarded to members",
        value: 1250,
      },
      {
        title: "Redeemed Rewards",
        description: "Total number of rewards redeemed by members",
        value: 15,
      },
      {
        title: "Active Members",
        description: "Number of active loyalty members",
        value: 'XXX',
      },
      {
        title: "Pending Rewards",
        description: "Rewards awaiting redemption",
        value: 'XX',
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Loyalty Transactions
      </h1>

      <LoyaltyStatistics items={statisticSummary} />
      <TransactionsTable transactions={generatedTransactions} />
    </div>
  );
}
