// lib/flutterwave.tsx
import { User } from "@prisma/client";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";

interface Props {
  user: User | null;
  amount: number;
}

export default function Flutterwave(data: Props): FlutterwaveConfig {
  const { user, amount } = data;
  const fallbackUser = {
    id: "guest",
    email: "testuser@example.com",
    firstName: null,
    lastName: null,
    currency: "NGN",
  };
  const effectiveUser = user ?? fallbackUser;

  return {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY as string,
    tx_ref: `tx_deposit_${Date.now()}_${effectiveUser.id}`,
    amount,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: effectiveUser.email ?? "testuser@example.com",
      phone_number: "08012345678",
      name:
        `${effectiveUser.firstName ?? ""} ${
          effectiveUser.lastName ?? ""
        }`.trim() || "Test User",
    },
    customizations: {
      title: "Deposit",
      description: "Fund your account with Flutterwave",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
}
