import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { NavBarEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import AuthType from '@/modules/login/auth-type'
import { GlobalStoreModel } from '@/store/store'
import { LoginBtn, MenuBtn } from '@/styles/button.style'
import { Divider, Gap, LightText, MediumText } from '@/styles/common.style'
import {
  AvatarBox,
  BoxLink,
  CreateProjectBtn,
  DesNameTxt,
  ImageLogoBox,
  LeftSession,
  LinkText,
  NavBar,
  NavLink,
  NavTitle,
  NavUnderline,
  NavWrap,
  PopItem,
  PopPanel,
  PopWrap,
  RightSession,
  TitleText,
  Underline,
  UserInfo,
  UserNameTxt,
  UserSession,
  Wrap,
} from '@/styles/header.style'
import { Popover } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

const CreateCommunity: FunctionComponent<{ isShow?: boolean }> = ({
  isShow,
}) => {
  const router = useRouter()
  if (isShow) {
    return (
      <CreateProjectBtn
        onClick={() => router.push(RouterConst.CREATE_PROJECTS)}
      >
        <PlusIcon className={'w-5 h-5 text-black'} />
        {'Create Project'}
      </CreateProjectBtn>
    )
  }

  return <></>
}

const UserInfoBox: FunctionComponent = () => {
  const path = usePathname()
  const router = useRouter()

  // data
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)

  const isShow = path ? path.includes(RouterConst.COMMUNITIES) : false

  if (isLogin && userState) {
    return (
      <>
        <CreateCommunity isShow={isShow} />
        <UserSession>
          <PopWrap>
            <Popover.Button className={'outline-0'}>
              <Image
                width={35}
                height={35}
                src={StorageConst.NOTIFICATION_ICON.src}
                alt={StorageConst.NOTIFICATION_ICON.alt}
              />
            </Popover.Button>

            <PopPanel>
              <PopItem>
                <MediumText>{'6 May 2023-09:32:23 AM'}</MediumText>
                <Gap height={2} />
                <MediumText>{'Headline'}</MediumText>
                <Gap height={2} />
                <LightText>{'Notification content'}</LightText>
                <Divider />
              </PopItem>
              <PopItem>
                <MediumText>{'6 May 2023-09:32:23 AM'}</MediumText>
                <Gap height={2} />
                <MediumText>{'Headline'}</MediumText>
                <Gap height={2} />
                <LightText>{'Notification content'}</LightText>
                <Divider />
              </PopItem>
              <PopItem>
                <MediumText>{'6 May 2023-09:32:23 AM'}</MediumText>
                <Gap height={2} />
                <MediumText>{'Headline'}</MediumText>
                <Gap height={2} />
                <LightText>{'Notification content'}</LightText>
                <Divider />
              </PopItem>
            </PopPanel>
          </PopWrap>

          <AvatarBox
            width={40}
            height={40}
            src={StorageConst.AVATAR_DEFAUL.src}
            alt={StorageConst.AVATAR_DEFAUL.alt}
          />
          <UserInfo
            onClick={() => router.push(RouterConst.USER + userState.id)}
          >
            <DesNameTxt>{'Explorer'}</DesNameTxt>
            <UserNameTxt>
              {(userState.name ?? '').split('@')[0].toUpperCase()}
            </UserNameTxt>
          </UserInfo>
        </UserSession>
      </>
    )
  }

  return (
    <LoginBtn onClick={() => router.push(RouterConst.LOGIN)}>
      {'LOGIN/SIGN UP'}
    </LoginBtn>
  )
}

const NavBarBox: FunctionComponent<{
  navActive: number
  handleClick: (value: string) => void
}> = ({ navActive, handleClick }) => {
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)

  if (isNavBar) {
    return (
      <NavBar isActive={isNavBar}>
        <NavWrap>
          <NavLink onClick={() => handleClick(RouterConst.COMMUNITIES)}>
            <NavTitle>{'Communities'}</NavTitle>
            {navActive === NavBarEnum.COMMUNITY && <NavUnderline />}
          </NavLink>
          <NavLink onClick={() => handleClick(RouterConst.QUESTBOARD)}>
            <NavTitle>{'QuesterCamp'}</NavTitle>
            {navActive === NavBarEnum.QUESTCARD && <NavUnderline />}
          </NavLink>

          <Gap height={9} />
          <Divider />
          <AuthType />
        </NavWrap>
      </NavBar>
    )
  }

  return <></>
}

const Header: FunctionComponent = () => {
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)

  const router = useRouter()

  const navBarState = useStoreState<GlobalStoreModel>((state) => state.navBar)
  const [hydrated, setHydrated] = useState(false)

  const setNavBar = useStoreActions<GlobalStoreModel>(
    (action) => action.setNavBar
  )

  const path = usePathname()
  const [navActive, setNavActive] = useState<number>(0)

  useEffect(() => {
    if (
      path &&
      (path.includes(RouterConst.COMMUNITIES) ||
        path.includes(RouterConst.PROJECT))
    ) {
      setNavActive(NavBarEnum.COMMUNITY)
    }

    if (path && path.includes(RouterConst.QUESTBOARD)) {
      setNavActive(NavBarEnum.QUESTCARD)
    }
  }, [path])

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  const handleClick = (url: string) => {
    router.push(url)
    setNavBar(false)
  }

  return (
    <>
      <Wrap>
        <LeftSession>
          <BoxLink>
            <LinkText href={RouterConst.COMMUNITIES}>
              <TitleText>{'Communities'}</TitleText>
              {navActive === NavBarEnum.COMMUNITY && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.QUESTBOARD}>
              <TitleText>{'QuesterCamp'}</TitleText>
              {navActive === NavBarEnum.QUESTCARD && <Underline />}
            </LinkText>
          </BoxLink>
          <ImageLogoBox
            width={150}
            height={100}
            onClick={() => router.push(RouterConst.HOME)}
            src={StorageConst.APP_LOGO_DIR.src}
            alt={StorageConst.APP_LOGO_DIR.alt}
          />
        </LeftSession>
        <RightSession>
          <UserInfoBox />
          <MenuBtn onClick={() => setNavBar(!navBarState)}>
            <Image
              width={40}
              height={40}
              src={
                isNavBar
                  ? StorageConst.CLOSE_ICON.src
                  : StorageConst.MENU_ICON.src
              }
              alt={
                isNavBar
                  ? StorageConst.CLOSE_ICON.alt
                  : StorageConst.MENU_ICON.alt
              }
            />
          </MenuBtn>
        </RightSession>
      </Wrap>
      <NavBarBox navActive={navActive} handleClick={handleClick} />
    </>
  )
}

export default Header
