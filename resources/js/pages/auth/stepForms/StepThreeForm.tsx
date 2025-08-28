'use client';

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
}
