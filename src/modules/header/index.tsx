import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { MobileView } from 'react-device-detect'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavigationEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import Drawer from '@/modules/header/drawer'
import { UserInfoBox } from '@/modules/header/user-info'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'
import { Horizontal, HorizontalBetweenCenter, HorizontalStartCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Wrap = styled.nav<{ isApp?: boolean }>(({ isApp = true }) => [
  tw`
  w-full
  flex
  flex-row
  justify-between
  items-center
  h-[70px]
  border-b-[1px]
  border-gray-200
  fixed
  `,
  isApp && tw`bg-white px-6 3xl:px-6`,
  !isApp &&
    tw`
    border-0
    backdrop-blur-lg
    flex
    flex-row
    justify-center
    items-center
  `,
])

const LeftSession = tw(HorizontalStartCenter)`
  gap-4
  h-full
  w-full
`

const ImageLogoBox = styled(Image)(tw`
  cursor-pointer
  h-full
  max-sm:w-[100px]
  max-2xl:w-[120px]
`)

const RightSession = tw(Horizontal)`
  w-full
  items-center
  justify-end
`

const Body = styled(HorizontalBetweenCenter)<{ isApp?: boolean }>(({ isApp = true }) => [
  !isApp &&
    tw`
        h-full
        max-sm:px-2
        md:px-8
        w-full
        xl:w-[1180px]
      `,
  isApp &&
    tw`
        w-full
        h-full
      `,
])

export const BoxLink = tw(Horizontal)`
  h-full
  w-full
  items-center
  max-md:hidden
`

export const Route = styled(Link)(
  tw`
  relative
  text-black
  text-xl
  font-light
  cursor-pointer
  flex
  flex-col
  justify-center
  items-center
  h-full
  px-4
  `
)

export const Underline = tw.div`
  h-[5px]
  bg-primary-600
  w-full
  rounded-t-full
  absolute
  bottom-0
`

export const MenuIcon = styled(Bars3Icon)(() => [
  tw`
    lg:hidden
    w-6
    h-6
`,
])

export const Header: FunctionComponent<{}> = () => {
  // hook
  const navigate = useNavigate()
  const [navActive, setNavActive] = useState<string>('')
  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes(NavigationEnum.COMMUNITY)) {
      setNavActive(NavigationEnum.COMMUNITY)
    } else if (location.pathname.includes(NavigationEnum.QUESTCARD)) {
      setNavActive(NavigationEnum.QUESTCARD)
    } else {
      setNavActive(NavigationEnum.HOME)
    }
  }, [location])

  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )
  const showNavigationDrawer = useStoreState<GlobalStoreModel>(
    (state) => state.showNavigationDrawer
  )

  const isApp: boolean = user !== undefined

  return (
    <Wrap isApp={isApp}>
      <Body isApp={isApp}>
        <LeftSession>
          {/* For mobile */}
          <MobileView>
            <Drawer navActive={navActive} />
            <MenuIcon onClick={() => !showNavigationDrawer && setShowNavigationDrawer(true)} />
          </MobileView>
          {/* ========== */}

          <ImageLogoBox
            width={150}
            height={100}
            onClick={() => {
              navigate(RouterConst.HOME)
            }}
            src={StorageConst.APP_LOGO_DIR.src}
            alt={StorageConst.APP_LOGO_DIR.alt}
          />
          <BoxLink>
            <Route to={RouterConst.COMMUNITIES}>
              <NormalText>{'Communities'}</NormalText>
              {navActive === NavigationEnum.COMMUNITY && <Underline />}
            </Route>
            <Route to={RouterConst.QUESTBOARD}>
              <NormalText>{'QuesterCamp'}</NormalText>
              {navActive === NavigationEnum.QUESTCARD && <Underline />}
            </Route>
          </BoxLink>
        </LeftSession>
        <RightSession>
          <UserInfoBox />
        </RightSession>
      </Body>
    </Wrap>
  )
}
