"use client";

import { useEffect } from "react";
import { useShop } from "../ShopContext";
import { getMembers } from "@/src/lib/api/member";

export default function MembersPage() {
  const shop = useShop();

  useEffect(() => {
    async function fetchMembers() {
      const data = await getMembers(shop.id);
      console.log({ data });
    }

    fetchMembers();
  }, [shop]);

  return <div>Members Page</div>;
}
