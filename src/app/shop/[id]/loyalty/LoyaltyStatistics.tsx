type StatisticSummaryItem = {
  title: string;
  description: string;
  value: number | string;
};

type LoyaltyStatisticsProps = {
  items: StatisticSummaryItem[];
};

export default function LoyaltyStatistics({ items }: LoyaltyStatisticsProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {items.map(({ title, description, value }) => (
        <div
          className="flex-1 rounded-lg border border-foreground/40 bg-background/30 p-4"
          key={title}
        >
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex flex-col gap-0">
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
              <p className="text-xs text-foreground/50">{description}</p>
            </div>
            <h1 className="text-3xl font-bold text-primary">
              {typeof value === "number" ? value.toLocaleString() : value}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
