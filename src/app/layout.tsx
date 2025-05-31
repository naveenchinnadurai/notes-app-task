import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/appContext"
import favicon from '@/app/notes.png'
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NotesApp - Simple Note Taking",
  description: "A clean and simple note taking application built with Next.js and Redux",
  keywords: ["notes", "note taking", "productivity", "simple"],
  authors: [{ name: "NotesApp" }],
  openGraph: {
    title: "NotesApp - Simple Note Taking",
    description: "A clean and simple note taking application",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
