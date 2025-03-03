// Define the result structure for API responses
interface ApiResponse {
  success: boolean;
  message: string;
}

// Define supported payment and withdrawal methods
export enum PaymentMethod {
  CARD = "Card",
  PAYPAL = "PayPal",
  CRYPTO = "Crypto",
  BANK_TRANSFER = "Bank Transfer",
}

export enum WithdrawalMethod {
  CARD = "Card",
  PAYPAL = "PayPal",
  CRYPTO = "Crypto",
  BANK_TRANSFER = "Bank Transfer",
}

// Helper function to validate the amount
const isValidAmount = (amount: number): boolean => {
  return amount > 0 && !isNaN(amount);
};

// Simulated deposit function
export const depositFunds = async (
  amount: number,
  paymentMethod: PaymentMethod
): Promise<ApiResponse> => {
  return new Promise<ApiResponse>((resolve) => {
    setTimeout(() => {
      if (isValidAmount(amount)) {
        resolve({
          success: true,
          message: `Deposit of $${amount} successful using ${paymentMethod}`,
        });
      } else {
        resolve({ success: false, message: "Deposit failed. Invalid amount." });
      }
    }, 1000);
  });
};

// Simulated withdrawal function
export const withdrawFunds = async (
  amount: number,
  withdrawalMethod: WithdrawalMethod
): Promise<ApiResponse> => {
  return new Promise<ApiResponse>((resolve) => {
    setTimeout(() => {
      if (isValidAmount(amount)) {
        resolve({
          success: true,
          message: `Withdrawal of $${amount} successful via ${withdrawalMethod}`,
        });
      } else {
        resolve({ success: false, message: "Withdrawal failed. Invalid amount." });
      }
    }, 1000);
  });
};
