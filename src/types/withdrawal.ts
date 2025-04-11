import { z } from "zod";

const withdrawalSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1000, "Amount must be at least 1000")
    .positive("Amount must be positive"),
  bankCode: z.string().min(1, "Bank code is required"),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
});

const accountVerificationSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    account_number: z.string(),
    account_name: z.string(),
    bank_id: z.number(),
  }),
});

const transferResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    reference: z.string(),
    amount: z.number(),
    status: z.string(),
  }),
});

const bankSchema = z.array(
  z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
  })
);

export type Withdrawal = z.infer<typeof withdrawalSchema>;
export default withdrawalSchema;
export { accountVerificationSchema, transferResponseSchema, bankSchema };
