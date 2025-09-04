'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepTwoData, stepTwoSchema } from '@/constants/formSchema';
import images from '@/constants/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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
    'Finance & Insurance': ['Business', 'Engineering', 'Investment Advisory', 'Insurance Brokers', 'Tax Services', 'Crypto & Web3 Finance'],
    Technology: [
        'Software Development',
        'Business',
        'Engineering',
        'Investment Advisory',
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

    // 🟢 Store categories for each industry
    const [industrySelections, setIndustrySelections] = useState<Record<string, string[]>>({});
    const [openIndustrySelect, setOpenIndustrySelect] = useState(false);

    // Load defaults
    useEffect(() => {
        if (defaultValues.industry) {
            setValue('industry', defaultValues.industry);
            setValue('categories', defaultValues.categories || []);
            setIndustrySelections((prev) => ({
                ...prev,
                [defaultValues.industry!]: defaultValues.categories || [],
            }));
        }
    }, [defaultValues, setValue]);

    // 🟢 When industry changes, restore saved categories
    useEffect(() => {
        if (selectedIndustry) {
            const saved = industrySelections[selectedIndustry] || [];
            setValue('categories', saved);
        }
    }, [selectedIndustry, industrySelections, setValue]);

    // Toggle category and update map
    const toggleCategory = (category: string) => {
        let updated: string[];

        if (selectedCategories.includes(category)) {
            updated = selectedCategories.filter((c) => c !== category);
        } else if (selectedCategories.length < 3) {
            updated = [...selectedCategories, category];
        } else {
            updated = [...selectedCategories];
        }

        setValue('categories', updated);

        // save for this industry
        if (selectedIndustry) {
            setIndustrySelections((prev) => ({
                ...prev,
                [selectedIndustry]: updated,
            }));
        }
    };

    const onSubmit = (data: StepTwoData) => {
        onNext(data);
    };

    const categoriesForIndustry = selectedIndustry ? industryData[selectedIndustry] || [] : [];

    return (
        <div className="w-full p-8 lg:overflow-y-auto xl:ml-16">
            <div className="relative z-10 mx-auto max-w-md xl:max-w-lg">
                {/* Heading */}
                <div className="mb-10">
                    <h2 className="mb-1 text-3xl font-extrabold text-primary dark:text-black">Tell us about your company</h2>
                    <p className="pr-10 text-[17px] font-normal text-primary dark:text-black">We’ll use this to find your perfect matches.</p>
                </div>

                {/* Form */}
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="mr-6 space-y-8">
                        {/* Company Name */}
                        <div className="relative w-full">
                            <label htmlFor="companyName" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-[#0B1727]/70 ">
                                Company Name
                            </label>
                            <input
                                type="text"
                                {...register('companyName')}
                                className="w-full rounded-2xl border-2 border-primary/80 py-3 pl-11 ring-[#0B1727]/70 font-semibold text-gray-900 ring-2 outline-none"
                            />
                            {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                        </div>

                        {/* Company Do */}
                        <div className="relative w-full">
                            <label htmlFor="companyDo" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-[#0B1727]/70">
                                What does your company do
                            </label>
                            <input
                                type="text"
                                {...register('companyDo')}
                                className="w-full rounded-2xl border-2 border-primary/80 py-3 pl-11 ring-[#0B1727]/70 font-semibold text-gray-900 ring-2 outline-none"
                            />
                            {errors.companyDo && <p className="text-sm text-red-500">{errors.companyDo.message}</p>}
                        </div>

                        <div className="relative w-full">
                            <label htmlFor="industry" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-[#0B1727]/70">
                                Select Industry
                            </label>
                            <Select
                                value={selectedIndustry}
                                onValueChange={(value) => setValue('industry', value)}
                                onOpenChange={(open) => setOpenIndustrySelect(open)}
                            >
                                <SelectTrigger className="flex w-full justify-between whitespace-nowrap rounded-2xl border-2 border-primary/80 py-6 pl-11 ring-[#0B1727]/70 font-semibold text-gray-900 ring-2 outline-none">
                                    <SelectValue className="w-full whitespace-nowrap  " placeholder="Choose an industry" />
                                    {openIndustrySelect ? (
                                        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-180 transform text-gray-400">
                                            <img src={images.dropDownArrow} alt="" />
                                        </span>
                                    ) : (
                                        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400">
                                            <img src={images.dropDownArrow} alt="" />
                                        </span>
                                    )}
                                </SelectTrigger>
                                <SelectContent className="w-full dark:bg-white dark:text-black">
                                    {Object.keys(industryData).map((ind) => (
                                        <SelectItem className="block w-full" key={ind} value={ind}>
                                            {ind}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
                        </div>

                        {/* Categories */}
                        {selectedIndustry && (
                            <div className="mx-5 md:-mt-0">
                                <p className="pl-1 text-sm text-grayLight">Select from 3 broad categories</p>
                                <div className="flex flex-wrap gap-3 px-1 py-2">
                                    {categoriesForIndustry.map((cat) => {
                                        const isSelected = selectedCategories.includes(cat);
                                        const disableRest = selectedCategories.length >= 3 && !isSelected;

                                        return (
                                            <button
                                                type="button"
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`flex items-center space-x-2 rounded-3xl bg-white px-8 py-2.5 font-GtrialsTh text-base tracking-wide shadow-md transition-all duration-200 ${
                                                    isSelected ? 'bg-transparent font-bold text-[#0B1727]' : 'font-semibold text-[#0B1727]/60'
                                                } ${disableRest ? 'pointer-events-none opacity-40 blur-[1px]' : ''}`}
                                            >
                                                <img src={isSelected ? images.badgeMark : images.badge} alt="" className="h-7 w-7" />
                                                <span>{cat}</span>
                                            </button>
                                        );

                                     
                                    })}
                                </div>
                                {errors.categories && <p className="mt-1 text-sm text-red-500">{errors.categories.message}</p>}
                            </div>
                        )}

                        {/* Submit */}
                        <div className="flex flex-col items-center">
                            <Button
                                type="submit"
                                className="w-full rounded-2xl bg-pinkLight py-8 text-lg font-semibold text-white hover:bg-pinkLight/90"
                            >
                                Proceed
                            </Button>

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
            </div>
        </div>
    );
}
