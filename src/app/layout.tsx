import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOODMAN GLS - Your Strategic Partner in Korea & Beyond",
  description: "As members of WCA, MPL, and EAN networks, GOODMAN GLS delivers time-critical logistics solutions with unmatched reliability across air, ocean, and project cargo.",
  keywords: "logistics, air freight, ocean freight, Korea forwarder, GSA, CSA, WCA, MPL, EAN, cargo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
