import { Montserrat } from 'next/font/google'
import { Providers } from "@/app/Providers.js"
import './globals.css'

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
})

export const metadata = {
    title: 'Nexus Dashboard | Portfolio Showcase',
    description: 'A modern portfolio dashboard built with Next.js, HeroUI, and Tailwind CSS',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark max-w-screen overflow-x-hidden" style={{ colorScheme: 'dark' }}>
        <body className={`${montserrat.className} dark`}>
        <Providers>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-content1">
                {children}
            </div>
        </Providers>
        </body>
        </html>
    )
}