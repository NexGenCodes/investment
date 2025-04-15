"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import InputField from "../ui/input";
import OtpAction from "@/actions/otp";
import resendOtpAction from "@/actions/resendOtp";
import { toast } from "react-hot-toast";

const TIMER_DURATION = 120;

export default function OtpForm() {
  const [otpState, otpAction, isPending] = useActionState(OtpAction, undefined);
  const [resendState, resendAction, isResending] = useActionState(
    resendOtpAction,
    undefined
  );
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setTimeLeft(TIMER_DURATION);
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, TIMER_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    timerRef.current = interval;
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (resendState) {
      if (resendState.success) {
        toast.success(resendState.message || "OTP resent successfully.");
        startTimer();
      } else {
        toast.error(resendState.message || "Failed to resend OTP.");
      }
    }
  }, [resendState, startTimer]);

  const handleResend = useCallback(() => {
    resendAction();
  }, [resendAction]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        action={otpAction}
        className="space-y-6 max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-extrabold text-center text-yellow-400 uppercase tracking-wide">
          Verify OTP
        </h1>
        <p className="text-center text-gray-400 text-sm">
          Enter the OTP sent to your registered email or phone number.
        </p>
        <InputField
          label="OTP"
          name="otp"
          placeholder="Enter OTP"
          required
          errors={otpState?.errors?.otp}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />

        {otpState?.message && (
          <p className="text-red-500 text-sm text-center mt-2">
            {otpState.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold shadow-md hover:from-blue-700 hover:to-blue-900 focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          {timeLeft > 0 ? (
            <>
              Resend OTP in{" "}
              <span className="text-yellow-400 font-semibold">
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-400 hover:text-yellow-400 hover:underline font-semibold"
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </p>
      </form>
    </div>
  );
}
