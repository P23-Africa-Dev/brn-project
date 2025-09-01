'use client';

import React, { useState } from 'react';

interface StepFourProps {
    onNext: (data: any) => void;
}

const VISIBILITY_OPTIONS = [
    {
        title: 'Activate Smart Matching',
        desc: "We'll suggest 3-5 tailored Networks weekly.",
    },
    {
        title: 'Show Profile in Searches',
        desc: 'Your name/industry will appear in results.',
    },
    {
        title: 'Display Deal Interests',
        desc: 'Helps partners identify collaboration potential.',
    },
    {
        title: 'Hide Activity Status',
        desc: "When ON, others won't see when you're online.",
    },
];

export default function StepFourForm({ onNext }: StepFourProps) {
    const [toggles, setToggles] = useState([true, true, true, false]);

    const handleToggle = (idx: number) => {
        setToggles((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Since this is the last step, mark onNext as final submission
        onNext({
            visibilitySettings: toggles,
        });
    };

    return (
        <div className="relative z-10 mx-auto max-w-md xl:max-w-lg">
            {/* Heading */}
            <div className="mb-10">
                <h2 className="mb-1 text-3xl font-extrabold text-primary dark:text-black">Control your visibility</h2>
                <p className="pr-10 text-[17px] font-normal text-primary dark:text-black">You can change these anytime.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Visibility Options */}
                <div className="space-y-5">
                    {VISIBILITY_OPTIONS.map((opt, idx) => (
                        <div key={opt.title} className="flex items-center justify-between rounded-xl py-4">
                            <div className="flex-1">
                                <div className="text-base font-semibold text-primary dark:text-black">{opt.title}</div>
                                <div className="mt-1 max-w-xs pr-5 text-base font-light text-[#8C9AA6]">{opt.desc}</div>
                            </div>

                            {/* Toggle */}
                            <button
                                type="button"
                                aria-pressed={toggles[idx]}
                                onClick={() => handleToggle(idx)}
                                className={`ml-10 flex h-8 w-17 items-center rounded-full border-2 border-white transition-colors duration-200 ${
                                    toggles[idx] ? 'bg-primary' : 'bg-grayLighter '
                                }`}
                            >
                                <span
                                    className={`inline-block h-7 w-10 transform rounded-full bg-white dark:bg-black shadow transition-transform duration-200 ${
                                        toggles[idx] ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center lg:mr-10">
                    <button type="submit" className="w-full rounded-2xl bg-pinkLight py-5 font-semibold text-white hover:bg-pinkLight/90">
                        Proceed
                    </button>

                    <div className="mt-4 text-left text-primary lg:hidden lg:px-0">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="font-bold text-primary italic hover:underline">
                                Sign In
                            </a>
                        </p>
                        <span className="text-sm text-primary">
                            <a href="/help" className="font-bold text-primary italic hover:underline">
                                Need Help?
                            </a>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}
