import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'
import { PhotoIcon } from '@heroicons/react/24/outline'

const NFTTab: FC = () => {
  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  // hook
  const navigate = useNavigate()

  const onClicked = () => {
    if (isMobile) {
      setShowNavigationDrawer(false)
    }

    if (activeControlPanelTab === ControlPanelTab.NFTS) {
      return
    }

    navigate(RouterConst.COMMUNITIES + `/${community.handle}/nfts`)
  }

  return (
    <Tab onClick={onClicked} active={activeControlPanelTab === ControlPanelTab.NFTS}>
      <PhotoIcon className='w-5 h-5' />
      {'NFTs'}
    </Tab>
  )
}

export default NFTTab
