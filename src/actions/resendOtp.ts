"use server";

import { sendOtp } from "@/email/email";
import { setToCache, getFromCache, deleteFromCache } from "@/lib/cache";
import { deleteCookie, getCookie } from "@/lib/cookies";
import { otp } from "@/lib/utils";
import { SignUpType } from "@/types/authSchema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type ResendOtpState = {
    message?: string;
    success?: boolean;
};

type SessionData = {
    userData: SignUpType;
    otp: string;
    userAgent: string;
};

export default async function resendOtpAction(): Promise<ResendOtpState> {
    const sessionId = await getCookie("otp_session");
    if (!sessionId) {
        return { message: "Session not found. Please try signing up again.", success: false };
    }

    const data = getFromCache<SessionData>(sessionId);
    if (!data) {
        deleteFromCache(sessionId);
        deleteFromCache(`last_otp_${sessionId}`);
        await deleteCookie("otp_session");
        redirect("/auth/register");
    }

    const userAgent = (await headers()).get("user-agent") || "unknown";
    if (data.userAgent !== userAgent) {
        return { message: "Session validation failed. Please try signing up again.", success: false };
    }

    const lastSent = getFromCache<number>(`last_otp_${sessionId}`);
    if (lastSent && Date.now() - lastSent < 120_000) {
        return { message: "Please wait 2 minutes before requesting another OTP.", success: false };
    }


    const newOtpCode = otp(6);
    const isCached = setToCache(sessionId, { userData: data.userData, otp: newOtpCode, userAgent }, 300);
    if (!isCached) {
        return { message: "An error occurred while updating your OTP.", success: false };
    }

    setToCache(`last_otp_${sessionId}`, Date.now(), 120);
    const isSent = await sendOtp(data.userData.email, newOtpCode);
    if (!isSent) {
        return { message: "An error occurred while sending your OTP.", success: false };
    }

    return { message: "OTP resent successfully.", success: true };
}