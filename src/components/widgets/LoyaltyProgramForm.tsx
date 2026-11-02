"use client";

import type { Dispatch, SetStateAction } from "react";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import LoyaltyStampIconPicker from "@/src/components/widgets/LoyaltyStampIconPicker";
import type { IconName } from "@/src/app/shop/[id]/scanner/components/LoyaltyStamp";
import type {
  LoyaltyProgramConfig,
  LoyaltyProgramType,
  StampBasedConfig,
  WalletBasedConfig,
} from "@/src/types/loyalty";
import { ArrowBigRightDashIcon } from "lucide-react";

export type LoyaltyProgramInput = {
  loyaltyProgramName: string;
  type: LoyaltyProgramType;
  config: LoyaltyProgramConfig;
};

function updateFirstReward(
  program: LoyaltyProgramInput,
  update: (
    reward: LoyaltyProgramInput["config"]["availableRewards"][number],
  ) => LoyaltyProgramInput["config"]["availableRewards"][number],
): LoyaltyProgramInput {
  const availableRewards = program.config.availableRewards.map(
    (reward, index) => (index === 0 ? update(reward) : reward),
  );

  return { ...program, config: { ...program.config, availableRewards } };
}

type LoyaltyProgramFormProps = {
  loyaltyProgramInput: LoyaltyProgramInput;
  setLoyaltyProgramInput: Dispatch<SetStateAction<LoyaltyProgramInput>>;
};

export default function LoyaltyProgramForm({
  loyaltyProgramInput,
  setLoyaltyProgramInput,
}: LoyaltyProgramFormProps) {
  const reward = loyaltyProgramInput.config.availableRewards[0];
  if (!reward) {
    throw new Error("Loyalty program has no configured reward.");
  }

  const isStampBased = loyaltyProgramInput.type === "STAMP_BASED";

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full">
          {isStampBased && (
            <LoyaltyStampIconPicker
              stampIcon={
                (loyaltyProgramInput.config as StampBasedConfig)
                  .stampIcon as IconName
              }
              onChange={(icon) =>
                setLoyaltyProgramInput((previous) => {
                  if (previous.type !== "STAMP_BASED") return previous;
                  return {
                    ...previous,
                    config: { ...previous.config, stampIcon: icon },
                  };
                })
              }
            />
          )}
          <input
            id="loyaltyProgramName"
            name="loyaltyProgramName"
            type="text"
            placeholder="Your Loyalty Program's Name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            value={loyaltyProgramInput.loyaltyProgramName}
            onChange={(event) =>
              setLoyaltyProgramInput((previous) => ({
                ...previous,
                loyaltyProgramName: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex w-full flex-col gap-4 md:mt-8 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-2/5">
            {loyaltyProgramInput.type === "WALLET_BASED" && (
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Spend Amount to Points Conversion
                </label>

                <div className="flex flex-row items-center justify-between">
                  <input
                    id="convertibleAmountCents"
                    name="convertibleAmountCents"
                    type="number"
                    min={1}
                    step={1}
                    value={
                      (loyaltyProgramInput.config as WalletBasedConfig)
                        .convertibleAmountCents
                    }
                    onChange={(event) =>
                      setLoyaltyProgramInput((previous) =>
                        previous.type === "WALLET_BASED"
                          ? {
                              ...previous,
                              config: {
                                ...previous.config,
                                convertibleAmountCents: Number(
                                  event.target.value,
                                ),
                              },
                            }
                          : previous,
                      )
                    }
                    placeholder="Amount convertible to points"
                    className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-right text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="px-2">
                    <ArrowBigRightDashIcon size={20} color="white" />
                  </span>
                  <input
                    id="pointsAwarded"
                    name="pointsAwarded"
                    type="number"
                    min={1}
                    step={1}
                    value={
                      (loyaltyProgramInput.config as WalletBasedConfig)
                        .pointsAwarded
                    }
                    onChange={(event) =>
                      setLoyaltyProgramInput((previous) =>
                        previous.type === "WALLET_BASED"
                          ? {
                              ...previous,
                              config: {
                                ...previous.config,
                                pointsAwarded: Number(event.target.value),
                              },
                            }
                          : previous,
                      )
                    }
                    placeholder="Points Awarded"
                    className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-right text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor="goalPoints"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                How many points to claim reward?
              </label>
              <input
                id="goalPoints"
                name="goalPoints"
                type="number"
                placeholder="Goal Points"
                className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                value={reward.goalPoints}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) =>
                    updateFirstReward(previous, (previousReward) => ({
                      ...previousReward,
                      goalPoints: Number(event.target.value),
                    })),
                  )
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="rewardName"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Reward Name
              </label>
              <input
                id="rewardName"
                name="rewardName"
                type="text"
                placeholder="Reward Name"
                className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                value={reward.name}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) =>
                    updateFirstReward(previous, (previousReward) => ({
                      ...previousReward,
                      name: event.target.value,
                    })),
                  )
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="rewardDescription"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Reward Description
              </label>
              <textarea
                id="rewardDescription"
                name="rewardDescription"
                placeholder="Reward Description"
                className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                value={reward.description ?? ""}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) =>
                    updateFirstReward(previous, (previousReward) => ({
                      ...previousReward,
                      description: event.target.value,
                    })),
                  )
                }
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center md:w-3/5">
            <div className="max-w-[350px] w-[90%] min-w-[300px] max-h-[250px]">
              <LoyaltyCard
                current={Math.max(Math.floor(reward.goalPoints * 0.8), 1)}
                loyaltyProgram={{
                  name: loyaltyProgramInput.loyaltyProgramName,
                  type: loyaltyProgramInput.type,
                  config: loyaltyProgramInput.config,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
