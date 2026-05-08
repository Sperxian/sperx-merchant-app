import { Dispatch, SetStateAction } from "react";

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
      <p className="text-sm font-medium text-foreground/50 mb-2">Apply Stamps</p>
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
    <div className="bg-background border border-primary rounded-2xl p-3">
      <div className="flex items-center">
        <button
          onClick={decrement}
          disabled={value <= 1}
          className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center text-2xl leading-none transition-all hover:bg-primary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Remove one stamp"
        >
          −
        </button>

        <span className="flex-1 text-center text-2xl font-medium text-foreground">
          {value}
        </span>

        <button
          onClick={increment}
          className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center text-2xl leading-none transition-all hover:bg-primary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Add one stamp"
        >
          +
        </button>
      </div>
    </div>
  );
}
