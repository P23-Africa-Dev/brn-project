import React from "react";
import { twMerge } from "tailwind-merge";

interface StepTopContentProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  steps?: string[];
  currentStep?: number;
  headingClassName?: string;
  containerClassName?: string;
  spanElement?: React.ReactNode;
}

const StepTopContent: React.FC<StepTopContentProps> = ({
  title,
  description,
  steps,
  currentStep,
  children,
  headingClassName,
  containerClassName,
  spanElement,
}) => (
  <div
    className={twMerge("px-4 lg:px-0 w-[400px] mx-auto", containerClassName)}
  >
    <div className="pl-10 xl:pl-0">
      <h3
        className={twMerge(
          "max-w-[240px] leading-12 text-3xl md:text-4xl font-semibold text-secondary mb-3",
          headingClassName
        )}
      >
        {title}
        {spanElement && (
          <span className="font-semibold">
            {" "}
            <br /> {spanElement}
          </span>
        )}
      </h3>

      <p className="text-sm text-secondary font-extralight mb-6 max-w-sm pr-32">
        {description}
      </p>
    </div>

    {/* Step Indicator */}
    <div className="flex items-center space-x-3 mb-2 pl-10 xl:pl-0">
      {steps?.map((_, index) => {
        const stepNumber = index + 1;
        return (
          <button
            key={stepNumber}
            disabled
            className={`block w-10 h-10 border-2 rounded-full border-white text-sm font-semibold ${
              currentStep && currentStep >= stepNumber
                ? "bg-white text-primary"
                : "bg-transparent"
            }`}
          >
            {stepNumber}
          </button>
        );
      })}
    </div>

    {/* Step Counter */}

    {currentStep && (
      <div className="text-sm font-extralight pl-10 xl:pl-0">
        Step {currentStep}/{steps?.length}
      </div>
    )}

    {children}
  </div>
);

export default StepTopContent;
