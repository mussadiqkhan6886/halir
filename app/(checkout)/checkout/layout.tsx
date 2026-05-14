import Header from "@/components/checkout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Halir",
  description: "Checkout page",
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
