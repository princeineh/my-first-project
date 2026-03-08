import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WardSoccer.ng — Grassroots Football",
  description: "The largest grassroots football ecosystem in Africa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body style={{ background: "var(--background)", color: "var(--text)" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
