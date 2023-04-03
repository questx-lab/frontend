import { ReactNode } from 'react'

import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import { useStoreState } from '@/store/store'
import { Html } from '@/styles/layout.style'

const LayoutDefaultCpn = ({ children }: { children: ReactNode }) => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  return (
    <Html lang='en' isOpen={isNavBar}>
      <body>
        <Head>
          <meta name='viewport' content='viewport-fit=cover' />
        </Head>
        {children}
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </Html>
  )
}

export default LayoutDefaultCpn
