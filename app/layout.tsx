import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/font";
import { CartContextProvider } from "../context/CartContext";
import GoogleAn from "@/components/admin/GoogleAn";

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
      <head>
        <GoogleAn />
      </head>
      <CartContextProvider>
          <body className="min-h-full flex flex-col">
              {children}
          </body>
      </CartContextProvider>
    </html>
  );
}
