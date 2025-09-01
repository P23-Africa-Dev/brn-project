'use client';

import images from '@/constants/image';

type StepMeta = {
    title: string;
    description: string;
    headingClassName?: string;
    paragraphClassName?: string;
};

type MobileTopContentProps = {
    step?: number; // optional, only used if steps are provided
    steps?: string[]; // optional
    content: StepMeta | StepMeta[]; // can be single or array
};

export default function MobileTopContent({ step, steps, content }: MobileTopContentProps) {
    const isMultiStep = Array.isArray(content) && steps && step !== undefined;

    // Pick correct content
    const currentContent = isMultiStep ? content[step - 1] : (content as StepMeta);

    if (!currentContent) return null;

    return (
        <div className="h-[300px] md:hidden">
            <div className="relative z-0 h-screen">
                <img src={images.mobilePattern} className="absolute h-auto w-full object-contain" alt="" />

                {/* Top content */}
                <div className="absolute top-5 left-10 py-2">
                    <div className="bg-transparent">
                        <h2 className={`mb-3 ${currentContent.headingClassName}`}>{currentContent.title}</h2>
                        <p className={currentContent.paragraphClassName}>{currentContent.description}</p>
                    </div>

                    {/* Stepper */}
                    {isMultiStep && (
                        <>
                            <div className="mt-5 flex items-center space-x-3 pb-1 xl:pl-0">
                                {steps.map((_, index) => {
                                    const stepNumber = index + 1;
                                    const isActive = step >= stepNumber;

                                    return (
                                        <span
                                            key={stepNumber}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold sm:h-10 sm:w-10 md:text-sm ${
                                                isActive ? 'bg-white text-primary' : 'bg-transparent text-white'
                                            }`}
                                        >
                                            {stepNumber}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="text-sm font-extralight text-white">
                                Step {step}/{steps.length}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
