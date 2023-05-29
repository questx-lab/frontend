import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import { RouterComponent } from '@/router'
import store, { GlobalStoreModel } from '@/store/store'
import { delCookies, delUserLocal, getUserLocal } from '@/utils/helper'
import { StoreProvider, useStoreActions } from 'easy-peasy'
import './index.css'

import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Content: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  const localUser = getUserLocal()

  // hook
  useEffect(() => {
    setUser(localUser)
  }, [])

  return <>{children}</>
}

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Content>
        <RouterComponent />
      </Content>
    </StoreProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
