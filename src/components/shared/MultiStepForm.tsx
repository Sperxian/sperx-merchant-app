import type { ReactNode } from "react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

export type StepMetadata<T = unknown> = {
  title: string;
  icon?: LucideIcon;
  validate?: (data: T) => boolean | Promise<boolean>;
};

type MultiStepFormProps<T> = {
  stepsMetadata: StepMetadata<T>[];
  initialStep?: number;
  initialData?: T;
  onStepChange?: (step: number) => void;
  onSubmit?: (data: T) => void | Promise<void>;
  children: ReactNode;
};

export function MultiStepForm<T>({
  stepsMetadata: steps,
  initialStep = 0,
  initialData,
  onStepChange,
  onSubmit,
  children,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [data] = useState<T>(initialData as T);
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
  };

  const back = () => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 bg-background">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="min-h-[300px] flex items-center p-6">{form}</div>

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={back}
            disabled={isFirstStep || isSubmitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={next}
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primary-lighter cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                      : "bg-gray-100 text-gray-500",
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
                      ? "text-primary dark:text-primary-lighter font-bold"
                      : "text-foreground/50 font-medium",
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
                      : "h-px bg-primary-dark dark:bg-primary",
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
