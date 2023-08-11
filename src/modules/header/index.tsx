import { FC, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { BrowserView, MobileView } from 'react-device-detect'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import chatController from '@/modules/chat/services/chat-controller'
import BrowserNavigation from '@/modules/header/browser-navigate'
import Drawer from '@/modules/header/drawer'
import UserInfoBox from '@/modules/header/user-info'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'
import { Horizontal, HorizontalBetweenCenter, HorizontalStartCenter } from '@/widgets/orientation'
import { Bars3Icon } from '@heroicons/react/24/outline'

const FixedHeight = tw.div` z-10 w-full !h-[64px] fixed flex flex-col justify-end`
export const HeaderBox = styled.nav<{ isApp?: boolean; isLandingPage?: boolean }>(
  ({ isApp = true, isLandingPage = false }) => {
    const styles = [
      tw`
        w-full
        flex
        flex-col
        justify-between
        items-center
        h-[64px]
        border-b-[1px]
        border-gray-200
      `,
    ]

    if (isApp) {
      styles.push(tw`bg-white px-6 3xl:px-6`)
    } else {
      styles.push(tw`
        border-0
        flex
        flex-row
        justify-center
        items-center
        bg-white
        border-b-[1px]
        border-gray-200
      `)
    }

    if (isLandingPage) {
      styles.push(tw`!bg-transparent border-none`)
    }

    return styles
  }
)

const LeftSection = tw(HorizontalStartCenter)`
  gap-5
  h-full
  w-full
`

const ImageLogoBox = styled(Image)(tw`
  cursor-pointer
  h-full
`)

const RightSection = tw(Horizontal)`
  w-full
  items-center
  justify-end
`

const Body = styled(HorizontalBetweenCenter)<{ isApp?: boolean }>(({ isApp = true }) => [
  !isApp &&
    tw`
        h-full
        max-sm:px-2
        md:px-6
        w-full
      `,
  isApp &&
    tw`
        w-full
        h-full
      `,
])

const FullBrowser = tw(BrowserView)`
  w-full h-full
`

export const MenuIcon = styled(Bars3Icon)(() => [
  tw`
    lg:hidden
    w-6
    h-6
`,
])

export const Header: FC<{}> = () => {
  const navigate = useNavigate()
  const location = useLocation()

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

  useEffect(() => {
    if (isApp) {
      chatController.connect()
    }
  }, [isApp])

  const isLandingPage = location.pathname === RouterConst.HOME && user === undefined

  return (
    <FixedHeight>
      <HeaderBox
        isApp={isApp}
        isLandingPage={location.pathname === RouterConst.HOME && user === undefined}
      >
        <Body isApp={isApp}>
          <LeftSection>
            <MobileView>
              <Drawer />
              <MenuIcon onClick={() => !showNavigationDrawer && setShowNavigationDrawer(true)} />
            </MobileView>

            <ImageLogoBox
              width={90}
              height={40}
              onClick={() => {
                navigate(RouterConst.HOME)
              }}
              src={
                isLandingPage
                  ? StorageConst.APP_LOGO_LANDING_PAGE_DIR.src
                  : StorageConst.APP_LOGO_DIR.src
              }
              alt={StorageConst.APP_LOGO_DIR.alt}
            />

            {/* For browser */}
            <FullBrowser>
              <BrowserNavigation />
            </FullBrowser>
            {/* ========== */}
          </LeftSection>
          <RightSection>
            <UserInfoBox />
          </RightSection>
        </Body>
      </HeaderBox>
    </FixedHeight>
  )
}
