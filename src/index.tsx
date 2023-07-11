import './index.css'
import 'react-multi-carousel/lib/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

import React, { FC, ReactNode, useEffect } from 'react'

import { StoreProvider, useStoreActions } from 'easy-peasy'
import ReactDOM from 'react-dom/client'
import ReactGa from 'react-ga4'
import TagManager from 'react-gtm-module'
import { Toaster } from 'react-hot-toast'

import { EnvVariables } from '@/constants/env.const'
import reportWebVitals from '@/reportWebVitals'
import { RouterComponent } from '@/router'
import store, { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const localUser = getUserLocal()

  // hook
  useEffect(() => {
    // Initialized Google Analytics
    ReactGa.initialize(EnvVariables.GA_MEASUREMENT_ID)
    TagManager.initialize({ gtmId: EnvVariables.GMT_ID })

    setUser(localUser)
  }, [])

  return <>{children}</>
}

root.render(
  <StoreProvider store={store}>
    <Content>
      <RouterComponent />
      <Toaster position='top-center' reverseOrder={false} />
    </Content>
  </StoreProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
