import "./globals.css";
import Navbar from "@/app/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NamLogix Africa",
  description: "Logistics & Trade Platform for Namibia and Southern Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        
        {/* 🔥 GLOBAL NAVBAR */}
        <Navbar />

        {/* 🔥 PAGE CONTENT */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>

        {/* 🔥 FOOTER */}
        <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
          <p className="text-sm">
            © {new Date().getFullYear()} NamLogix Africa — Connecting Southern African Trade
          </p>
        </footer>

      </body>
    </html>
  );
}