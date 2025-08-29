'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepTwoData, stepTwoSchema } from '@/constants/formSchema';
import images from '@/constants/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const industryData: Record<string, string[]> = {
    'Business & Professional Services': [
        'Consulting',
        'Legal Services',
        'Accounting & Bookkeeping',
        'Marketing & Advertising',
        'Business Coaching',
        'Virtual Assistance',
        'HR & Recruitment',
    ],
    'Finance & Insurance': ['Fintech', 'Microfinance', 'Investment Advisory', 'Insurance Brokers', 'Tax Services', 'Crypto & Web3 Finance'],
    Technology: [
        'Software Development',
        'Web & App Development',
        'IT Support & Networking',
        'SaaS Platforms',
        'UI/UX & Product Design',
        'Cybersecurity',
        'AI & Data Analytics',
    ],
};

interface StepTwoProps {
    defaultValues: Partial<StepTwoData>;
    onNext: (data: StepTwoData) => void;
}

export default function StepTwoForm({ defaultValues, onNext }: StepTwoProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<StepTwoData>({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: defaultValues as StepTwoData,
    });

    const selectedIndustry = watch('industry');
    const selectedCategories = watch('categories') || [];

    // Initialize categories if defaultValues exist
    useEffect(() => {
        if (defaultValues.industry) {
            const defaultCats = defaultValues.categories?.length ? defaultValues.categories : industryData[defaultValues.industry]?.slice(0, 3) || [];
            setValue('industry', defaultValues.industry);
            setValue('categories', defaultCats);
        }
    }, [defaultValues, setValue]);

    // Update categories when industry changes
    useEffect(() => {
        if (selectedIndustry) {
            const firstCategories = industryData[selectedIndustry]?.slice(0, 3) || [];
            setValue('categories', firstCategories);
        } else {
            setValue('categories', []);
        }
    }, [selectedIndustry, setValue]);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setValue(
                'categories',
                selectedCategories.filter((c) => c !== category),
            );
        } else if (selectedCategories.length < 3) {
            setValue('categories', [...selectedCategories, category]);
        }
    };

    const onSubmit = (data: StepTwoData) => {
        onNext(data);
    };

    const categoriesForIndustry = selectedIndustry ? industryData[selectedIndustry] || [] : [];

    return (
        <div className="">
            {/* Heading */}
            <div className="mb-10">
                <h2 className="mb-1 text-3xl font-extrabold text-primary">Tell us about your company</h2>
                <p className="pr-10 text-[17px] font-normal text-primary">We’ll use this to find your perfect matches.</p>
            </div>

            <div className="max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Company Name */}
                    <div className="relative w-full">
                        <label htmlFor="companyName" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-500">
                            Company Name
                        </label>
                        <input
                            type="text"
                            {...register('companyName')}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 ring outline-none"
                        />
                        {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                    </div>

                    {/* Company Do */}
                    <div className="relative w-full">
                        <label htmlFor="companyDo" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-500">
                            What does your company do
                        </label>
                        <input
                            type="text"
                            {...register('companyDo')}
                            className="w-full rounded-2xl border-2 border-primary/40 py-3 pl-11 font-semibold text-gray-900 ring outline-none"
                        />
                        {errors.companyDo && <p className="text-sm text-red-500">{errors.companyDo.message}</p>}
                    </div>

                    {/* Industry using Shadcn Select */}
                    <div className="relative w-full">
                        <label htmlFor="industry" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-500">
                            Select Industry
                        </label>
                        <Select value={selectedIndustry} onValueChange={(value) => setValue('industry', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue className="w-full" placeholder="Choose an industry" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {Object.keys(industryData).map((ind) => (
                                    <SelectItem className="block w-full" key={ind} value={ind}>
                                        {ind}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
                    </div>

                    {/* Categories with images and style */}
                    {selectedIndustry && (
                        <div className='mx-5'>
                            <p className="mb-1 text-sm font-medium">Select up to 3 categories</p>
                            <div className="flex flex-wrap gap-3 px-1 py-2">
                                {categoriesForIndustry.map((cat) => (
                                    <button
                                        type="button"
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={`flex items-center space-x-2  text-[#0B1727]/70 font-Gtrials rounded-3xl px-4 py-3 text-sm shadow-sm transition-all duration-200 ${
                                            selectedCategories.includes(cat)
                                                ? ' bg-transparent text-[#0B1727]/80'
                                                : ' border-gray-300 bg-white'
                                        }`}
                                    >
                                        <img src={selectedCategories.includes(cat) ? images.badgeMark : images.badge} alt="" className="h-5 w-5" />
                                        <span>{cat}</span>
                                    </button>
                                ))} 
                            </div>
                            {errors.categories && <p className="mt-1 text-sm text-red-500">{errors.categories.message}</p>}
                        </div>
                    )}

                    {/* Submit */}
                  <div className="flex flex-col items-center">
                        <Button type="submit" className="w-full rounded-2xl bg-pinkLight py-8 text-lg font-semibold text-white hover:bg-pinkLight/90">
                            Proceed
                        </Button>

                        <div className="  mt-4 text-left lg:px-0  text-primary">
                            <p className=" text-sm  ">
                                Already have an account?{' '}
                                <a href="/login" className="font-bold text-primary italic hover:underline">
                                    Sign In
                                </a>
                            </p>
                            <span className=" text-primary text-sm ">
                                <a href="/help" className="font-bold text-primary italic hover:underline">
                                    Need Help?
                                </a>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
