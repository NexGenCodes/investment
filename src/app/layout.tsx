import "@/style/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navs/Navbar";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Solar Investment",
  description: "Invest in a sustainable future with solar energy projects",
  icons: {
    icon: "/images/favicon-32x32.png",
    shortcut: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
