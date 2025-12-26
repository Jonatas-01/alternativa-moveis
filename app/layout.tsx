import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alternativa Móveis",
  description: "Loja para seu ambiente escolar ou de escritório, com móveis de qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${syne.variable} antialiased`}
      >
        <Header />
        {children}
        <div className="bg-[var(--primary)] text-white">
          <div className="container mx-auto px-6 md:px-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
