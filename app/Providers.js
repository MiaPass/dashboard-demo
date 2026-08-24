'use client';
import { HeroUIProvider } from '@heroui/react'

import './globals.css'

export function Providers({ children }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}