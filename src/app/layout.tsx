import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Inter,
  Onest,
  JetBrains_Mono,
  Spectral,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const onest = Onest({ variable: "--font-onest", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const spectral = Spectral({ variable: "--font-spectral", subsets: ["latin"], weight: ["400", "500", "600"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runway Clinical Intelligence | Precision Trial Velocity & Triage",
  description:
    "Correlating clinical trial operational velocity with SEC CIK filings to surface predictive triage scores and safeguard capital runway.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${onest.variable} ${hanken.variable} ${spectral.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
