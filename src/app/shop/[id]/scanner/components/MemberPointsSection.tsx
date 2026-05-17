"use react";

type MemberStampsSectionProps = {
  points: number;
};

export function MemberStampsSection({ points }: MemberStampsSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Member Stamps
      </p>
      <div className="text-3xl text-primary dark:text-primary-lighter tracking-wide">{points}</div>
    </div>
  );
}
