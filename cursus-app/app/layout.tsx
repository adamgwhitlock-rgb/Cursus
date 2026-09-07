import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import IntroTour from "@/components/IntroTour";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cursus — University Admissions Command Center",
  description: "Super-curricular sprints and AI interview preparation for global candidates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="bg-zinc-950 text-zinc-100 font-sans min-h-screen selection:bg-amber-500 selection:text-amber-950">
          {/* Persistent global navigation header */}
          <Navbar />
          
          {/* Main application content */}
          <main>{children}</main>

          {/* First-time visitor onboarding tour overlay */}
          <IntroTour />
        </body>
      </html>
    </ClerkProvider>
  );
}
