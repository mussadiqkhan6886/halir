import Header from "@/components/admin/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halir - Admin Dashboard",
  description: "Admin Dashboard",
  robots: {
    index: false
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
