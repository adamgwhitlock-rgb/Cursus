import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cursus — The AI-Powered Super-Curricular Roadmap",
  description:
    "Cursus turns super-curricular reading into a structured, AI-coached sprint. Built for UCAS and the Common App alike.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
  <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
    <body className="bg-ink text-ivory font-sans">{children}</body>
  </html>
</ClerkProvider>
  );
}
