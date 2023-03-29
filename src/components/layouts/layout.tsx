import {ReactNode} from "react";
import HeaderCpn from "@/components/headers/header";
import {Main} from "@/styles/layout.style";
import {SessionProvider} from "next-auth/react";

const LayoutCpn = ({children}: {
  children: ReactNode
})=>{
  return (
      <Main>
        <HeaderCpn/>
        {children}
      </Main>
  )
}

export default LayoutCpn
