import { CoffeeCup } from "./CoffeeCup";

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
            className={`aspect-square rounded-[9px] flex items-center justify-center relative ${
              filled
                ? "border-[1.5px] border-[#a76eff]/40 bg-[rgba(120,50,200,0.28)]"
                : "border-[1.5px] border-[#c8a0ff]/25 border-dashed bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <CoffeeCup filled={filled} size={32} />

            {!filled && (
              <span className="text-[8px] text-[#c8a0ff]/20 absolute bottom-[3px] right-[4px]">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}