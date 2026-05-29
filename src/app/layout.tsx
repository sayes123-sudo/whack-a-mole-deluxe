import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "地鼠大作戰 Deluxe",
  description: "A production-ready Whack-a-Mole arcade game built by Codex.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-arcadeBg text-white">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,102,204,0.04),transparent),radial-gradient(circle_at_90%_90%,rgba(51,255,255,0.03),transparent)] pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
