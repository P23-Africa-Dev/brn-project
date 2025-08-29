'use client';

<<<<<<< HEAD
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
    { label: 'Web Development', value: 'web_dev' },
    { label: 'UI/UX Design', value: 'uiux' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finance', value: 'finance' },
    { label: 'Cybersecurity', value: 'cybersecurity' },
    { label: 'AI & Data', value: 'ai_data' },
    { label: 'Consulting', value: 'consulting' },
];

export default function StepThreeForm({ defaultValues, onNext }: StepThreeProps) {
    const {
        register,
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
        } else if (selected.length < 5) {
            setValue(field, [...selected, value]);
        }
    };

    const onSubmit = (data: StepThreeData) => {
        onNext(data);
    };

    return (
        <div className="mx-auto max-w-lg">
            {/* Heading */}
            <div className="mb-10">
                <h2 className="mb-1 text-3xl font-extrabold text-primary">What’s your secret sauce?</h2>
                <p className="pr-10 text-[17px] font-normal text-primary">Members will search for these skills!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* I'm great at */}
                <div className="space-y-3 py-2">
                    <h4 className="mb-2 text-base font-bold">I'm great at;</h4>
                    <p className="pl-1 text-sm text-grayLight">select max 5 tags</p>
                    <div className="grid grid-cols-3 gap-3 px-1 py-2">
                        {sampleTags.map((tag) => (
                            <button
                                type="button"
                                key={tag.value}
                                onClick={() => toggleTag('great_at', tag.value)}
                                className={`flex items-center justify-center space-x-2 rounded-3xl px-4 py-1.5 text-sm shadow-sm transition-all duration-200 ${
                                    greatAtSelected.includes(tag.value)
                                        ? 'border border-pinkLight bg-pinkLight font-medium text-white'
                                        : 'border border-gray-300 bg-white font-light'
                                }`}
                            >
                                <img src={greatAtSelected.includes(tag.value) ? images.badgeMark : images.badge} alt="" className="h-4 w-4" />
                                <span>{tag.label}</span>
                            </button>
                        ))}
                    </div>
                    {errors.great_at && <p className="mt-1 text-sm text-red-500">{errors.great_at.message}</p>}
                </div>

                {/* I can help others with */}
                <div className="space-y-3 py-2">
                    <h4 className="mb-2 text-base font-bold">I can help others with;</h4>
                    <p className="pl-1 text-sm text-grayLight">select max 5 tags</p>
                    <div className="grid grid-cols-3 gap-3 px-1 py-2">
                        {sampleTags.map((tag) => (
                            <button
                                type="button"
                                key={tag.value}
                                onClick={() => toggleTag('can_help_with', tag.value)}
                                className={`flex items-center justify-center space-x-2 rounded-3xl px-4 py-1.5 text-sm shadow-sm transition-all duration-200 ${
                                    helpWithSelected.includes(tag.value)
                                        ? 'border border-pinkLight bg-pinkLight font-medium text-white'
                                        : 'border border-gray-300 bg-white font-light'
                                }`}
                            >
                                <img src={helpWithSelected.includes(tag.value) ? images.badgeMark : images.badge} alt="" className="h-4 w-4" />
                                <span>{tag.label}</span>
                            </button>
                        ))}
                    </div>
                    {errors.can_help_with && <p className="mt-1 text-sm text-red-500">{errors.can_help_with.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center">
                    <Button type="submit" className="w-full rounded-2xl bg-pinkLight py-8 text-lg font-semibold text-white hover:bg-pinkLight/90">
                        Proceed
                    </Button>

                    <div className="mt-4 text-left text-primary lg:px-0">
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
=======
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepThreeData, stepThreeSchema } from "@/constants/formSchema";
import images from "@/constants/image";

interface StepThreeProps {
  defaultValues?: Partial<StepThreeData>;
  onNext: (data: StepThreeData) => void;
}

const sampleTags = [
  { label: "Web Development", value: "web_dev" },
  { label: "UI/UX Design", value: "uiux" },
  { label: "Marketing", value: "marketing" },
  { label: "Finance", value: "finance" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "AI & Data", value: "ai_data" },
  { label: "Consulting", value: "consulting" },
];

export default function StepThreeForm({ defaultValues, onNext }: StepThreeProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: defaultValues as StepThreeData,
  });

  const greatAtSelected = watch("great_at") || [];
  const helpWithSelected = watch("can_help_with") || [];

  const toggleTag = (field: "great_at" | "can_help_with", value: string) => {
    const selected = field === "great_at" ? greatAtSelected : helpWithSelected;
    if (selected.includes(value)) {
      setValue(field, selected.filter((v) => v !== value));
    } else if (selected.length < 3) {
      setValue(field, [...selected, value]);
    }
  };

  const onSubmit = (data: StepThreeData) => {
    onNext(data);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-primary font-extrabold text-3xl mb-1">What’s your secret sauce?</h2>
        <p className="font-normal text-primary text-[17px] pr-10">
          Members will search for these skills!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* I'm great at */}
        <div className="space-y-3 py-2">
          <h4 className="font-bold text-base mb-2">I'm great at;</h4>
          <p className="text-grayLight text-sm pl-1">select max 5 tags</p>
          <div className="grid grid-cols-3 gap-3 px-1 py-2">
            {sampleTags.map((tag) => (
              <button
                type="button"
                key={tag.value}
                onClick={() => toggleTag("great_at", tag.value)}
                className={`flex items-center justify-center space-x-2 shadow-sm text-sm px-4 py-1.5 rounded-3xl transition-all duration-200 ${
                  greatAtSelected.includes(tag.value)
                    ? "bg-pinkLight text-white border border-pinkLight font-medium"
                    : "bg-white border border-gray-300 font-light"
                }`}
              >
                <img
                  src={greatAtSelected.includes(tag.value) ? images.badgeMark : images.badge}
                  alt=""
                  className="w-4 h-4"
                />
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
          {errors.great_at && <p className="text-red-500 text-sm mt-1">{errors.great_at.message}</p>}
        </div>

        {/* I can help others with */}
        <div className="space-y-3 py-2">
          <h4 className="font-bold text-base mb-2">I can help others with;</h4>
          <p className="text-grayLight text-sm pl-1">select max 5 tags</p>
          <div className="grid grid-cols-3 gap-3 px-1 py-2">
            {sampleTags.map((tag) => (
              <button
                type="button"
                key={tag.value}
                onClick={() => toggleTag("can_help_with", tag.value)}
                className={`flex items-center justify-center space-x-2 shadow-sm text-sm px-4 py-1.5 rounded-3xl transition-all duration-200 ${
                  helpWithSelected.includes(tag.value)
                    ? "bg-pinkLight text-white border border-pinkLight font-medium"
                    : "bg-white border border-gray-300 font-light"
                }`}
              >
                <img
                  src={helpWithSelected.includes(tag.value) ? images.badgeMark : images.badge}
                  alt=""
                  className="w-4 h-4"
                />
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
          {errors.can_help_with && <p className="text-red-500 text-sm mt-1">{errors.can_help_with.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex items-center">
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
>>>>>>> 36645af5eab03f27f83966fc45945447b68b41a6
}
