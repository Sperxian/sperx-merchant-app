import Image from "next/image";

export function AppHeader() {
  const shopName = "Café Barako";
  const loyaltyProgramName = "Member Loyalty Program";
  const iconLocation = "/barako-cafe/icon.svg";

  return (
    <header className="flex items-center gap-3 bg-primary px-4 py-3 flex-shrink-0">
      <Image
        className="dark:invert bg-white rounded-full object-cover"
        src={iconLocation}
        alt={shopName}
        width={36}
        height={36}
        priority
      />
      <div>
        <h1 className="text-white text-xl font-medium leading-tight">
          {shopName}
        </h1>

        <p className="text-white/50 text-xs leading-tight">
          {loyaltyProgramName}
        </p>
      </div>
    </header>
  );
}
