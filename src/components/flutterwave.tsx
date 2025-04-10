"use client";

import { User } from "@prisma/client";

interface Props {
  user?: User;
  amount?: number;
}

export default function Flutterwave({ user, amount = 1000 }: Props) {
  // Early return if no user
  if (!user) return null;

  // Handle deposit payment
  // const handleDeposit = () => {
  //   handleFlutterPayment({
  //     callback: async (response) => {
  //       console.log("Deposit Response:", response);
  //       if (response.status === "successful") {
  //         try {
  //           const verification = await fetch(
  //             `/api/verify-payment?transaction_id=${response.transaction_id}`
  //           ).then((res) => res.json());
  //           console.log("Deposit Verification Result:", verification);
  //           // Optionally: Update user's balance in your database here
  //         } catch (error) {
  //           console.error("Deposit verification failed:", error);
  //         }
  //       }
  //       closePaymentModal();
  //     },
  //     onClose: () => {
  //       console.log("Deposit modal closed");
  //     },
  //   });
  // };

  // Handle withdrawal request (client-side trigger for server-side action)
  // const handleWithdrawal = async () => {
  //   try {
  //     const withdrawalAmount = amount;
  //     const response = await fetch("/api/withdraw", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         amount: withdrawalAmount,
  //       }),
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("Withdrawal initiated:", result);
  //       alert("Withdrawal request submitted!");
  //     } else {
  //       console.error("Withdrawal failed:", result);
  //       alert("Withdrawal failed: " + result.error);
  //     }
  //   } catch (error) {
  //     console.error("Withdrawal error:", error);
  //     alert("An error occurred during withdrawal.");
  //   }
  // };

  return (
    <div>
      <button
        // onClick={handleDeposit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f5a623",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Deposit {amount} NGN
      </button>
      <button
        // onClick={handleWithdrawal}
        style={{
          padding: "10px 20px",
          backgroundColor: "#e63946",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Withdraw {amount} NGN
      </button>
    </div>
  );
}
