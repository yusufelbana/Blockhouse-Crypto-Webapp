import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import QueryProvider from "./components/QueryProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Price Tracker",
  description: "Work Trial For Blockhouse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased  bg-gradient-to-b from-dark-purple to-light-purple text-white`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
