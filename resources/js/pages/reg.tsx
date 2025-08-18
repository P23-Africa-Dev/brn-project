import { useState } from 'react';
import LoadingState from '@/components/LoadingState';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';
import Step4 from '@/components/Step4';
import './styles.css';

// Define a type for the step numbers
type Step = 1 | 2 | 3 | 4 | 5;

function App() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState({});

    const nextStep = (data: any) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        setCurrentStep((prevStep) => {
            if (prevStep < 5) {
                return (prevStep + 1) as Step;
            }
            return prevStep;
        });
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => {
            if (prevStep > 1) {
                return (prevStep - 1) as Step;
            }
            return prevStep;
        });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        setCurrentStep(5);
        setTimeout(() => {
            alert('Dashboard Prepared!');
            setCurrentStep(1);
            setFormData({});
        }, 2000);
    };

    return (
        // Main container for the full screen layout
        <div className="flex min-h-screen">
            {/* Left Column */}
            <div className="shadow-divider-right flex w-[38%] flex-col justify-between bg-[#0B1727] py-8 text-white">
                {/* Background pattern image */}
                <div className="relative z-10 ml-[15%] flex h-full flex-col justify-between">
                    <div className="mt-[5%] w-[308px]">
                        {currentStep === 1 && (
                            <>
                                <h1 className="mb-2 text-4xl font-semibold">Let's get you started!</h1>
                                <p className="mb-4 w-[80%] text-sm text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                </p>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <h1 className="mb-2 text-4xl font-semibold">Company Snapshot</h1>
                                <p className="mb-4 w-[80%] text-sm text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                </p>
                            </>
                        )}
                        {/* ... other step content ... */}
                        <div className="mb-4 flex items-center gap-2">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${
                                        currentStep >= step ? 'border-white bg-white text-[#0B1727]' : 'border-gray-300 text-gray-300'
                                    }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-300">Step {currentStep}/4</p>
                    </div>
                </div>

                <img src="/pattern-left.png" alt="" />

                <div className="my-[7%] ml-[15%] w-64 text-sm font-light text-gray-300">
                    Already have an account? <span className="cursor-pointer font-semibold italic">Sign In Need Help?</span>
                </div>
            </div>

            {/* Vertical divider line */}
            <div className="background_gradient w-10 shadow-[4px_0_10px_rgba(0,0,0,0.5)]"></div>

            {/* Right Column */}
            <div className="relative ml-0 flex-1 overflow-y-auto bg-cover bg-center px-[10%]" style={{ backgroundImage: "url('/bg-right.png')" }}>
                <div className="">
                    {currentStep === 1 && <Step1 onNext={nextStep} />}
                    {currentStep === 2 && <Step2 onNext={nextStep} onPrevious={prevStep} />}
                    {currentStep === 3 && <Step3 onNext={handleSubmit} onPrevious={prevStep} />}
                    {currentStep === 4 && <Step4 onNext={handleSubmit} onPrevious={prevStep} />}
                    {currentStep === 5 && <LoadingState />}
                </div>
            </div>
        </div>
    );
}

export default App;
