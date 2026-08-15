"use client";

import { useEffect, useMemo, useState } from "react";
import { useShop } from "../ShopContext";
import { getMembers } from "@/src/lib/api/member";
import { createColumnHelper } from "@tanstack/react-table";
import { MemberSummary } from "@/src/lib/types";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import DataTable from "@/src/components/shared/DataTable";
import { CheckIcon } from "lucide-react";

const columnHelper = createColumnHelper<MemberSummary>();

export default function MembersPage() {
  const shop = useShop();
  const [members, setMembers] = useState<MemberSummary[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Member ID",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("points", {
        header: () => <div className="flex justify-end">Points</div>,
        cell: (info) => (
          <div className="flex justify-end">
            <span className="font-medium">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("identityId", {
        header: "Registered?",
        cell: (info) =>
          info.getValue() && (
            <div className="flex justify-center">
              <CheckIcon className="h-4 w-4 text-green-500" />
            </div>
          ),
      }),
      columnHelper.accessor("loyaltyProgramName", {
        header: "Loyalty Program",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("dateCreated", {
        header: "Date Started",
        cell: (info) => formatDateTime(info.getValue()),
      }),
      columnHelper.accessor("guestId", {
        header: "Guest ID",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
    ],
    [],
  );

  useEffect(() => {
    async function fetchMembers() {
      const data = await getMembers(shop.id, page, pageSize);

      setMembers(data.items);
      setTotalRows(data.total);
    }

    fetchMembers();
  }, [shop, page, pageSize]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary mb-4">Members</h1>

      <DataTable
        columns={columns}
        rows={members}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
