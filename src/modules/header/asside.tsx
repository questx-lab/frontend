// Asside for mobile

import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavBarEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { Image } from '@/widgets/image'
import { AssideModel, BaseModal } from '@/widgets/modal'
import {
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { CommunitiesNavigation } from '../communities-navigation/navigation'
import { HorizotalFull } from '../create-community/mini-widget'

export const CloseIcon = styled(XMarkIcon)(() => [
  tw`
    lg:hidden
    w-6
    h-6
`,
])

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
  mr-2
  mt-2
`

const NavigateOption = styled(Link)<{ isActive: boolean }>(({ isActive }) => [
  tw`
    w-full
    px-2
    py-3
    text-lg
    font-normal
    text-gray-700
    rounded-lg
  `,
  isActive &&
    tw`
    bg-primary-50
    text-primary
  `,
])

const Asside: FC<{ navActive: string }> = ({ navActive }) => {
  // hook
  const navigate = useNavigate()

  // Global data
  const navBar = useStoreState<GlobalStoreModel>((state) => state.navBar)

  // Global action
  const setNavBar = useStoreActions<GlobalStoreModel>((action) => action.setNavBar)

  return (
    <BaseModal isOpen={navBar}>
      <AssideModel>
        <Content>
          <PaddingHorizontal>
            <Image
              width={100}
              height={60}
              onClick={() => {
                navigate(RouterConst.HOME)
                setNavBar(false)
              }}
              src={StorageConst.APP_LOGO_DIR.src}
              alt={StorageConst.APP_LOGO_DIR.alt}
            />
            <CloseIcon onClick={() => setNavBar(false)} />
          </PaddingHorizontal>
          <NoPaddingDivider />
          <HorizotalFull>
            <CommunityStore.Provider>
              <CommunitiesNavigation isAsside />
            </CommunityStore.Provider>
            <NavigateBox>
              <NavigateOption
                onClick={() => setNavBar(false)}
                to={RouterConst.COMMUNITIES}
                isActive={navActive === NavBarEnum.COMMUNITY}
              >
                {'Communities'}
              </NavigateOption>
              <NavigateOption
                onClick={() => setNavBar(false)}
                to={RouterConst.QUESTBOARD}
                isActive={navActive === NavBarEnum.QUESTCARD}
              >
                {'Questcard'}
              </NavigateOption>
            </NavigateBox>
          </HorizotalFull>
        </Content>
      </AssideModel>
    </BaseModal>
  )
}

export default Asside
