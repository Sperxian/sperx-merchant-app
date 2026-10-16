import { MemberLoyaltyDto } from "@/src/types/member";
import { UserIcon } from "lucide-react";

type CustomerSectionProps = {
  customer: MemberLoyaltyDto;
};

export function CustomerSection({ customer }: CustomerSectionProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">Customer</p>
      <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-lighter">
            <UserIcon />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-800 dark:text-slate-100">{customer.id}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {`Member since ${customer.dateCreated}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
