import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SlateX - AI Study Platform',
  description: 'Created by Athie - Your ultimate AI-powered study companion',
  keywords: 'AI study, notes generator, mind maps, flashcards, medical study, learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-gray-950">
            {/* Sidebar Navigation */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header with Progress */}
              <Header />
              
              {/* Page Content */}
              <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  )
}