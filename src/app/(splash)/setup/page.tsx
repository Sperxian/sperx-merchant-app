"use client";

import "@/src/app/globals.css";
import { Alert } from "@/src/components/shared/Alert";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
// import {
//   CreditCard,
//   CreditCardIcon,
//   ListCheckIcon,
//   StoreIcon,
// } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReactNode, useState } from "react";

const steps = ["Shop", "Loyalty Program", "Review"];

export default function SetupPage() {
  const steps = [
    {
      id: "shop",
      title: "Shop",
      description: "Set up your shop details.",
      content: (
        <div className="space-y-4">
          <div className="h-10 rounded-lg border bg-gray-50" />
          <div className="h-10 rounded-lg border bg-gray-50" />
          <div className="h-10 rounded-lg border bg-gray-50" />
        </div>
      ),
    },
    {
      id: "loyalty",
      title: "Loyalty Program",
      description: "Configure your loyalty program.",
      content: (
        <div className="rounded-lg border border-dashed p-8 text-center">
          Loyalty program fields go here.
        </div>
      ),
    },
    {
      id: "review",
      title: "Review",
      description: "Review everything before submitting.",
      content: (
        <div className="rounded-lg bg-gray-50 p-6">
          Review information goes here.
        </div>
      ),
    },
  ];

  const [shopName, setShopName] = useState("");
  const [loyaltyProgramName, setLoyaltyProgramName] = useState<string>();
  const [goalPoints, setGoalPoints] = useState<number>(10);
  const [rewardName, setRewardName] = useState<string>("Free Item");
  const [rewardDescription, setRewardDescription] = useState<string>(
    "You get a free item once you get 8 points.",
  );

  const defaultLoyaltyProgramName = `${shopName} Loyalty`;

  return (
    <div className="flex flex-col items-center justify-between gap-8 w-full h-full py-8 m-auto relative">
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/5" />

      <MultiStepForm
        steps={steps}
        onSubmit={async (data) => {
          console.log("Submit:", data);
        }}
      >
        <div className="flex flex-col items-center p-6">
          <div className="w-full md:max-w-lg">
            <div className="text-xl font-medium text-foreground w-full mb-4">
              Welcome to SperX!
            </div>

            <span className="text-body text-sm">
              We're excited to have you. Let's get started by setting up your
              shop and loyalty program.
            </span>

            <div className="pt-12 pb-6 flex flex-col items-center">
              <label
                htmlFor="shopName"
                className="mb-2 block text-lg font-medium text-foreground"
              >
                What's the name of your shop?
              </label>

              <input
                id="shopName"
                name="shopName"
                type="text"
                placeholder="Your Shop's Name"
                className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-lg text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-6">
          <div className="w-full">
            <div className="text-xl font-medium text-foreground w-full mb-4">
              Your First Loyalty Program
            </div>

            <span className="text-body text-sm pb-4">
              Most shops use the following default settings for their loyalty
              program. Feel free to customize them base on your business needs.
              You can always adjust these later.
            </span>

            <div className="h-px w-full bg-foreground/10 mt-4 mb-6" />

            <div className="flex flex-col w-full items-start gap-4">
              <div className="flex w-full">
                <input
                  id="loyaltyProgramName"
                  name="loyaltyProgramName"
                  type="text"
                  placeholder="Your Loyalty Program's Name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-md text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={loyaltyProgramName}
                  onChange={(e) => setLoyaltyProgramName(e.target.value)}
                  defaultValue={defaultLoyaltyProgramName}
                />
              </div>

              <div className="w-full flex flex-col gap-4 md:flex-row md:mt-8">
                {/* Loyalty Program Form */}
                <div className="w-full md:w-2/5 flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="goalPoints"
                      className="mb-2 block font-medium text-foreground"
                    >
                      How many points to claim reward?
                    </label>

                    <input
                      id="goalPoints"
                      name="goalPoints"
                      type="number"
                      placeholder="Goal Points"
                      className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-right"
                      value={goalPoints}
                      onChange={(e) => setGoalPoints(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="rewardName"
                      className="mb-2 block font-medium text-foreground"
                    >
                      Reward Name
                    </label>

                    <input
                      id="rewardName"
                      name="rewardName"
                      type="text"
                      placeholder="Reward Name"
                      className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      value={rewardName}
                      onChange={(e) => setRewardName(e.target.value)}
                      defaultValue="Free Item"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="rewardDescription"
                      className="mb-2 block font-medium text-foreground"
                    >
                      Reward Description
                    </label>

                    <textarea
                      id="rewardDescription"
                      name="rewardDescription"
                      placeholder="Reward Description"
                      className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      value={rewardDescription}
                      onChange={(e) => setRewardDescription(e.target.value)}
                      defaultValue="You get a free item once you get 8 points."
                    />
                  </div>
                </div>

                {/* Loyalty Card */}
                <div className="w-full md:w-3/5">
                  <LoyaltyCard
                    current={Math.max(Math.floor(goalPoints * 0.8), 1)}
                    loyaltyProgram={{
                      name: loyaltyProgramName ?? defaultLoyaltyProgramName,
                      type: "STAMP_BASED",
                      config: {
                        stampIcon: "milk_tea",
                        availableRewards: [
                          {
                            code: "XXXX",
                            name: rewardName ?? "",
                            description: rewardDescription,
                            goalPoints: goalPoints,
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MultiStepForm>
    </div>
  );
}

// // // // // // // // // // // // // //

type Step<T = unknown> = {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  validate?: (data: T) => boolean | Promise<boolean>;
};

type MultiStepFormProps<T> = {
  steps: Step<T>[];
  initialStep?: number;
  initialData?: T;
  onStepChange?: (step: number) => void;
  onSubmit?: (data: T) => void | Promise<void>;
  children: ReactNode;
};

export function MultiStepForm<T>({
  steps,
  initialStep = 0,
  initialData,
  onStepChange,
  onSubmit,
  children,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [data, setData] = useState<T>(initialData as T);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forms = React.Children.toArray(children);
  const form = forms[currentStep] as React.ReactNode;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const goToStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;

    setCurrentStep(index);
    onStepChange?.(index);
  };

  const next = async () => {
    // if (step.validate) {
    //   const valid = await step.validate(data);

    //   if (!valid) return;
    // }

    if (isLastStep) {
      if (!onSubmit) return;

      try {
        setIsSubmitting(true);
        await onSubmit(data);
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    goToStep(currentStep + 1);
    console.log({ currentStep, isFirstStep });
  };

  const back = () => {
    console.log({ currentStep, isFirstStep });
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  };

  console.log({ currentStep, isFirstStep });

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      {/* Stepper */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      {/* Content */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* <div className="border-b border-gray-200 px-6 py-5">
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>

          <h1 className="mt-1 text-xl font-semibold text-gray-900">
            {step.title}
          </h1>

          {step.description && (
            <p className="mt-1 text-sm text-gray-500">{step.description}</p>
          )}
        </div> */}

        <div className="min-h-[300px]">{form}</div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={back}
            disabled={isFirstStep || isSubmitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={next}
            disabled={isSubmitting}
            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Submitting..."
              : isLastStep
                ? "Submit"
                : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

type StepIndicatorProps<T> = {
  steps: Step<T>[];
  currentStep: number;
  onStepClick: (index: number) => void;
};

function StepIndicator<T>({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps<T>) {
  return (
    <div className="mb-10">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
            >
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className="flex items-center gap-3"
              >
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "text-sm font-semibold transition-colors",
                    isActive || isCompleted
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-500",
                  ].join(" ")}
                >
                  {isCompleted ? "✓" : index + 1}
                </span>

                <span
                  className={[
                    "hidden text-sm font-medium sm:block",
                    isActive ? "text-black" : "text-gray-500",
                  ].join(" ")}
                >
                  {step.title}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-4 h-px flex-1",
                    index < currentStep ? "bg-black" : "bg-gray-200",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
