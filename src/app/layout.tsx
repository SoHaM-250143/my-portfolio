import "./globals.css";
import type { Metadata } from "next";
import UnderUpdation from "@/components/UnderUpdation";

export const metadata: Metadata = {
  title: "Soham Mhatre | Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* UNDER UPDATION OVERLAY */}
        <UnderUpdation />

        {/* ACTUAL WEBSITE (HIDDEN UNDER OVERLAY) */}
        {children}
      </body>
    </html>
  );
}
