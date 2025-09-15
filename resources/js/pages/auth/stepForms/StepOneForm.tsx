'use client';

import { Button } from '@/components/ui/button';
import images from '@/constants/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// type Step1FormData = {
//   name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   profile_picture: FileList; // stays FileList here
// };

// type Step1Props = {
//   defaultValues: {
//     name: string;
//     email: string;
//     password: string;
//     password_confirmation: string;
//   };
//   onNext: (data: Step1FormData & { profile_picture: File | null }) => void;
// };

// StepOneForm
type Step1FormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_picture: FileList; // keep raw here for react-hook-form
};

type Step1Props = {
    defaultValues: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    onNext: (data: Omit<Step1FormData, 'profile_picture'> & { profile_picture: File | null }) => void;
};

export default function StepOneForm({ defaultValues, onNext }: Step1Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Step1FormData>({
        defaultValues,
    });

    const password = watch('password');

    const onSubmit = (data: Step1FormData) => {
        onNext({
            ...data,
            profile_picture: data.profile_picture?.[0] || null, // extract first file safely
        });
    };

    return (
        <div className="w-full border p-8 lg:overflow-y-auto">
            <div className="relative z-10 mx-auto max-w-md">
                {/* Heading */}
                <div className="mb-10">
                    <h2 className="mb-1 text-3xl font-extrabold text-primary dark:text-black">First, the essentials</h2>
                    <p className="max-w-sm pr-5 text-[17px] font-normal text-primary dark:text-black">This helps members recognize and trust you.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mr-6 space-y-7">
                    {/* Name */}
                    <div className="relative w-full">
                        <label htmlFor="name" className="absolute -top-2.5 left-8 bg-white text-[#0B1727]/70  px-4 text-sm">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full rounded-2xl border-1 border-primary py-3 pl-11 ring-[#0B1727]/80 ring-2 font-semibold text-gray-900  outline-none"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative w-full">
                        <label htmlFor="email" className="absolute -top-2.5 text-[#0B1727] left-8 bg-white px-4 text-sm ">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                                  className="w-full rounded-2xl border-1 border-primary py-3 pl-11 ring-[#0B1727]/80 ring-2 font-semibold text-gray-900  outline-none"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative w-full">
                        <label htmlFor="password" className="absolute -top-2.5 text-[#0B1727] left-8 bg-white px-4 text-sm ">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Enter your password',
                            })}
                                  className="w-full rounded-2xl border-1 border-primary py-3 pl-11 ring-[#0B1727]/80 ring-2 font-semibold text-gray-900  outline-none"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full">
                        <label htmlFor="password_confirmation" className="absolute text-[#0B1727] -top-2.5 left-8 bg-white px-4 text-sm ">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            {...register('password_confirmation', {
                                required: 'Enter your password',
                                validate: (value) => value === password || "Password doesn't match",
                            })}
                                  className="w-full rounded-2xl border-1 border-primary py-3 pl-11 ring-[#0B1727]/80 ring-2 font-semibold text-gray-900  outline-none"
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="flex w-full items-center space-x-4 px-2 pl-5">
                        <label className="relative flex h-[90px] w-[130px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100">
                            <input
                                type="file"
                                accept="image/*"
                                {...register('profile_picture', {
                                    required: 'Profile picture is required',
                                    onChange: (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    },
                                })}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                            {!preview ? (
                                <div className="flex w-full flex-col items-center justify-center">
                                    <img src={images.uploadBg} alt="placeholder" className="h-5 w-5 object-cover" />
                                    <span className="mt-1 block px-3 text-center text-[7px] text-primary/50 dark:text-black">
                                        Click to add profile picture
                                    </span>
                                </div>
                            ) : (
                                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            )}
                        </label>

                        <div>
                            <h4 className="font-semibold text-primary dark:text-black">Add a profile picture</h4>
                            <p className="text-xs text-grayLight">Builds trust, personalizes experience, and enhances engagement.</p>
                            {errors.profile_picture && <p className="mt-1 text-sm text-red-500">{errors.profile_picture.message as string}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className=" flex flex-col items-center">
                        <Button type="submit" className="w-full rounded-2xl bg-pinkLight py-8 text-lg font-semibold text-white hover:bg-pinkLight/90">
                            Proceed
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
