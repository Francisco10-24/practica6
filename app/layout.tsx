import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "../components/Navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Reservas - ESEN",
  description: "Guía 6 de Desarrollo Web II",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
      
        <Nav /> 
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}