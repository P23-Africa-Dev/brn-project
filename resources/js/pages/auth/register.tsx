
'use client';

import Loader from '@/components/auths/Loader';
import StepBottomContent from '@/components/auths/StepBottomContent';
import StepTopContent from '@/components/auths/StepTopContent';
import AuthLayout from '@/layouts/auth-layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StepOneForm from './stepForms/StepOneForm';
import StepTwoForm from './stepForms/StepTwoForm';
import StepThreeForm from './stepForms/StepThreeForm';
import StepFourForm from './stepForms/StepFourForm';



type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_picture: File | null;
    company_name: string;
    company_description: string;
    industry: string;
    categories: string[];
    great_at: string[];
    can_help_with: string[];
    visibilitySettings?: boolean[];
};

type RegisterProps = {
    prefill?: {
        name?: string;
        email?: string;
        company_name?: string;
    };
};

const STORAGE_KEY = 'register_form';

const topContentPerStep = [
    { title: 'Let’s get you started!', description: 'Fill in your details to create your account.' },
    { title: 'Company Snapshot', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
    {
        title: 'Almost There!',
        spanElement: 'Superpowers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        headingClassName: 'max-w-[300px] font-light',
    },
    {
        title: 'We are Here!',
        spanElement: 'Profile Visibility',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        headingClassName: 'max-w-[300px] font-light',
    },
];




const mobileTopContentPerStep = [
    {
        title: 'First, the essential',
        description: 'This helps members recognise and trust you.',
        headingClassName: 'text-3xl font-bold text-white',
        paragraphClassName: 'max-w-sm pr-5 text-[17px] font-light text-white',
    },
    {
        title: 'Tell us about your company',
        description: 'We’ll use this to find your perfect matches',
        headingClassName: 'text-3xl font-bold text-white',
        paragraphClassName: 'max-w-sm pr-5 text-[16px] font-light text-gray-200',
    },
    {
        title: 'What is your secret sauce',
        description: 'Members will search for this skills!',
        headingClassName: 'text-3xl font-bold text-white',
        paragraphClassName: 'max-w-sm pr-5 text-base font-light text-gray-300',
    },
    {
        title: 'Control your visibility',
        description: 'You can change these anytime',
        headingClassName: 'text-3xl font-bold text-white pr-23',
        paragraphClassName: 'max-w-sm pr-5 text-[16px] font-light text-gray-200',
    },
];

export default function Register({ prefill }: RegisterProps) {
    // ✅ Load step from query param (?step=2) or default to 1
    const getStepFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get('step') || 1);
    };

    const [step, setStep] = useState<number>(getStepFromUrl);
    const [loading, setLoading] = useState(false);

    // ✅ Listen for browser back/forward (popstate)
    useEffect(() => {
        const handlePopState = () => {
            setStep(getStepFromUrl());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // ✅ Load formData from localStorage
    const [formData, setFormData] = useState<RegisterForm>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {
                    name: prefill?.name ?? '',
                    email: prefill?.email ?? '',
                    password: '',
                    password_confirmation: '',
                    profile_picture: null,
                    company_name: prefill?.company_name ?? '',
                    company_description: '',
                    industry: '',
                    categories: [],
                    great_at: [],
                    can_help_with: [],
                };
            }
        }
        return {
            name: prefill?.name ?? '',
            email: prefill?.email ?? '',
            password: '',
            password_confirmation: '',
            profile_picture: null,
            company_name: prefill?.company_name ?? '',
            company_description: '',
            industry: '',
            categories: [],
            great_at: [],
            can_help_with: [],
        };
    });

    // ✅ Persist formData in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const steps = ['Account Info', 'Company Info', 'Interests', 'Visibility'];

    const goToStep = (newStep: number) => {
        setStep(newStep);
        // ✅ Update URL without reload
        const url = new URL(window.location.href);
        url.searchParams.set('step', String(newStep));
        window.history.pushState({}, '', url.toString());
    };

    const nextStep = (data?: Partial<RegisterForm>, isFinalStep = false) => {
        const updatedData = data ? { ...formData, ...data } : formData;
        setFormData(updatedData);

        if (isFinalStep) {
            handleSubmitFinal(updatedData);
        } else {
            goToStep(step + 1);
        }
    };

    const handleSubmitFinal = async (finalData: RegisterForm) => {
        try {
            setLoading(true);

            const payload = new FormData();
            Object.entries(finalData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => payload.append(`${key}[]`, v));
                } else if (value instanceof File) {
                    payload.append(key, value);
                } else if (value !== null && value !== undefined) {
                    payload.append(key, String(value));
                }
            });

            await axios.post(route('registration.continue'), payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // ✅ Clear storage on success
            localStorage.removeItem(STORAGE_KEY);

            window.location.href = '/dashboard';
        } catch (err: any) {
            setLoading(false);
            if (err.response?.status === 422) {
                alert('Validation error: ' + JSON.stringify(err.response.data.errors));
            } else {
                alert('Something went wrong, please try again.');
            }
        }
    };

    if (loading) return <Loader />;
   

    return (
        <AuthLayout
            mobileTopContent={
                <>
                    <div className="absolute top-7 left-10 py-2">
                        <div className="bg-transparent ">
                            <h2 className={`mb-3 ${mobileTopContentPerStep[step - 1].headingClassName}`}>
                                {mobileTopContentPerStep[step - 1].title}
                            </h2>
                            <p className={mobileTopContentPerStep[step - 1].paragraphClassName}>{mobileTopContentPerStep[step - 1].description}</p>
                        </div>

                        <div className="mt-5 flex items-center space-x-3 pb-4 xl:pl-0">
                            {steps.map((_, index) => {
                                const stepNumber = index + 1;
                                const isActive = step >= stepNumber;

                                return (
                                    <button
                                        key={stepNumber}
                                        disabled
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-semibold transition-all ${
                                            isActive ? 'bg-white text-primary' : 'bg-transparent text-white'
                                        }`}
                                    >
                                        {stepNumber}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-sm font-extralight text-white xl:pl-0">
                            Step {step}/{steps.length}
                        </div>
                    </div>
                </>
            }
            topContent={
                <StepTopContent
                    steps={steps}
                    currentStep={step}
                    title={topContentPerStep[step - 1].title}
                    spanElement={topContentPerStep[step - 1].spanElement}
                    headingClassName={topContentPerStep[step - 1].headingClassName}
                    description={topContentPerStep[step - 1].description}
                />
            }
            bottomContent={<StepBottomContent />}
        >
            {step === 1 && (
                <StepOneForm
                    defaultValues={{
                        name: formData.name,
                        email: formData.email,
                        password: '',
                        password_confirmation: '',
                    }}
                    onNext={(data) => nextStep(data)}
                />
            )}

            {step === 2 && (
                <StepTwoForm
                    defaultValues={{
                        companyName: formData.company_name,
                        companyDo: formData.company_description,
                        industry: formData.industry,
                        categories: formData.categories,
                    }}
                    onNext={(data) =>
                        nextStep(
                            {
                                company_name: data.companyName,
                                company_description: data.companyDo,
                                industry: data.industry,
                                categories: data.categories,
                            },
                            false,
                        )
                    }
                />
            )}

            {step === 3 && (
                <StepThreeForm
                    defaultValues={{
                        great_at: formData.great_at,
                        can_help_with: formData.can_help_with,
                    }}
                    onNext={(data) =>
                        nextStep(
                            {
                                great_at: data.great_at,
                                can_help_with: data.can_help_with,
                            },
                            false,
                        )
                    }
                />
            )}

            {step === 4 && (
                <StepFourForm
                    onNext={(data) =>
                        nextStep(
                            {
                                visibilitySettings: data.visibilitySettings,
                            },
                            true, // final step
                        )
                    }
                />
            )}
        </AuthLayout>
       
    );
}
