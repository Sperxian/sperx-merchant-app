"use client";

import { LoyaltyProgram } from "@/src/lib/types";
import { createContext, ReactNode, useContext } from "react";

type LoyaltyProgramContextType = {
  value: LoyaltyProgram | null;
};

const LoyaltyProgramContext = createContext<
  LoyaltyProgramContextType | undefined
>(undefined);

export const LoyaltyProgramContextProvider = ({
  value,
  children,
}: {
  value: LoyaltyProgram;
  children: ReactNode;
}) => {
  return (
    <LoyaltyProgramContext.Provider value={{ value }}>
      {children}
    </LoyaltyProgramContext.Provider>
  );
};

export const useLoyaltyProgram = (): LoyaltyProgram => {
  const context = useContext(LoyaltyProgramContext);

  if (!context || !context.value) {
    throw new Error(
      "useLoyaltyProgram must be used within a LoyaltyProgramContextProvider",
    );
  }

  return context.value;
};
