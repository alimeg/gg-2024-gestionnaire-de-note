import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fire Notes",
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
