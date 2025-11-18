// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import Providers from './Providers' // ✅ 1. IMPORT PROVIDERS

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'The Wedding of Rivaldi & Marisa', 
  description: 'Undangan Pernikahan Mohammad Trisda Rivaldi & Marisa Prima Putri.',
  keywords: 'undangan pernikahan, wedding invitation, trisda dan marisa, the wedding',

  openGraph: {
    title: 'The Wedding of Rivaldi & Marisa',
    description: 'Kami mengundang Anda untuk merayakan hari bahagia kami.',
    url: 'https://undangan-anda.com', // Ganti dengan URL asli Anda saat deploy
    images: [
      {
        url: '/og-image.jpg', // Pastikan file ini ada di folder /public
        width: 1200,
        height: 630,
        alt: 'Trisda & Marisa Wedding Invitation',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        {/* ✅ 2. BUNGKUS CHILDREN DENGAN PROVIDERS */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}