// Drawer for mobile

import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavigationEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import CommunitiesNavigation from '@/modules/communities-navigation'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { Image } from '@/widgets/image'
import { BaseModal } from '@/widgets/modal'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { XMarkIcon } from '@heroicons/react/24/outline'

const DrawerModal = tw(Horizontal)`
  flex
  h-full
  w-full
`

export const CloseIcon = styled(XMarkIcon)(
  () => tw`
  lg:hidden
  w-6
  h-6
`
)

const Content = tw(Vertical)`
  w-5/6
  h-full
  bg-white
`

const NoPaddingDivider = tw(Divider)`
  !my-0
`

const PaddingHorizontal = tw(HorizontalBetweenCenterFullWidth)`
  px-4
  py-2
`

const NavigateBox = tw(VerticalFullWidth)`
  gap-2
  mx-2
  mt-2
`

export const HorizotalFull = tw(Horizontal)`
  h-full
  w-full
  gap-3
`

const NoGapHorizontal = tw(Horizontal)`
  w-full
  gap-0
`

const NavigateOption = styled(Link)<{ isactive: boolean }>(({ isactive }) => {
  const style = [
    tw`
    w-full
    px-2
    py-3
    text-lg
    font-normal
    text-gray-700
    rounded-lg
  `,
  ]

  if (isactive) {
    style.push(tw`
    bg-primary-50
    text-primary
  `)
  }
  return style
})

const Drawer: FC<{ navActive: string }> = ({ navActive }) => {
  // hook
  const navigate = useNavigate()

  // Global data
  const showNavigationDrawer = useStoreState<GlobalStoreModel>(
    (state) => state.showNavigationDrawer
  )

  // Global action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  return (
    <BaseModal isOpen={showNavigationDrawer}>
      <DrawerModal>
        <Content>
          <PaddingHorizontal>
            <Image
              width={100}
              height={60}
              onClick={() => {
                navigate(RouterConst.HOME)
                setShowNavigationDrawer(false)
              }}
              src={StorageConst.APP_LOGO_DIR.src}
              alt={StorageConst.APP_LOGO_DIR.alt}
            />
            <CloseIcon onClick={() => setShowNavigationDrawer(false)} />
          </PaddingHorizontal>
          <NoPaddingDivider />
          <NoGapHorizontal>
            <CommunityStore.Provider>
              <CommunitiesNavigation isDrawer />
            </CommunityStore.Provider>
            <NavigateBox>
              <NavigateOption
                onClick={() => setShowNavigationDrawer(false)}
                to={RouterConst.COMMUNITIES}
                isactive={navActive === NavigationEnum.COMMUNITY}
              >
                {'Communities'}
              </NavigateOption>
              <NavigateOption
                onClick={() => setShowNavigationDrawer(false)}
                to={RouterConst.QUESTBOARD}
                isactive={navActive === NavigationEnum.QUESTCARD}
              >
                {'Questcard'}
              </NavigateOption>
            </NavigateBox>
          </NoGapHorizontal>
        </Content>
      </DrawerModal>
    </BaseModal>
  )
}

export default Drawer
