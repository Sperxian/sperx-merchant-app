import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map(({ label, href, icon: Icon }, index) => {
          const isCurrent = index === items.length - 1;
          const content = (
            <span
              className={`inline-flex items-center text-sm font-medium transition-colors ${
                isCurrent
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary-lighter"
              }`}
            >
              {Icon ? <Icon size={16} className="mr-2" /> : null}
              {label}
            </span>
          );

          return (
            <li
              key={`${label}-${index}`}
              aria-current={isCurrent ? "page" : undefined}
              className="inline-flex items-center"
            >
              {index > 0 ? (
                <ChevronRight size={16} className="mr-1.5 text-slate-400 dark:text-slate-600" />
              ) : null}
              {href && !isCurrent ? <Link href={href}>{content}</Link> : content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}