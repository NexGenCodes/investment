/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    auth?: Session | null; // For session-based auth
    // auth?: JWT | null; // Uncomment if using JWT instead
  }
}