import { FC, useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { BrowserView, MobileView } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
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

const FixedHeight = styled.div<{ hasEvent?: boolean }>(({ hasEvent }) => {
  const styles = [tw`w-full !h-[64px] bg-white fixed flex flex-col justify-end`]

  if (hasEvent) {
    styles.push(tw`!h-[112px]`)
  }

  return styles
})

export const HeaderBox = styled.nav<{ isApp?: boolean }>(({ isApp = true }) => {
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
        backdrop-blur-lg
        flex
        flex-row
        justify-center
        items-center
      `)
  }

  return styles
})

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

  return (
    <FixedHeight>
      <HeaderBox isApp={isApp}>
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
              src={StorageConst.APP_LOGO_DIR.src}
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
