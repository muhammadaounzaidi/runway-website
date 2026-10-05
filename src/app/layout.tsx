import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runway Clinical Intelligence | Programmatic Triage for Distressed Clinical Therapeutics",
  description:
    "Runway combines automated pharmacokinetic reconstruction with institutional underwriting to identify salvageable biopharma assets and feed dedicated Single-Asset Vehicles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
