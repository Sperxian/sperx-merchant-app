import { LoyaltyStamp } from "./LoyaltyStamp";

interface StampGridProps {
  total: number;
  collected: number;
}

export function StampGrid({ total, collected }: StampGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < collected;

        return (
          <div
            key={i}
            className={`aspect-square rounded-xl flex items-center justify-center relative border-2 border-gray-600 bg-primary ${
              filled ? "border-solid" : "border-dashed]"
            }`}
          >
            <LoyaltyStamp filled={filled} size={32} />

            {!filled && (
              <span className="text-[8px] text-background absolute bottom-[3px] right-[4px]">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
