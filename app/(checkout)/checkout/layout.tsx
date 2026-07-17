import Header from "@/components/checkout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Halir",
  description: "Checkout page",
   robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <Header />
    {children}
  </>
}
