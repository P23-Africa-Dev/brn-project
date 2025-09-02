import { z } from "zod";

export const stepTwoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyDo: z.string().min(1, "Please describe what your company does"),
  industry: z.string().min(1, "Select an industry"),
  categories: z
    .array(z.string())
    .min(3, "Select at least 3 categories")
    .max(3, "You can only select up to 3 categories"),
});

export type StepTwoData = z.infer<typeof stepTwoSchema>;




export const stepThreeSchema = z.object({
  great_at: z
    .array(z.string())
    .min(3, "You can select up to 3 tags")
    .max(3, "You can only select up to 3 categories")
    .nonempty("Select at least 3 tag"),
  can_help_with: z
    .array(z.string())
    .min(3, "You can select up to 3 tags")
    .max(3, "You can only select up to 3 categories")
    .nonempty("Select at least 3 tags"),
});

export type StepThreeData = z.infer<typeof stepThreeSchema>;
