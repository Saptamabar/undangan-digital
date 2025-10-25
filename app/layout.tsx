import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair', // Variabel ini digunakan di globals.css
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato', // Variabel ini digunakan di globals.css
})

export const metadata: Metadata = {
  title: 'The Wedding of Amara & Jonathan',
  description: 'Kami mengundang Anda untuk merayakan hari bahagia kami.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}