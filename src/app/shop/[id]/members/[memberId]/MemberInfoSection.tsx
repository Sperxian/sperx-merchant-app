import { formatDateTime } from "@/src/lib/utils/date.utils";
import { MemberLoyaltyDto } from "@/src/types/member";

type Props = {
  member: MemberLoyaltyDto;
};

export default function MemberInfoSection({ member }: Props) {
  // Not showing until we figure out how to retrieve registered member's data
  const isRegistered = member.identityId !== null && false;

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary">
        Member Information
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InformationCard
          entries={[
            { label: "Member ID", value: member.id },
            { label: "Loyalty Program", value: member.loyaltyProgram.name },
            { label: "Guest ID", value: member.guestId },
            { label: "Date Joined", value: formatDateTime(member.dateCreated) },
          ]}
        />
        {isRegistered && (
          <InformationCard
            entries={[
              { label: "First Name", value: "<TODO>" },
              { label: "Last Name", value: "<TODO>" },
              { label: "Date Registered", value: "<TODO>" },
            ]}
          />
        )}
        {isRegistered && (
          <InformationCard
            entries={[
              { label: "User ID", value: "<TODO>" },
              { label: "Email Address", value: "<TODO>" },
              { label: "Last Signed In", value: "<TODO>" },
            ]}
          />
        )}
      </div>
    </>
  );
}

type InformationCardEntry = {
  label: string;
  value: string | null;
};

function InformationCard({ entries }: { entries: InformationCardEntry[] }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-foreground/40 bg-background/30 shadow-sm">
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="text-sm overflow-hidden text-ellipsis">
            {entry.label}
          </div>
          <div className="text-md font-bold overflow-hidden text-ellipsis">
            {entry.value ?? "-"}
          </div>
        </div>
      ))}
    </div>
  );
}
