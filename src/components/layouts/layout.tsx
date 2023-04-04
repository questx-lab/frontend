import { ReactNode } from 'react'

import { Toaster } from 'react-hot-toast'

import Header from '@/components/headers/header'
import { useStoreState } from '@/store/store'
import { Html, Main } from '@/styles/layout.style'

const Layout = ({ children }: { children: ReactNode }) => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  return (
    <Html lang='en' isOpen={isNavBar}>
      <body>
        <Main>
          {children}
          <Header />
        </Main>
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </Html>
  )
}

export default Layout
