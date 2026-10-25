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
          className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
          key={title}
        >
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex flex-col gap-0">
              <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
            </div>
            <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}