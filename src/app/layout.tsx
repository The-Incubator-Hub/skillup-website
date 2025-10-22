// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillUp",
  description: "Upskill yourself to thrive in Africa's digital future today.",
  icons: {
    icon: "/favicon.png", // This applies site-wide
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fallback for browsers that don’t read metadata */}
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
