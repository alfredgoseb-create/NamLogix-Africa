import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NamLogix Africa – Logistics & Aviation Marketplace',
  description: 'Connect, Ship, Trade – The most trusted logistics & aviation marketplace in Namibia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
      </body>
    </html>
  )
}