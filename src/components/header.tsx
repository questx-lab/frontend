import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { AuthEnum } from '@/constants/common.const'
import { NavBarEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import InviteCommunity from '@/modules/community/invite-community'
import AuthType from '@/modules/login/auth-type'
import Login from '@/modules/login/login'
import { GlobalStoreModel } from '@/store/store'
import { AuthBox, LoginBtn, MenuBtn, SignUpBtn } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  AvatarBox,
  Body,
  BoxLink,
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
  UserSession,
  Wrap,
} from '@/styles/header.style'
import { ModalBox } from '@/styles/modal.style'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { UserType } from '@/utils/type'
import { BaseModal, BasicModal } from '@/widgets/modal'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { Popover } from '@headlessui/react'
import { GiftIcon } from '@heroicons/react/24/outline'

const UserBox = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-2
  gap-3
`

const Avatar = styled(Image)(
  () => tw`
  rounded-full
`
)

const NameText = tw.p`
  text-xl
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]
`

const LvBox = tw.div`
  bg-teal
  rounded-full
  px-3
  text-sm
  font-medium
  text-white
  flex
  justify-center
  items-center
`

const RowBox = tw(HorizontalCenter)`
  gap-1

`

const OptionxBox = tw.div`
  w-full
  text-lg
  font-normal
  text-gray-700
  p-2
  px-3
  rounded-lg
  hover:bg-primary-100
`

const UserPopover: FunctionComponent = () => {
  // hook
  const router = useRouter()

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleLogout = () => {
    router.push(RouterConst.HOME)
    setUser(undefined)
    delCookies()
    clearLocalStorage()
  }

  return (
    <PopWrap>
      <Popover.Button className={'outline-0'}>
        <AvatarBox
          width={40}
          height={40}
          src={'/images/dummy/1.svg'}
          alt={StorageConst.AVATAR_DEFAUL.alt}
        />
      </Popover.Button>
      <PopPanel>
        <PopItem>
          <UserBox>
            <Avatar
              width={80}
              height={80}
              src={'/images/dummy/1.svg'}
              alt={'Avatar'}
            />
            <RowBox>
              <NameText>{user && user.name}</NameText>
              <LvBox>{'lvl.3'}</LvBox>
            </RowBox>
          </UserBox>
        </PopItem>
        <PopItem>
          <OptionxBox>{'My Community'}</OptionxBox>
          <OptionxBox
            onClick={() => user && router.push(RouterConst.USER + user.id)}
          >
            {'My Profile'}
          </OptionxBox>
          <OptionxBox
            onClick={() =>
              user && router.push(RouterConst.USER + user.id + '/setting')
            }
          >
            {'Account Setting'}
          </OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={handleLogout}>{'Sign out'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopWrap>
  )
}

const UserInfoBox: FunctionComponent = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const showLoginModal = useStoreState<GlobalStoreModel>(
    (state) => state.showLoginModal
  )
  //action
  const setAuthBox = useStoreActions<GlobalStoreModel>(
    (action) => action.setAuthBox
  )
  const setShowLoginModal = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowLoginModal
  )

  // hook
  const [isInvite, setInvite] = useState<boolean>(false)

  useEffect(() => {
    if (user && user.is_new_user) {
      setShowLoginModal(true)
      setAuthBox(AuthEnum.INPUT_FORM)
    }
  }, [user])

  if (user && Object.values(user).length) {
    return (
      <UserSession>
        <GiftIcon onClick={() => setInvite(true)} className='h-7 w-7' />
        <UserPopover />

        <BasicModal
          title={`Invite Friend to create project 👋`}
          isOpen={isInvite}
          onClose={() => setInvite(false)}
        >
          <InviteCommunity />
        </BasicModal>
      </UserSession>
    )
  }

  return (
    <>
      <AuthBox>
        <LoginBtn
          onClick={() => {
            setAuthBox(AuthEnum.LOGIN)
            setShowLoginModal(true)
          }}
        >
          {'Log in'}
        </LoginBtn>
        <SignUpBtn
          onClick={() => {
            setAuthBox(AuthEnum.REGISTER)
            setShowLoginModal(true)
          }}
        >
          {'Sign up'}
        </SignUpBtn>
      </AuthBox>
      <BaseModal isOpen={showLoginModal}>
        <ModalBox>
          <Login setOpen={setShowLoginModal} />
        </ModalBox>
      </BaseModal>
    </>
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

const Header: FunctionComponent<{ isApp?: boolean }> = ({ isApp = true }) => {
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)

  const router = useRouter()

  const navBarState = useStoreState<GlobalStoreModel>((state) => state.navBar)
  const [hydrated, setHydrated] = useState(false)

  const setNavBar = useStoreActions<GlobalStoreModel>(
    (action) => action.setNavBar
  )

  const path = usePathname()
  const [navActive, setNavActive] = useState<number>(-1)

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
      <Wrap isApp={isApp}>
        <Body isApp={isApp}>
          <LeftSession>
            <ImageLogoBox
              width={150}
              height={100}
              onClick={() => router.push(RouterConst.HOME)}
              src={StorageConst.APP_LOGO_DIR.src}
              alt={StorageConst.APP_LOGO_DIR.alt}
            />
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
        </Body>
      </Wrap>
      <NavBarBox navActive={navActive} handleClick={handleClick} />
    </>
  )
}

export default Header
