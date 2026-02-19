import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CloudPod SLZ - Loja Online | Entrega em Sao Luis",
  description:
    "CloudPod SLZ - Sua loja digital em Sao Luis do Maranhao. Produtos premium com entrega rapida para toda a cidade. Frete acessivel e atendimento personalizado. Compre online com seguranca.",
  keywords: ["loja online", "sao luis", "maranhao", "entrega rapida", "cloudpod", "produtos premium"],
  authors: [{ name: "CloudPod SLZ" }],
  creator: "CloudPod SLZ",
  publisher: "CloudPod SLZ",
  category: "shopping",
  classification: "Shopping",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "CloudPod SLZ - Loja Online em Sao Luis",
    description: "Sua loja digital com entrega rapida em Sao Luis do Maranhao. Produtos de qualidade com atendimento personalizado.",
    url: "https://www.cloudpodslz.shop",
    siteName: "CloudPod SLZ",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
