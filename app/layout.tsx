import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Test Your Knowledge - Quiz App',
  description: 'A fun and interactive quiz application to test your knowledge',
  keywords: ['Quiz', 'Knowledge', 'Test', 'Learning', 'Education'],
  authors: [{ name: 'Quiz App Developer' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}