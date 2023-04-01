'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import LoginBtn from '@/components/buttons/default-btn.cpn'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreActions, useStoreState } from '@/store/store'
import { MenuBtn, MenuIcon } from '@/styles/button.style'
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

const HeaderCpn = () => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  const router = useRouter()
  const loginState = useStoreState((state) => state.userSession)
  const navBarState = useStoreState((state) => state.navBar.isOpen)

  const loginAction = useStoreActions(
    (action) => action.userSession.updateState
  )

  const navBarAction = useStoreActions((action) => action.navBar.updateState)

  const path = usePathname()
  const [navActive, setNavActive] = useState<number>(0)

  useEffect(() => {
    if (path && path.includes(RouterConst.QUESTBOARD)) {
      setNavActive(1)
    } else if (path && path.includes(RouterConst.MY_PROJECTS)) {
      setNavActive(2)
    } else {
      setNavActive(0)
    }
  }, [path])

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && !loginState.isLogin) {
      loginAction(true)
    }
    if (!accessToken && loginState.isLogin) {
      loginAction(false)
    }
  })

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
            <LinkText href={RouterConst.HOME}>
              <TitleText className={`${!navActive ? 'font-bold' : ''}`}>
                {'Explore'}
              </TitleText>
              {!navActive && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.QUESTBOARD}>
              <TitleText className={`${navActive === 1 ? 'font-bold' : ''}`}>
                {'Questboard'}
              </TitleText>
              {navActive === 1 && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.MY_PROJECTS}>
              <TitleText className={`${navActive === 2 ? 'font-bold' : ''}`}>
                {'My Projects'}
              </TitleText>
              {navActive === 2 && <Underline />}
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
          {loginState.isLogin ? (
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
      <NavBar isActive={isNavBar}>
        <NavWrap>
          <NavLink onClick={() => handleClick(RouterConst.HOME)}>
            <NavTitle>{'Explore'}</NavTitle>
            {!navActive && <NavUnderline />}
          </NavLink>
          <NavLink onClick={() => handleClick(RouterConst.QUESTBOARD)}>
            <NavTitle>{'Questboard'}</NavTitle>
            {navActive === 1 && <NavUnderline />}
          </NavLink>
          <NavLink onClick={() => handleClick(RouterConst.MY_PROJECTS)}>
            <NavTitle>{'My Projects'}</NavTitle>
            {navActive === 2 && <NavUnderline />}
          </NavLink>
        </NavWrap>
      </NavBar>
    </>
  )
}

export default HeaderCpn
