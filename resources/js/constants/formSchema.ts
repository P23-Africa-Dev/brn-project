import { z } from "zod";

export const stepTwoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyDo: z.string().min(1, "Please describe what your company does"),
  industry: z.string().min(1, "Select an industry"),
  categories: z
    .array(z.string())
    .min(1, "Select at least 3 categories")
    .max(3, "You can select up to 3 categories"),
});

export type StepTwoData = z.infer<typeof stepTwoSchema>;




export const stepThreeSchema = z.object({
  great_at: z
    .array(z.string())
    .max(5, "You can select up to 5 tags")
    .nonempty("Select at least 5 tag"),
  can_help_with: z
    .array(z.string())
    .max(5, "You can select up to 5 tags")
    .nonempty("Select at least 5 tags"),
});

export type StepThreeData = z.infer<typeof stepThreeSchema>;
