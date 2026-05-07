"use client";

import { Shop } from "@/src/lib/types";
import { createContext, ReactNode, useContext } from "react";

type ShopContextType = {
  value: Shop | null;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopContextProvider = ({
  value,
  children,
}: {
  value: Shop;
  children: ReactNode;
}) => {
  return (
    <ShopContext.Provider value={{ value }}>{children}</ShopContext.Provider>
  );
};

export const useShop = (): Shop => {
  const context = useContext(ShopContext);

  if (!context || !context.value) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }

  return context.value;
};
