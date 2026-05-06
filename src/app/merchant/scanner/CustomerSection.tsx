import { MemberLoyalty } from "@/src/lib/types";
import { UserIcon } from "lucide-react";

type CustomerSectionProps = {
  customer: MemberLoyalty;
};

export function CustomerSection({ customer }: CustomerSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">Customer</p>
      <div className="bg-white border border-primary/50 rounded-2xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white text-md font-medium flex-shrink-0">
            <UserIcon />
          </div>

          <div>
            <p className="text-foreground text-[16px] font-medium leading-tight mb-1">
              {customer.name}
            </p>
            <p className="text-foreground/50 text-xs">{customer.id}</p>
            <p className="text-foreground/50 text-xs">
              {`Member since ${customer.dateCreated}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
