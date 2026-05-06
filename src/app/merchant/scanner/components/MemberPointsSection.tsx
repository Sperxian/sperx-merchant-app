"use react";

type MemberPointsSectionProps = {
  points: number;
};

export function MemberPointsSection({ points }: MemberPointsSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Member Points
      </p>
      <div className="text-3xl text-primary tracking-wide">{points}</div>
    </div>
  );
}
