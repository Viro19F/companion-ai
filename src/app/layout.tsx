import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Companion — AI Agent Marketplace",
    template: "%s | Companion",
  },
  description:
    "Discover, subscribe to, and deploy AI agents that automate your work. Build your personal AI team on Companion.",
  keywords: ["AI agents", "marketplace", "automation", "artificial intelligence"],
  authors: [{ name: "Companion AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://companion.ai",
    siteName: "Companion",
    title: "Companion — AI Agent Marketplace",
    description: "AI agents that actually work for you",
  },
  twitter: {
    card: "summary_large_image",
    title: "Companion — AI Agent Marketplace",
    description: "AI agents that actually work for you",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
