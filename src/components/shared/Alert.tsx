import {
  TriangleAlertIcon,
  CircleXIcon,
  CheckCircleIcon,
  InfoIcon,
} from "lucide-react";

type Variant = "warning" | "error" | "success" | "info";

const variantConfig = {
  warning: {
    container: "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    iconBg: "bg-amber-500",
    Icon: TriangleAlertIcon,
  },
  error: {
    container: "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    iconBg: "bg-rose-500",
    Icon: CircleXIcon,
  },
  success: {
    container: "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-500",
    Icon: CheckCircleIcon,
  },
  info: {
    container: "border-primary/30 bg-primary/5 text-primary dark:text-primary-lighter",
    iconBg: "bg-primary",
    Icon: InfoIcon,
  },
};

type AlertProps = {
  message: string;
  variant?: Variant;
  className?: string;
};

export function Alert({
  message,
  variant = "warning",
  className = "",
}: AlertProps) {
  const { container, iconBg, Icon } = variantConfig[variant];

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium",
        container,
        className,
      ].join(" ")}
    >
      <div className={`aspect-square rounded-lg p-1.5 ${iconBg}`}>
        <Icon className="text-white" />
      </div>

      <span>{message}</span>
    </div>
  );
}