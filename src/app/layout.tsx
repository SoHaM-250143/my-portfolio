import "./globals.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import NeonSmokeCursor from "@/components/NeonSmokeCursor";
import SocialSidebar from "@/components/SocialSidebar";
import VerticalEmail from "@/components/VerticalEmail";
import LogoLoader from "@/components/LogoLoader";
import TwinklingStars from "@/components/TwinklingStars";

export const metadata: Metadata = {
  title: "Soham Mhatre | Portfolio",
  description:
    "Portfolio of Soham Mhatre — Data Science, Web Development, and Full Stack Development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LogoLoader />
        <NeonSmokeCursor />
        <TwinklingStars />
        <SocialSidebar />
        <VerticalEmail />
        {children}
      </body>
    </html>
  );
}
