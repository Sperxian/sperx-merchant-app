import { MemberLoyaltyDto } from "@/src/types/member";
import { UserIcon } from "lucide-react";

type CustomerSectionProps = {
  customer: MemberLoyaltyDto;
};

export function CustomerSection({ customer }: CustomerSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">Customer</p>
      <div className=" bg-background border border-primary/50 rounded-2xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white text-md font-medium flex-shrink-0">
            <UserIcon />
          </div>

          <div>
            <p className="text-foreground text-xs">{customer.id}</p>
            <p className="text-foreground/50 text-xs">
              {`Member since ${customer.dateCreated}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
