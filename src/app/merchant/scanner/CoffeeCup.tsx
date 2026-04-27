interface CoffeeCupProps {
  filled: boolean;
  size?: number;
}

export function CoffeeCup({ filled, size = 20 }: CoffeeCupProps) {
  const col = filled ? "#ffb800" : "rgba(200,160,255,0.28)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 7h9l-1.2 7H5.2L4 7Z" fill={col} />
      <path
        d="M13 9h1.5a1.5 1.5 0 0 1 0 3H13"
        stroke={col}
        strokeWidth="1.1"
      />
      <rect x="3" y="15" width="11" height="1.5" rx="0.75" fill={col} />
      <path
        d="M7 5.5 Q7.5 4.5 7 3.5M9.5 5.5 Q10 4.5 9.5 3.5"
        stroke={col}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
