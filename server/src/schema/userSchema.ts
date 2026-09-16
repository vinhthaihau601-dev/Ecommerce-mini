import { z } from "zod";

export const NonEmptyTrimmedString = z
    .string()
    .min(1, "This field is required")
    .max(255, "Maximum length is 255 characters")
    .refine((val) => val.trim().length > 0, "Cannot be just spaces");

export const userSchema = z.object({
    name: NonEmptyTrimmedString,
    email: z.string().trim().min(1, "This field is required").max(255).email("Invalid email"),
    password: NonEmptyTrimmedString,
    role: z.enum(['customer', 'admin']).optional(),
})

export const updateUserSchema = userSchema.partial()
