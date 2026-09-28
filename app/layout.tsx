import type { Metadata, Viewport } from "next";
import { Barlow, Public_Sans } from "next/font/google";
import "./globals.css";

// Public Sans is a variable font on Google Fonts, so all weights used (400/600/700) come from one file.
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

// Barlow only ships static weights; the design uses SemiBold (600) for the h4 headings.
const barlow = Barlow({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TJ Labs",
    template: "%s · TJ Labs",
  },
  description: "Sign in and number generator screens rebuilt 1:1 from Figma.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${publicSans.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
