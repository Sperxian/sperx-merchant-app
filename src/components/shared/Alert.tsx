import {
  TriangleAlertIcon,
  CircleXIcon,
  CheckCircleIcon,
  InfoIcon,
} from "lucide-react";

type Variant = "warning" | "error" | "success" | "info";

const variantConfig = {
  warning: {
    container: "border-amber-600 bg-amber-600/10 text-amber-600",
    iconBg: "bg-amber-600",
    Icon: TriangleAlertIcon,
  },
  error: {
    container: "border-red-600 bg-red-600/10 text-red-600",
    iconBg: "bg-red-600",
    Icon: CircleXIcon,
  },
  success: {
    container: "border-green-600 bg-green-600/10 text-green-600",
    iconBg: "bg-green-600",
    Icon: CheckCircleIcon,
  },
  info: {
    container: "border-blue-600 bg-blue-600/10 text-blue-600",
    iconBg: "bg-blue-600",
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
        "border border-2 rounded-2xl py-2 px-2 flex items-center gap-4 text-sm font-medium",
        container,
        className,
      ].join(" ")}
    >
      <div className={`aspect-square p-1.5 rounded-lg ${iconBg}`}>
        <Icon className="text-white" />
      </div>

      <span>{message}</span>
    </div>
  );
}