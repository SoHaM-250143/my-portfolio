import "@/styles/globals.css";
import NeonSmokeCursor from "@/components/NeonSmokeCursor";
import ParticlesBg from "@/components/ParticlesBg";

export const metadata = {
  title: "Soham Mhatre Portfolio",
  description: "Netflix style personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Global background effects */}
        <ParticlesBg />
        <NeonSmokeCursor />

        {/* Global page fade wrapper */}
        <div className="page-fade">
          {children}
        </div>
      </body>
    </html>
  );
}
