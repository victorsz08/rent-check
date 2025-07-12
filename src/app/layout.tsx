import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Buscar Ofertas PME",
};

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
