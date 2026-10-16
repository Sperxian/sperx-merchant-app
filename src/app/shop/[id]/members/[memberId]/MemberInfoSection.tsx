import CopyableText from "@/src/components/shared/CopyableText";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import { MemberSummary } from "@/src/types/member";
import { ReactNode } from "react";

type Props = {
  memberSummary: MemberSummary;
};

export default function MemberInfoSection({ memberSummary }: Props) {
  // Not showing until we figure out how to retrieve registered member's data
  const isRegistered = memberSummary.identityId !== null && false;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-primary">
        Member Information
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InformationCard
          entries={[
            {
              label: "Member ID",
              valueNode: (
                <div className="inline-flex">
                  <CopyableText text={memberSummary.id} />
                </div>
              ),
            },
            {
              label: "Loyalty Program",
              value: memberSummary.loyaltyProgram.name,
            },
            { label: "Guest ID", value: memberSummary.guestId },
            {
              label: "Date Joined",
              value: formatDateTime(memberSummary.dateCreated),
            },
          ]}
        />
        <InformationCard
          entries={[
            {
              label: "Net Points",
              value: memberSummary.netPoints.toString(),
            },
            {
              label: "Total Accumulated Points",
              value: memberSummary.totalAccumulatedPoints.toString(),
            },
            {
              label: "Total Redeemed Points",
              value: memberSummary.totalRedeemedPoints.toString(),
            },
            {
              label: "Number of Redeemed Rewards",
              value: memberSummary.totalRedeemedRewards.toString(),
            },
          ]}
        />
        {isRegistered && (
          <InformationCard
            entries={[
              { label: "User ID", value: "<TODO>" },
              { label: "First Name", value: "<TODO>" },
              { label: "Last Name", value: "<TODO>" },
              { label: "Email Address", value: "<TODO>" },
              { label: "Date Registered", value: "<TODO>" },
              { label: "Last Signed In", value: "<TODO>" },
            ]}
          />
        )}
      </div>
    </div>
  );
}

type InformationCardEntry = {
  label: string;
  value?: string | null;
  valueNode?: ReactNode;
};

function InformationCard({ entries }: { entries: InformationCardEntry[] }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-foreground/40 bg-background/30 shadow-sm">
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="text-sm overflow-hidden text-ellipsis text-slate-500 dark:text-slate-400">
            {entry.label}
          </div>
          <div className="text-md font-medium overflow-hidden text-ellipsis">
            {entry.valueNode !== undefined ? (
              entry.valueNode
            ) : (
              <span> {entry.value ?? "-"}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
