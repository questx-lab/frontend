import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavBarEnum } from '@/constants/key.const'
import { AuthEnum } from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import AuthType from '@/modules/login/auth-type'
import Login from '@/modules/login/login'
import InviteCommunity from '@/modules/project/invite-community'
import { LoginStore } from '@/store/local/login.store'
import { GlobalStoreModel } from '@/store/store'
import { AuthBox, LoginBtn, MenuBtn, SignUpBtn } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  AvatarBox,
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
import { UserType } from '@/types/account.type'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { BaseModal, BasicModal } from '@/widgets/modal'
import { Horizontal, Vertical } from '@/widgets/orientation'
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

const RowBox = tw(Horizontal)`
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
  hover:bg-gray-100
`

const UserPopover: FunctionComponent = () => {
  // hook
  const router = useRouter()

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setLogin = useStoreActions<GlobalStoreModel>(
    (action) => action.setLogin
  )
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleLogout = () => {
    router.push(RouterConst.HOME)
    setLogin(false)
    setUser({})
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
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)
  const userState: UserType = useStoreState<GlobalStoreModel>(
    (state) => state.user
  )

  //action
  const setAuthBox = LoginStore.useStoreActions((action) => action.setAuthBox)

  // hook
  const router = useRouter()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isInvite, setInvite] = useState<boolean>(false)

  useEffect(() => {
    if (userState && userState.is_new_user) {
      setOpen(true)
      setAuthBox(AuthEnum.INPUT_FORM)
    }
  }, [userState])

  if (isLogin && userState) {
    return (
      <UserSession>
        <GiftIcon onClick={() => setInvite(true)} className='h-7 w-7' />
        <UserPopover />
        <BaseModal isOpen={isOpen}>
          <ModalBox>
            <Login setOpen={setOpen} />
          </ModalBox>
        </BaseModal>
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
            setOpen(true)
          }}
        >
          {'Log in'}
        </LoginBtn>
        <SignUpBtn
          onClick={() => {
            setAuthBox(AuthEnum.REGISTER)
            setOpen(true)
          }}
        >
          {'Sign up'}
        </SignUpBtn>
      </AuthBox>
      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <Login setOpen={setOpen} />
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

const Header: FunctionComponent = () => {
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
          <LoginStore.Provider>
            <UserInfoBox />
          </LoginStore.Provider>
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
