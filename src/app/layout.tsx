import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

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
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
