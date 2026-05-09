import { LoyaltyStamp } from "./LoyaltyStamp";

interface StampGridProps {
  total: number;
  collected: number;
}

export function StampGrid({ total, collected }: StampGridProps) {
  /**
   * - <= 6 stamps => 1 row
   * - > 6 stamps => multiple rows
   */
  // NOTE: MAX number of stamps should be 15

  const MAX_ITEMS_PER_ROW = 5;
  const rows = Math.ceil(total / MAX_ITEMS_PER_ROW);
  const columns = Math.ceil(total / rows);

  const maxHeight = rows === 1 ? "96px" : rows === 2 ? "72px" : "48px";

  return (
    <div
      className="grid gap-2 justify-center"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(12px, ${maxHeight}))`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < collected;

        return (
          <div
            key={i}
            className={`aspect-square rounded-xl min-h-12x flex items-center justify-center relative ${
              filled
                ? "border-2 border-primary-lighter bg-primary-light"
                : "border-2 border-primary-lighter border-dashed bg-primary-darker/20"
            }`}
          >
            <LoyaltyStamp filled={filled} size={32} />

            {!filled && (
              <span className="text-[8px] text-white absolute bottom-1 right-1">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function OldStampGrid({ total, collected }: StampGridProps) {
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
