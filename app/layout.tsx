import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/font";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CartContextProvider } from "../context/CartContext";

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
      <CartContextProvider>
          <body className="min-h-full flex flex-col">
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </body>
      </CartContextProvider>
    </html>
  );
}
