/*
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Notes",
  description: "One of the best notes app in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={inter.className}>{children}
      <Toaster toastOptions={{
        style : {
          textAlign : "center",
        }
      }}/>
      
      </body>
    </html>
  );
}
*/
"use client";

import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster
            toastOptions={{
              style: {
                textAlign: 'center',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
