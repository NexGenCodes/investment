"use client";

import { useActionState } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import InputField from "../ui/input";
import OtpAction from "@/actions/otp";
import resendOtpAction from "@/actions/resendOtp";
import { toast } from "react-hot-toast";
import { decrypt } from "@/lib/encrypt";
import { useRouter } from "next/navigation";

const TIMER_DURATION = 100;

export default function OtpForm() {
  const [otpState, otpAction, otpPending] = useActionState(
    OtpAction,
    undefined
  );
  const [resendState, resendAction, resendPending] = useActionState(
    resendOtpAction,
    undefined
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [sessionID, setSessionID] = useState("");
  const router = useRouter();

  // Start the OTP resend timer
  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const sessionIDSet = useCallback(async () => {
    const encryptedSession = sessionStorage.getItem("x-sessionId");
    if (encryptedSession) {
      const { iv, encrypted } = JSON.parse(encryptedSession);
      const sessionId = await decrypt(encrypted, iv);
      if (sessionId) {
        setSessionID(sessionId as string);
      } else {
        console.log(sessionId)
        router.push("/auth/register");
      }
    } else {
      console.log(encryptedSession)
      router.push("/auth/register");
    }
  }, [router]);

  useEffect(() => {
    sessionIDSet().catch((error) => {
      console.error({ message: "error getting the sessionid", error });
    });
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionIDSet, startTimer]);

  // Handle resend OTP success or error
  useEffect(() => {
    if (resendState?.error) {
      toast.error(resendState.error);
    }
    if (resendState?.success) {
      toast.success("New OTP sent successfully");
      startTimer();
    }
  }, [resendState, startTimer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="space-y-6 max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-yellow-400 uppercase tracking-wide">
          Verify OTP
        </h1>
        <p className="text-center text-gray-400 text-sm">
          Enter the OTP sent to your registered email or phone number.
        </p>
        <form action={otpAction} className="space-y-4">
          <InputField
            label="OTP"
            name="otp"
            placeholder="Enter OTP"
            required
            errors={otpState?.errors?.otp}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <input
            name="sessionId"
            required
            hidden
            defaultValue={sessionID}
            readOnly
          />
          {otpState?.error && (
            <p className="text-red-500 text-sm text-center">{otpState.error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold shadow-md hover:from-blue-700 hover:to-blue-900 focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
            disabled={otpPending}
          >
            {otpPending ? "Verifying..." : "Verify"}
          </button>
        </form>
        <form action={resendAction} className="text-center">
          <input
            name="sessionId"
            required
            hidden
            defaultValue={sessionID}
            readOnly
          />
          {timeLeft > 0 ? (
            <p className="text-gray-400 text-sm">
              Resend OTP in{" "}
              <span className="text-yellow-400 font-semibold">
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              type="submit"
              className="text-blue-400 hover:text-yellow-400 hover:underline font-semibold"
              disabled={resendPending}
            >
              {resendPending ? "Resending..." : "Resend OTP"}
            </button>
          )}
          {resendState?.error && (
            <p className="text-red-500 text-sm mt-2">{resendState.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
