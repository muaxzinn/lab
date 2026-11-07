import type { Metadata } from "next";
import { Sarabun, Prompt, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

const prompt = Prompt({
  variable: "--font-prompt",
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interactive Learning Platform | แพลตฟอร์มการเรียนรู้แบบโต้ตอบ",
  description:
    "Production-grade interactive learning platform with scientific simulations, virtual laboratory, and mathematical visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body
        className={`${sarabun.variable} ${prompt.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
