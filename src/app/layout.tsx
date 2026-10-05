import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runway Clinical Intelligence | Programmatic Triage & Acquisition for Distressed Clinical Therapeutics",
  description:
    "Runway correlates real-time clinical trial velocity with SEC financial burn to identify mispriced, stalled biopharma assets and acquire them into liability-isolated Single-Asset Vehicles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
