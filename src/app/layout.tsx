// src/app/layout.tsx
import '@/style/globals.css';
import { ToastProvider } from '../components/ui/toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider } from '../context/AuthContex'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solar Investment',
  description: 'Invest in a sustainable future with solar energy projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Ensure ToastProvider wraps everything */}
        <ToastProvider>
          <AuthProvider>
          <Navbar />
            {children}
            
          </AuthProvider>
          {/* The Toaster component should be placed within ToastProvider */}
          <Toaster position="top-right" />
        </ToastProvider>
      </body>
    </html>
  )
}
