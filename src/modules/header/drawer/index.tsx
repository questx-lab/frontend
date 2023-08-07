// Drawer for mobile

import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import AccountControlPanel from '@/modules/account-setting/control-panel'
import { ChannelSide } from '@/modules/chat/channel/channel-side'
import CommunitiesNavigation from '@/modules/community/communities-navigation'
import CommunityControlPanel from '@/modules/community/control-panel'
import DefaultDrawer from '@/modules/header/drawer/default'
import AccountSettingsStore from '@/store/local/account-settings'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'
import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
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
  w-80
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

export const HorizotalFull = tw(Horizontal)`
  h-full
  w-full
  gap-3
`

const NoGapHorizontal = tw(Horizontal)`
  w-full
  gap-0
  h-full
`

const CanSettingCommunityOrDefault: FC = () => {
  const location = useLocation()
  const canEdit = CommunityStore.useStoreState((state) => state.canEdit)
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const showPanel: boolean = canEdit && user

  if (location.pathname.includes(RouterConst.COMMUNITIES + '/') && showPanel) {
    return (
      <div>
        <CommunityControlPanel show={showPanel} />
      </div>
    )
  }
  return <DefaultDrawer />
}

const Header: FC = () => {
  const navigate = useNavigate()
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  return (
    <PaddingHorizontal>
      <Image
        width={90}
        height={40}
        onClick={() => {
          navigate(RouterConst.HOME)
          setShowNavigationDrawer(false)
        }}
        src={StorageConst.APP_LOGO_DIR.src}
        alt={StorageConst.APP_LOGO_DIR.alt}
      />
      <CloseIcon onClick={() => setShowNavigationDrawer(false)} />
    </PaddingHorizontal>
  )
}

const RenderContent: FC = () => {
  // hook
  const navigate = useNavigate()
  const location = useLocation()

  // Global action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  if (location.pathname.includes(RouterConst.ACCOUNT_SETTINGS)) {
    return (
      <AccountSettingsStore.Provider>
        <AccountControlPanel />
      </AccountSettingsStore.Provider>
    )
  }

  if (location.pathname.includes(RouterConst.MESSAGES)) {
    return (
      <>
        <Header />
        <PaddingHorizontal>
          <ChannelSide />
        </PaddingHorizontal>
      </>
    )
  }

  return (
    <>
      <Header />
      <NoPaddingDivider />
      <NoGapHorizontal>
        <CommunitiesNavigation isDrawer />
        <CanSettingCommunityOrDefault />
      </NoGapHorizontal>
    </>
  )
}

const Drawer: FC = () => {
  // Global data
  const showNavigationDrawer = useStoreState<GlobalStoreModel>(
    (state) => state.showNavigationDrawer
  )

  return (
    <BaseModal isOpen={showNavigationDrawer}>
      <DrawerModal>
        <Content>
          <RenderContent />
        </Content>
      </DrawerModal>
    </BaseModal>
  )
}

export default Drawer
