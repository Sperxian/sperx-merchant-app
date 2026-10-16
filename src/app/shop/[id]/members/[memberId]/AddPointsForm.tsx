"use client";

import { addMemberLoyaltyPoints } from "@/src/lib/api/member";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { useState, type FormEvent } from "react";

type Props = {
  shopId: string;
  memberId: string;
  onRefresh: () => void;
  onClose: () => void;
};

export default function AddPointsForm({
  shopId,
  memberId,
  onRefresh,
  onClose,
}: Props) {
  const DEFAULT_NOTES = "Manually added by admin.";
  const [points, setPoints] = useState("1");
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const pointsToAdd = Number(points);
    if (!Number.isSafeInteger(pointsToAdd) || pointsToAdd < 1) {
      setValidationError("Enter a positive whole number of points.");
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationError(undefined);
      await addMemberLoyaltyPoints(
        shopId,
        memberId,
        pointsToAdd,
        notes.trim() || DEFAULT_NOTES,
      );
      onRefresh();
      toastSuccess("Member points have been added successfully.");
      onClose();
    } catch (error) {
      toastError(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-[260px] h-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Points
          <input
            type="number"
            min="1"
            step="1"
            required
            disabled={isSubmitting}
            value={points}
            onChange={(event) => {
              setPoints(event.target.value);
              setValidationError(undefined);
            }}
            className="w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Notes
          <input
            type="text"
            disabled={isSubmitting}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
          />
        </label>

        {validationError && (
          <p role="alert" className="text-sm text-red-600">
            {validationError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary py-3 text-md font-medium uppercase tracking-wide text-primary-foreground transition-all disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Adding points..." : "Add points"}
      </button>
    </form>
  );
}
