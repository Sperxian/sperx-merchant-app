import InformationCard from "../../../../../components/shared/InformationCard";

export default function MemberIdPage() {
  return (
    <div className="flex flex-col gap-4">
      <MemberInfoSection />

      <LoyaltyTransactionsSection />
    </div>
  );
}

function MemberInfoSection() {
  const memberData = [
    { label: "Member ID", value: "d043f463-c68e-4032-880a-7c410d0d3315" },
    { label: "Loyalty Program", value: "Scoop Rewards Program" },
    { label: "Guest ID", value: "c3c2fed0-dd06-468f-ab2e-207afa4b0ab5" },
    { label: "Date Joined", value: "May 10, 2026, 12:41:44 PM" },
  ];

  const userData = [
    { label: "First Name", value: "Pool" },
    { label: "Last Name", value: "Golez" },
    { label: "Date Registered", value: "May 27, 2026, 12:41:44 PM" },
  ];

  const userData2 = [
    { label: "User ID", value: "user_3EIp9T8zFnAt7M60ZZTpLziDBzl" },
    { label: "Email Address", value: "loop.edward@gmail.com" },
    { label: "Last Signed In", value: "August 19, 2026, 12:41:44 PM" },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Member Information
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InformationCard entries={memberData} />
        <InformationCard entries={userData} />
        <InformationCard entries={userData2} />
      </div>
    </>
  );
}

function LoyaltyTransactionsSection() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Loyalty Transactions
      </h1>
    </>
  );
}
