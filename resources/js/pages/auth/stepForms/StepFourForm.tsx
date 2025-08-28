'use client';

import React, { useState } from "react";

interface StepFourProps {
  onNext: (data: any) => void;
}

const VISIBILITY_OPTIONS = [
  {
    title: "Activate Smart Matching",
    desc: "We'll suggest 3-5 tailored Networks weekly.",
  },
  {
    title: "Show Profile in Searches",
    desc: "Your name/industry will appear in results.",
  },
  {
    title: "Display Deal Interests",
    desc: "Helps partners identify collaboration potential.",
  },
  {
    title: "Hide Activity Status",
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
    <div className="w-full lg:max-w-lg mx-auto">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-primary font-extrabold text-3xl mb-1">
          Control your visibility
        </h2>
        <p className="font-normal text-primary text-[17px] pr-10">
          You can change these anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Visibility Options */}
        <div className="space-y-5">
          {VISIBILITY_OPTIONS.map((opt, idx) => (
            <div key={opt.title} className="flex items-center justify-between rounded-xl py-4">
              <div className="flex-1">
                <div className="font-semibold text-primary text-base">{opt.title}</div>
                <div className="text-[#8C9AA6] text-base font-light max-w-xs pr-5 mt-1">{opt.desc}</div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                aria-pressed={toggles[idx]}
                onClick={() => handleToggle(idx)}
                className={`ml-10 w-17 h-8 rounded-full border-2 border-white flex items-center transition-colors duration-200 ${
                  toggles[idx] ? "bg-primary" : "bg-grayLighter"
                }`}
              >
                <span
                  className={`inline-block w-10 h-7 rounded-full bg-white shadow transform transition-transform duration-200 ${
                    toggles[idx] ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex items-center lg:mr-10">
          <button
            type="submit"
            className="w-full py-5 bg-pinkLight text-white font-semibold rounded-2xl hover:bg-pinkLight/90"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}
