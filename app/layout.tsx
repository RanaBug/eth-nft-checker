import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

export const metadata: Metadata = {
  title: "Eth & NFT Balance Checker",
  description: "Check your ETH and NFT balance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.variable} font-sans`}>{children}</body>
    </html>
  );
}
