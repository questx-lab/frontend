import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { LoginBtn } from '@/components/buttons/default-btn.cpn'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import AuthType from '@/modules/login/auth-type'
import { useStoreActions, useStoreState } from '@/store/store'
import { MenuBtn, MenuIcon } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  AvatarBox,
  BoxLink,
  DesNameTxt,
  ImageLogoBox,
  LeftSession,
  LinkText,
  NavBar,
  NavLink,
  NavTitle,
  NavUnderline,
  NavWrap,
  RightSession,
  TitleText,
  Underline,
  UserInfo,
  UserNameTxt,
  UserSession,
  Wrap,
} from '@/styles/header.style'
import { delCookies, getAccessToken } from '@/utils/helper'

const Header = () => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  const router = useRouter()
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const navBarState = useStoreState((state) => state.navBar.isOpen)
  const [hydrated, setHydrated] = useState(false)

  const loginAction = useStoreActions(
    (action) => action.userSession.updateState
  )

  const navBarAction = useStoreActions((action) => action.navBar.updateState)

  const path = usePathname()
  const [navActive, setNavActive] = useState<number>(0)

  useEffect(() => {
    if (path && path.includes(RouterConst.EXPLORE)) {
      setNavActive(1)
    }
    if (path && path.includes(RouterConst.QUESTBOARD)) {
      setNavActive(2)
    }

    if (path && path.includes(RouterConst.MY_PROJECTS)) {
      setNavActive(3)
    }
  }, [path])

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && !isLogin) {
      loginAction(true)
    }
    if (!accessToken && isLogin) {
      loginAction(false)
    }
  })

  if (!hydrated) {
    return null
  }
  const handleLogout = () => {
    loginAction(false)
    delCookies()
  }

  const handleClick = (url: string) => {
    router.push(url)
    navBarAction(false)
  }

  return (
    <>
      <Wrap>
        <LeftSession>
          <BoxLink>
            <LinkText href={RouterConst.EXPLORE}>
              <TitleText className={`${navActive === 1 ? 'font-bold' : ''}`}>
                {'Explore'}
              </TitleText>
              {navActive === 1 && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.QUESTBOARD}>
              <TitleText className={`${navActive === 2 ? 'font-bold' : ''}`}>
                {'Questboard'}
              </TitleText>
              {navActive === 2 && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.MY_PROJECTS}>
              <TitleText className={`${navActive === 3 ? 'font-bold' : ''}`}>
                {'My Projects'}
              </TitleText>
              {navActive === 3 && <Underline />}
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
          {isLogin ? (
            <UserSession>
              <Image
                width={35}
                height={35}
                src={StorageConst.NOTIFICATION_ICON.src}
                alt={StorageConst.NOTIFICATION_ICON.alt}
              />
              <AvatarBox
                width={40}
                height={40}
                src={StorageConst.AVATAR_DEFAUL.src}
                alt={StorageConst.AVATAR_DEFAUL.alt}
              />
              <UserInfo onClick={handleLogout}>
                <DesNameTxt>{'Explorer'}</DesNameTxt>
                <UserNameTxt>{'Billy Pham'.toUpperCase()}</UserNameTxt>
              </UserInfo>
            </UserSession>
          ) : (
            <LoginBtn
              onClick={() => router.push(RouterConst.LOGIN)}
              text={'Login / sign up'.toUpperCase()}
            />
          )}
          <MenuBtn onClick={() => navBarAction(!navBarState)}>
            <MenuIcon
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
      {isNavBar && (
        <NavBar isActive={isNavBar}>
          <NavWrap>
            <NavLink onClick={() => handleClick(RouterConst.EXPLORE)}>
              <NavTitle>{'Explore'}</NavTitle>
              {navActive === 1 && <NavUnderline />}
            </NavLink>
            <NavLink onClick={() => handleClick(RouterConst.QUESTBOARD)}>
              <NavTitle>{'Questboard'}</NavTitle>
              {navActive === 2 && <NavUnderline />}
            </NavLink>
            <NavLink onClick={() => handleClick(RouterConst.MY_PROJECTS)}>
              <NavTitle>{'My Projects'}</NavTitle>
              {navActive === 3 && <NavUnderline />}
            </NavLink>
            <Gap height={9} />
            <Divider />
            <AuthType />
          </NavWrap>
        </NavBar>
      )}
    </>
  )
}

export default Header
