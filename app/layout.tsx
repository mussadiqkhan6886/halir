import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/font";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <SmoothScroll>
        <body className="min-h-full flex flex-col">{children}</body>
      </SmoothScroll>
    </html>
  );
}
