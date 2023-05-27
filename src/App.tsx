import store, { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import { StoreProvider, useStoreActions } from 'easy-peasy'
import { FunctionComponent, ReactNode, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RouterComponent } from './router'

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

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Content>
          <RouterComponent />
        </Content>
      </BrowserRouter>
    </StoreProvider>
  )
}
