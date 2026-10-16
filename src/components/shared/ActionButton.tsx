import type { ButtonHTMLAttributes } from "react";

type ActionButtonVariant = "primary" | "outline" | "neutral";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionButtonVariant;
};

const variantStyles: Record<ActionButtonVariant, string> = {
  primary: "bg-primary text-white uppercase shadow-sm hover:bg-primary-dark",
  outline:
    "border-2 border-primary bg-transparent text-primary uppercase hover:bg-primary hover:text-white dark:border-primary-lighter dark:text-primary-lighter dark:hover:bg-primary-lighter dark:hover:text-primary-darkest",
  neutral:
    "border border-slate-200 bg-white/80 text-slate-600 uppercase hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
};

function getActionClasses(
  variant: ActionButtonVariant | undefined,
  className: string | undefined,
) {
  return `inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant ?? "primary"]} ${className ?? ""}`;
}

export function ActionButton(props: ActionButtonProps) {
  const { children, variant, className, ...buttonProps } = props;

  return (
    <button
      type="button"
      className={getActionClasses(variant, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
