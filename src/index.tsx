import './index.css'
import 'react-multi-carousel/lib/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

import React, { FC, ReactNode, useEffect } from 'react'

import { StoreProvider, useStoreActions } from 'easy-peasy'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import tw from 'twin.macro'

import { RouterComponent } from '@/router'
import store, { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import ThemeProvider from '@/widgets/theme/provider'
import { MetaMaskInpageProvider } from '@metamask/providers'

import reportWebVitals from './reportWebVitals'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Frame = tw.div`min-h-screen bg-white`

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const localUser = getUserLocal()

  // hook
  useEffect(() => {
    setUser(localUser)
  }, [])

  return <Frame>{children}</Frame>
}

root.render(
  <StoreProvider store={store}>
    <Content>
      <ThemeProvider>
        <RouterComponent />
        <Toaster position='top-center' reverseOrder={false} />
      </ThemeProvider>
    </Content>
  </StoreProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
