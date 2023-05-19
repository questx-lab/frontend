'use client'
import './globals.css'
import 'react-multi-carousel/lib/styles.css'

import { ReactNode } from 'react'

import { StoreProvider } from 'easy-peasy'

import StyledComponentsRegistry from '@/components/styled-components'
import store from '@/store/store'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <StoreProvider store={store}>{children}</StoreProvider>
    </StyledComponentsRegistry>
  )
}
