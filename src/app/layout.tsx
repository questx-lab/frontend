'use client'
import './globals.css'

import { ReactNode } from 'react'

import { StoreProvider } from 'easy-peasy'
import { SessionProvider } from 'next-auth/react'

import StyledComponentsRegistry from '@/components/styled-components'
import store from '@/store/store'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <SessionProvider>
        <StoreProvider store={store}>{children}</StoreProvider>
      </SessionProvider>
    </StyledComponentsRegistry>
  )
}
