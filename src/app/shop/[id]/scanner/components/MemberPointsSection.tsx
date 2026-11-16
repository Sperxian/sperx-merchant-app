"use react";

import { StampIcon } from "lucide-react";

type Props = {
  points: number;
};

export function MemberPointsSection({ points }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-lighter">
        <StampIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Current Points
        </p>
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {points}
        </p>
      </div>
    </div>
  );
}
