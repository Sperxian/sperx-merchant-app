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
    <section className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-primary dark:text-primary-lighter">Profile</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Member Information
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    </section>
  );
}

type InformationCardEntry = {
  label: string;
  value?: string | null;
  valueNode?: ReactNode;
};

function InformationCard({ entries }: { entries: InformationCardEntry[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="overflow-hidden text-ellipsis text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {entry.label}
          </div>
          <div className="overflow-hidden text-ellipsis text-sm font-semibold text-slate-900 dark:text-white">
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
