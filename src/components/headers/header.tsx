import {Wrap, LeftSession, RightSession, BoxLink, LinkText} from "@/styles/header.style";
import Image from "next/image";
import {StorageConst} from "@/constants/storage.const";
import DefaultBtnCpn from "@/components/buttons/default-btn.cpn";
import {RouterConst} from "@/constants/router.const";
import {useRouter} from "next/navigation";

const HeaderCpn = () => {
  const router = useRouter()

  return (
    <Wrap>
      <LeftSession>
        <Image className={"absolute h-full"} width={100} height={50} src={StorageConst.APP_LOGO_DIR.src} alt={StorageConst.APP_LOGO_DIR.alt}/>
        <BoxLink>
          <LinkText href={"#"}>{"Explore"}</LinkText>
          <LinkText href={"#"}>{"Questboard"}</LinkText>
          <LinkText href={"#"}>{"My Projects"}</LinkText>
        </BoxLink>
      </LeftSession>
      <RightSession>
        <DefaultBtnCpn onClick={()=>router.push(RouterConst.LOGIN)} text={"Login / sign up".toUpperCase()}/>
      </RightSession>
    </Wrap>
  )
}

export default HeaderCpn