'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import DefaultBtnCpn from '@/components/buttons/default-btn.cpn'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreActions, useStoreState } from '@/store/store'
import {
  AvatarBox,
  BoxLink,
  DesNameTxt,
  ImageLogoBox,
  LeftSession,
  LinkText,
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
  const router = useRouter()
  const loginState = useStoreState((state) => state.userSession)
  const loginAction = useStoreActions(
    (action) => action.userSession.updateState
  )

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

  return (
    <Wrap>
      <LeftSession>
        <ImageLogoBox
          width={150}
          height={100}
          src={StorageConst.APP_LOGO_DIR.src}
          alt={StorageConst.APP_LOGO_DIR.alt}
        />
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
          <DefaultBtnCpn
            onClick={() => router.push(RouterConst.LOGIN)}
            text={'Login / sign up'.toUpperCase()}
          />
        )}
      </RightSession>
    </Wrap>
  )
}

export default HeaderCpn
