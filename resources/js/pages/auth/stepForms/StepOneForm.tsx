'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import images from '@/constants/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Step1FormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_picture: FileList;
};

type Step1Props = {
    defaultValues: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    onNext: (data: any) => void;
};

export default function StepOneForm({ defaultValues, onNext }: Step1Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<Step1FormData>({
        defaultValues,
    });

    const handleCancelUpload = () => {
        setPreview(null);
        resetField('profile_picture');
    };

    const onSubmit = (data: Step1FormData) => {
        onNext({
            ...data,
            profile_picture: data.profile_picture[0] || null,
        });
    };

    return (
        <div>
            {/* Heading */}
            <div className="mb-10">
                <h2 className="mb-1 text-3xl font-extrabold text-primary">First, the essentials</h2>
                <p className="max-w-sm pr-5 text-[17px] font-normal text-primary">This helps members recognize and trust you.</p>
            </div>

            {/* Form */}
            <div className="max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-7">
                    {/* Name */}
                    <div className="relative w-full">
                        <label htmlFor="name" className="absolute -top-2.5 left-3 bg-white px-2 text-sm text-gray-500">
                            Full Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 outline-none"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative w-full">
                        <label htmlFor="email" className="absolute -top-2.5 left-3 bg-white px-2 text-sm text-gray-500">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 outline-none"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative w-full">
                        <label htmlFor="password" className="absolute -top-2.5 left-3 bg-white px-2 text-sm text-gray-500">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 outline-none"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full">
                        <label htmlFor="password_confirmation" className="absolute -top-2.5 left-3 bg-white px-2 text-sm text-gray-500">
                            Confirm Password
                        </label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            {...register('password_confirmation', {
                                required: 'Confirm password is required',
                            })}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 outline-none"
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
                    </div>

                    {/* Profile Picture Upload */}
                    {/* Profile Picture Upload */}
                    <div className="flex w-full items-center space-x-6 px-2">
                        <label className="relative flex h-[90px] w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100">
                            {/* Hidden File Input */}
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

                            {/* Preview or Placeholder */}
                            {!preview ? (
                                <div className="flex w-full flex-col items-center justify-center">
                                    <img src={images.uploadBg} alt="placeholder" className="h-5 w-5 object-cover" />
                                    <span className="mt-1 block text-center text-[7px] text-primary/50">Click to add profile picture</span>
                                </div>
                            ) : (
                                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            )}
                        </label>

                        {/* Info + Error */}
                        <div>
                            <h4 className="font-semibold text-primary">Add a profile picture</h4>
                            <p className="text-xs text-grayLight">Builds trust, personalizes experience, and enhances engagement.</p>
                            {errors.profile_picture && <p className="mt-1 text-sm text-red-500">{errors.profile_picture.message as string}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center">
                        <Button type="submit" className="w-full rounded-2xl bg-pinkLight py-5 font-semibold text-white hover:bg-pinkLight/90">
                            Proceed
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
