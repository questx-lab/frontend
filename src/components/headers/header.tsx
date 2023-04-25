import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { LoginBtn } from '@/components/buttons/default-btn.cpn'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import AuthType from '@/modules/login/auth-type'
import { useStoreActions, useStoreState } from '@/store/store'
import { MenuBtn } from '@/styles/button.style'
import { Divider, Gap, LightText, MediumText } from '@/styles/common.style'
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

const Header = () => {
  const isNavBar = useStoreState((state) => state.navBar.isOpen)

  const router = useRouter()
  const isLogin = useStoreState((state) => state.userSession.isLogin)
  const userState = useStoreState((state) => state.userSession.user)
  const navBarState = useStoreState((state) => state.navBar.isOpen)
  const [hydrated, setHydrated] = useState(false)

  const navBarAction = useStoreActions((action) => action.navBar.updateState)

  const path = usePathname()
  const [navActive, setNavActive] = useState<number>(0)

  useEffect(() => {
    if (path && path.includes(RouterConst.EXPLORE)) {
      setNavActive(1)
    }
    if (
      path &&
      (path.includes(RouterConst.MY_PROJECTS) ||
        path.includes(RouterConst.PROJECT))
    ) {
      setNavActive(2)
    }

    if (path && path.includes(RouterConst.QUESTBOARD)) {
      setNavActive(3)
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
    navBarAction(false)
  }

  return (
    <>
      <Wrap>
        <LeftSession>
          <BoxLink>
            <LinkText href={RouterConst.EXPLORE}>
              <TitleText className={`font-medium`}>{'Explore'}</TitleText>
              {navActive === 1 && <Underline />}
            </LinkText>

            <LinkText href={RouterConst.MY_PROJECTS}>
              <TitleText className={`font-medium`}>{'Communities'}</TitleText>
              {navActive === 2 && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.QUESTBOARD}>
              <TitleText className={`font-medium`}>{'QuesterCamp'}</TitleText>
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
              {userState && (
                <UserInfo
                  onClick={() => router.push(RouterConst.USER + userState.id)}
                >
                  <DesNameTxt>{'Explorer'}</DesNameTxt>
                  <UserNameTxt>
                    {(userState.name ?? '').split('@')[0].toUpperCase()}
                  </UserNameTxt>
                </UserInfo>
              )}
            </UserSession>
          ) : (
            <LoginBtn
              onClick={() => router.push(RouterConst.LOGIN)}
              text={'Login / sign up'.toUpperCase()}
            />
          )}
          <MenuBtn onClick={() => navBarAction(!navBarState)}>
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
      {isNavBar && (
        <NavBar isActive={isNavBar}>
          <NavWrap>
            <NavLink onClick={() => handleClick(RouterConst.EXPLORE)}>
              <NavTitle>{'Explore'}</NavTitle>
              {navActive === 1 && <NavUnderline />}
            </NavLink>
            <NavLink onClick={() => handleClick(RouterConst.MY_PROJECTS)}>
              <NavTitle>{'Communities'}</NavTitle>
              {navActive === 2 && <NavUnderline />}
            </NavLink>
            <NavLink onClick={() => handleClick(RouterConst.QUESTBOARD)}>
              <NavTitle>{'QuesterCamp'}</NavTitle>
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
