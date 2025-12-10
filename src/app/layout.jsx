import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'HabiGestor - Panel de Administración',
  description: 'Sistema de administración de condominios y edificios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
