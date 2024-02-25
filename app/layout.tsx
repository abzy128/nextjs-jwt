import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["cyrillic-ext"] });

export const metadata: Metadata = {
  title: "News App",
  description: "Made by Abzal Orazbek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
