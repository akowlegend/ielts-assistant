import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "IELTS Assistant from Akramjon — AI yordamida IELTS'ga tayyorgarlik",
    template: "%s | IELTS Assistant from Akramjon",
  },
  description:
    "Reading, Listening, Writing, Speaking va CEFR darajasini AI yordamida baholovchi ozbek tilidagi IELTS tayyorgarlik platformasi.",
  openGraph: {
    title: "IELTS Assistant from Akramjon",
    description: "AI yordamida IELTS'ga tayyorgarlik — Learn Smarter. Practice Better. Achieve More.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="font-inter min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
