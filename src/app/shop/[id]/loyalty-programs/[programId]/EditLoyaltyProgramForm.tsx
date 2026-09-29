"use client";

import { useState } from "react";
import { UndoIcon } from "lucide-react";
import LoyaltyProgramForm, {
  type LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";

export default function EditLoyaltyProgramForm({
  initialValue,
}: {
  initialValue: LoyaltyProgramInput;
}) {
  const [loyaltyProgram, setLoyaltyProgram] = useState(initialValue);

  return (
    <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md: rounded-3xl border border-white/30 p-4 shadow-2xl sm:p-6 lg:p-8 gap-4">
      <LoyaltyProgramForm
        loyaltyProgramInput={loyaltyProgram}
        setLoyaltyProgramInput={setLoyaltyProgram}
      />
      <hr className="border-foreground/20" />
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <button
          onClick={() => void 0}
          className="bg-primary text-white text-md font-medium p-6 py-2 rounded-lg tracking-wide transition-all active:scale-95 hover:bg-secondary md:order-2"
        >
          Save
        </button>
        <button
          onClick={() => void 0}
          className="w-full inline-flex justify-center gap-2 md:order-1 md:w-fit text-md font-medium p-6 py-2 rounded-lg border border-gray-300"
        >
          <UndoIcon />
          <span>Discard Changes</span>
        </button>
      </div>
    </div>
  );
}
