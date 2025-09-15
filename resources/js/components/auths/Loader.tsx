import images from '@/constants/image';
import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${images.formBG})`,
            }}
            className="flex h-screen flex-col items-center justify-center bg-white"
        >
            {/* Circle Container */}
            {/* ⬇️ Increase h-[number] w-[number] to make the loader container larger */}
            <div className="relative h-56 w-56">
                {/* Background circle */}
                <svg className="h-full w-full rotate-[-90deg]">
                    {/* ⬇️ Adjust cx, cy (center) and r (radius) to scale the circle */}
                    <circle cx="112" cy="112" r="95" stroke="#f1f1f1" strokeWidth="18" /* ⬅️ Stroke thickness */ fill="none" />
                </svg>

                {/* Gradient arc */}
                <svg className="absolute top-0 left-0 h-full w-full rotate-[-90deg]">
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="#00CC99" />
                            <stop offset="50%" stopColor="#D6E264" />
                            <stop offset="100%" stopColor="#00BFFF" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="112"
                        cy="112"
                        r="95"
                        stroke="url(#gradient)"
                        strokeWidth="18" /* ⬅️ Stroke thickness of gradient arc */
                        fill="none"
                        strokeDasharray={2 * Math.PI * 95} /* ⬅️ update with radius */
                        strokeDashoffset={2 * Math.PI * 95 - (progress / 100) * (2 * Math.PI * 95)}
                        strokeLinecap="round"
                        className="animate-spin-slow origin-center"
                    />
                </svg>

                {/* Progress Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* ⬇️ Increase text-2xl to text-3xl or higher for larger percentage text */}
                    <span className="text-3xl font-bold text-[#0B1727]">{progress}%</span>
                </div>
            </div>

            {/* Loader Text */}
            <div className="mx-auto max-w-xl text-center">
                <h3 className="mt-5 mb-1 text-[18px] font-bold text-primary dark:text-black">Preparing Your Dashboard</h3>
                <p className="mb-2 text-sm font-light text-deepBlue">(This will take few seconds)</p>
                <p className="mx-auto max-w-sm px-10 text-center text-[12px] text-deepBlue/90">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
            </div>
        </div>
    );
};

export default Loader;
