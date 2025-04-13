import Countries from "@/constants/countries";
import { object, string, z } from "zod";

const password = string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[a-zA-Z]/, { message: " Password must contain at least one letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character.",
  })
  .trim();

const email = string().email({ message: "Please enter a valid email." }).trim();

const nationality = string({
  required_error: "Nationality is required",
})
  .min(1, "Nationality is required")
  .max(32, "Nationality must be less than 32 characters")
  .refine((value) => Countries.some((country) => country.value === value), {
    message: "Invalid nationality. Please select a valid country.",
  });

export const signInSchema = object({
  email: email,
  password: password,
});

export const signUpSchema = object({
  email: email,
  password: password,
  nationality: nationality,
  confirmPassword: password,
  state: string()
    .min(2, { message: "State is required" })
    .optional(),
  referralCode: string()
    .length(8, "Referral code must be exactly 8 characters long")
    .optional(),

  firstName: string({ required_error: "First name is required" })
    .min(2, "First name is required")
    .max(32, "First name must be less than 32 characters"),
  lastName: string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const otpSchema = object({
  otp: string().length(4, "OTP must be exactly 4 characters long"),
});

export const changePwdSchema = object({
  currentPassword: password,
  newPassword: password,
  confirmPassword: password,
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword === data.newPassword, {
  message: "New password cannot be the same as the current password",
  path: ["newPassword"],
});

export const updateSchema = object({
  firstName: string()
    .min(2, "First name is required")
    .max(32, "First name must be less than 32 characters")
    .optional(),
  lastName: string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim()
    .optional(),
  nationality: nationality.optional(),
});

export type ChangePwdType = z.infer<typeof changePwdSchema>;
export type UpdateType = z.infer<typeof updateSchema>;
export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
export type OtpType = z.infer<typeof otpSchema>;
