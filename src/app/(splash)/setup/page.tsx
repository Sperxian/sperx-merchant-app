"use client";

import "@/src/app/globals.css";
// import {
//   CreditCard,
//   CreditCardIcon,
//   ListCheckIcon,
//   StoreIcon,
// } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const steps = ["Shop", "Loyalty Program", "Review"];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-between gap-8 w-full h-full sm:mt-[64px] py-8 m-auto relative"
    >
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/5" />

      {/* <div className="flex flex-col items-center gap-8 w-[80%] max-w-[800px] border border-foreground/20 rounded-lg p-8 bg-background/30 shadow-sm">
        <div className="flex flex-col items-center gap-8">
          <Image
            className="aspect-square object-cover animate-pulse"
            src={"/sperx-logo.png"}
            alt="Sperx"
            width={120}
            height={120}
            priority
          />
          {"defaultSlot goes here"}
        </div>

        <ol className="flex items-center w-full text-sm font-medium text-center text-body sm:text-base">
          <li className="flex md:w-full items-center text-fg-brand sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-default after:border-px after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-fg-disabled">
              <StoreIcon size={16} className="me-2" />
              Shop
            </span>
          </li>
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-default after:border-px after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-fg-disabled">
              <CreditCardIcon size={16} className="me-2" />
              Loyalty
            </span>
          </li>
          <li className="flex items-center">
            <ListCheckIcon size={16} className="me-2" />
            Review
          </li>
        </ol>
      </div> */}

      <div className="mx-auto w-full sm:max-w-4xl max-w-full sm:px-1 px-6 py-10">
        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentStep(index)}
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
                      {step}
                    </span>
                  </button>

                  {/* Connector */}
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

        {/* Form card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-5">
            <p className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </p>

            <h1 className="mt-1 text-xl font-semibold text-gray-900">
              {steps[currentStep]}
            </h1>
          </div>

          {/* Step content */}
          <div className="min-h-[300px] p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium">Shop Details</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Placeholder content for the shop step.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <PlaceholderField label="Shop Name" />
                  <PlaceholderField label="Shop Category" />
                  <PlaceholderField label="Address" />
                  <PlaceholderField label="Contact Number" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium">Loyalty Program</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Placeholder content for configuring your loyalty program.
                  </p>
                </div>

                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Loyalty program configuration
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Your actual loyalty program fields go here.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium">Review</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Review your information before submitting.
                  </p>
                </div>

                <div className="space-y-3">
                  <ReviewRow label="Shop" value="Placeholder Shop" />
                  <ReviewRow
                    label="Loyalty Program"
                    value="Placeholder Program"
                  />
                  <ReviewRow label="Status" value="Ready to submit" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={isFirstStep}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
              text-gray-700 transition hover:bg-gray-50
              disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white
              transition hover:bg-gray-800"
            >
              {isLastStep ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* {actionSlot && (
        <div className="flex flex-col items-center w-full p-8 gap-4 bottom-16">
          {actionSlot}
        </div>
      )} */}
    </div>
  );
}

function PlaceholderField({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="h-10 rounded-lg border border-gray-300 bg-gray-50" />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
