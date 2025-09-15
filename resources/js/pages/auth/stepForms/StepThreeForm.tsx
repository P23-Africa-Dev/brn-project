'use client';

import { Button } from '@/components/ui/button';
import { StepThreeData, stepThreeSchema } from '@/constants/formSchema';
import images from '@/constants/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface StepThreeProps {
    defaultValues?: Partial<StepThreeData>;
    onNext: (data: StepThreeData) => void;
}

const sampleTags = [
    { label: 'Sales', value: 'sales' },
    { label: 'Fundraising', value: 'fundraising' },
    { label: 'Consulting', value: 'consulting' },
    { label: 'Cybersecurity', value: 'cybersecurity' },
    { label: 'AI & Data', value: 'ai_data' },
    { label: 'Product', value: 'product' },
    { label: 'Strategy', value: 'strategy' },
];

export default function StepThreeForm({ defaultValues, onNext }: StepThreeProps) {
    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<StepThreeData>({
        resolver: zodResolver(stepThreeSchema),
        defaultValues: defaultValues as StepThreeData,
    });

    const greatAtSelected = watch('great_at') || [];
    const helpWithSelected = watch('can_help_with') || [];

    const toggleTag = (field: 'great_at' | 'can_help_with', value: string) => {
        const selected = field === 'great_at' ? greatAtSelected : helpWithSelected;
        if (selected.includes(value)) {
            setValue(
                field,
                selected.filter((v) => v !== value),
            );
        } else if (selected.length < 3) {
            setValue(field, [...selected, value]);
        }
    };

    const onSubmit = (data: StepThreeData) => {
        onNext(data);
    };

    return (
        <div className="w-full p-8 lg:overflow-y-auto xl:ml-18">
            <div className="relative z-10 mx-auto max-w-md xl:max-w-[550px]">
                {/* Heading */}
                <div className="mb-4">
                    <h2 className="mb-1 text-3xl font-extrabold text-primary dark:text-black">What’s your secret sauce?</h2>
                    <p className="pr-10 text-[17px] font-normal text-primary dark:text-black">Members will search for these skills!</p>
                </div>

                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="mr-6 space-y-6 lg:mr-0">
                        {/* I'm great at */}
                        <div className="space-y-3 py-2">
                            <h4 className="mb-2 text-base font-bold dark:text-black">I'm great at;</h4>
                            <p className="pl-1 text-sm text-grayLight">select max 3 tags</p>

                            <div className="-ml-1.5 flex flex-wrap gap-3 py-2">
                                {sampleTags.map((tag) => {
                                    const isSelected = greatAtSelected.includes(tag.value);
                                    const disableRest = greatAtSelected.length >= 3 && !isSelected;

                                    return (
                                        <button
                                            type="button"
                                            key={tag.value}
                                            onClick={() => toggleTag('great_at', tag.value)}
                                            className={`flex items-center space-x-2 rounded-3xl bg-white px-10 py-2.5 font-GtrialsTh text-base tracking-wide shadow-md transition-all duration-200 ${
                                                isSelected ? 'bg-transparent font-bold text-[#0B1727]' : 'font-semibold text-[#0B1727]/60'
                                            } ${disableRest ? 'pointer-events-none opacity-40 blur-[1px]' : ''}`}
                                        >
                                            <img src={isSelected ? images.badgeMark : images.badge} alt="" className="h-7 w-7" />
                                            <span>{tag.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {errors.great_at && <p className="mt-1 text-sm text-red-500">{errors.great_at.message}</p>}
                        </div>

                        {/* I can help others with */}
                        <div className="space-y-3 py-2">
                            <h4 className="mb-2 text-base font-bold dark:text-black">I can help others with;</h4>
                            <p className="pl-1 text-sm text-grayLight">select max 3 tags</p>

                            <div className="-ml-1.5 flex flex-wrap gap-3  py-2">
                                {sampleTags.map((tag) => {
                                    const isSelected = helpWithSelected.includes(tag.value);
                                    const disableRest = helpWithSelected.length >= 3 && !isSelected;

                                    return (
                                        <button
                                            type="button"
                                            key={tag.value}
                                            onClick={() => toggleTag('can_help_with', tag.value)}
                                            className={`flex items-center space-x-2 rounded-3xl bg-white px-8 py-2.5 font-GtrialsTh text-base tracking-wide shadow-md transition-all duration-200 ${
                                                isSelected ? 'bg-transparent font-bold text-[#0B1727]' : 'font-semibold text-[#0B1727]/60'
                                            } ${disableRest ? 'pointer-events-none opacity-60 blur-[1px]' : ''}`}
                                        >
                                            <img src={isSelected ? images.badgeMark : images.badge} alt="" className="h-7 w-7" />
                                            <span>{tag.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {errors.can_help_with && <p className="mt-1 text-sm text-red-500">{errors.can_help_with.message}</p>}
                        </div>

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
