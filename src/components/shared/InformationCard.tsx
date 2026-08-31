type CardDataEntry = {
  label: string;
  value: string;
};

export default function InformationCard({
  entries,
}: {
  entries: CardDataEntry[];
}) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-foreground/40 bg-background/30 shadow-sm">
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="text-sm">{entry.label}</div>
          <div className="text-md font-bold">{entry.value}</div>
        </div>
      ))}
    </div>
  );
}
