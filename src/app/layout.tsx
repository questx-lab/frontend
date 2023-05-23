'use client'
import 'react-multi-carousel/lib/styles.css'
import './globals.css'

import { FunctionComponent, ReactNode, useEffect } from 'react'

import { StoreProvider, useStoreActions } from 'easy-peasy'

import StyledComponentsRegistry from '@/components/styled-components'
import store, { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'

const Content: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const localUser = getUserLocal()
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // hook
  useEffect(() => {
    setUser(localUser)
  }, [])

  return <>{children}</>
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <StoreProvider store={store}>
        <Content>{children}</Content>
      </StoreProvider>
    </StyledComponentsRegistry>
  )
}
