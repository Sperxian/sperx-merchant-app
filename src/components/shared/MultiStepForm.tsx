import type { ReactNode } from "react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ActionButton } from "@/src/components/shared/ActionButton";

export type StepMetadata<T = unknown> = {
  title: string;
  icon?: LucideIcon;
  validate?: (data: T) => boolean | Promise<boolean>;
};

type MultiStepFormProps<T> = {
  stepsMetadata: StepMetadata<T>[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onSubmit?: () => void | Promise<void>;
  children: ReactNode;
};

export function MultiStepForm<T>({
  stepsMetadata: steps,
  initialStep = 0,
  onStepChange,
  onSubmit,
  children,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forms = children
    ? Array.isArray(children)
      ? children
      : [children]
    : [];
  const form = forms[currentStep] as ReactNode;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const goToStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;

    setCurrentStep(index);
    onStepChange?.(index);
  };

  const next = async () => {
    if (!isLastStep) {
      goToStep(currentStep + 1);

      return;
    }

    if (!onSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const back = () => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="flex min-h-[300px] items-center p-5 sm:p-7">{form}</div>

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 dark:border-white/10 sm:px-7">
          <button
            type="button"
            onClick={back}
            disabled={isFirstStep || isSubmitting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Back
          </button>

          <ActionButton
            onClick={next}
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl px-5 py-2.5 text-sm"
          >
            {isSubmitting
              ? "Submitting..."
              : isLastStep
                ? "Submit"
                : "Continue"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

type StepIndicatorProps<T> = {
  steps: StepMetadata<T>[];
  currentStep: number;
  onStepClick: (index: number) => void;
};

export function StepIndicator<T>({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps<T>) {
  return (
    <div className="mb-4 md:mb-10">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={index}
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
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400",
                  ].join(" ")}
                >
                  {StepIcon ? (
                    <StepIcon />
                  ) : (
                    <span>{isCompleted ? "✓" : index + 1}</span>
                  )}
                </span>

                <span
                  className={[
                    "text-sm",
                    index <= currentStep
                      ? "font-semibold text-primary dark:text-primary-lighter"
                      : "font-medium text-slate-400 dark:text-slate-500",
                  ].join(" ")}
                >
                  {step.title}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-4 flex-1",
                    index < currentStep
                      ? "h-0.75 bg-primary dark:bg-primary-lighter"
                      : "h-px bg-slate-200 dark:bg-white/10",
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
