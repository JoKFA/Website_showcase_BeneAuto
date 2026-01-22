import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bene Auto Rentals | Drive Toronto. Your Way.",
  description:
    "Quality car rentals in Toronto with transparent pricing and winter-ready fleet. Economy to premium vehicles available for daily, weekly, and monthly rentals.",
  keywords: [
    "car rental Toronto",
    "rent a car Toronto",
    "Toronto car hire",
    "winter tires rental",
    "SUV rental Toronto",
  ],
  openGraph: {
    title: "Bene Auto Rentals | Drive Toronto. Your Way.",
    description:
      "Quality car rentals in Toronto with transparent pricing and winter-ready fleet.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} antialiased`}>
        <div className="flex min-h-screen flex-col bg-white text-neutral-900">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
