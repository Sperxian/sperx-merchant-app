import { Dispatch, SetStateAction } from "react";
import { ActionButton } from "@/src/components/shared/ActionButton";

type AddStampSectionProps = {
  stampsToReward: number;
  setStampsToReward: Dispatch<SetStateAction<number>>;
};

export function AddStampSection({
  stampsToReward,
  setStampsToReward,
}: AddStampSectionProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        Apply Stamps
      </p>
      <StampCounter value={stampsToReward} onChange={setStampsToReward} />
    </div>
  );
}

interface StampCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export function StampCounter({ value, onChange }: StampCounterProps) {
  const decrement = () => onChange(Math.max(0, value - 1));
  const increment = () => onChange(value + 1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950">
      <div className="flex items-center">
        <ActionButton
          variant="outline"
          onClick={decrement}
          disabled={value <= 1}
          className="h-11 w-11 shrink-0 rounded-full p-0 text-2xl leading-none disabled:opacity-25"
          aria-label="Remove one stamp"
        >
          −
        </ActionButton>

        <span className="flex-1 text-center text-2xl font-semibold text-slate-900 dark:text-white">
          {value}
        </span>

        <ActionButton
          variant="outline"
          onClick={increment}
          className="h-11 w-11 shrink-0 rounded-full p-0 text-2xl leading-none disabled:opacity-25"
          aria-label="Add one stamp"
        >
          +
        </ActionButton>
      </div>
    </div>
  );
}
