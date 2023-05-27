import styled from 'styled-components'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import { Horizontal, HorizontalBetweenCenter, HorizontalStartCenter } from '@/widgets/orientation'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { StorageConst } from '@/constants/storage.const'
import { UserInfoBox } from '@/modules/header/user-info'
import { Image } from '@/widgets/image'

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

const MenuBtn = tw.button`
  lg:hidden
  max-lg:mr-2
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

export const Header: FunctionComponent<{}> = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const isNavBar = useStoreState<GlobalStoreModel>((state) => state.navBar)
  const navBarState = useStoreState<GlobalStoreModel>((state) => state.navBar)

  const isApp: boolean = user !== undefined

  return (
    <Wrap isApp={isApp}>
      <Body isApp={isApp}>
        <LeftSession>
          <ImageLogoBox
            width={150}
            height={100}
            onClick={() => {
              // TODO: Navigate to home
            }}
            src={StorageConst.APP_LOGO_DIR.src}
            alt={StorageConst.APP_LOGO_DIR.alt}
          />
          BRING BACK NAVIGATION
          {/* <BoxLink>
            <LinkText href={RouterConst.COMMUNITIES}>
              <TitleText>{'Communities'}</TitleText>
              {navActive === NavBarEnum.COMMUNITY && <Underline />}
            </LinkText>
            <LinkText href={RouterConst.QUESTBOARD}>
              <TitleText>{'QuesterCamp'}</TitleText>
              {navActive === NavBarEnum.QUESTCARD && <Underline />}
            </LinkText>
          </BoxLink> */}
        </LeftSession>
        <RightSession>
          <UserInfoBox />
          {/* <MenuBtn onClick={() => setNavBar(!navBarState)}>
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
          </MenuBtn> */}
        </RightSession>
      </Body>
    </Wrap>
  )
}
