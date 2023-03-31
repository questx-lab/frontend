'use client'
import './globals.css'

import { ReactNode } from 'react'

import { StoreProvider } from 'easy-peasy'
import { Toaster } from 'react-hot-toast'

import StyledComponentsRegistry from '@/components/styled-components'
import store from '@/store/store'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <StoreProvider store={store}>
            {children}
            <Toaster position='top-center' reverseOrder={false} />
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
