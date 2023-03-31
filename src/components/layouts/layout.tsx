import { ReactNode } from 'react'

import HeaderCpn from '@/components/headers/header'
import { useStoreState } from '@/store/store'
import { Main } from '@/styles/layout.style'

const LayoutCpn = ({ children }: { children: ReactNode }) => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  return (
    <Main>
      {children}
      <HeaderCpn />
    </Main>
  )
}

export default LayoutCpn
