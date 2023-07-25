import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'
import { FireIcon } from '@heroicons/react/24/outline'

const LotteryTab: FC = () => {
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

    if (activeControlPanelTab === ControlPanelTab.LOTTERY) {
      return
    }

    navigate(RouterConst.COMMUNITIES + `/${community.handle}/lottery`)
  }

  return (
    <Tab onClick={onClicked} active={activeControlPanelTab === ControlPanelTab.LOTTERY}>
      <FireIcon className='w-5 h-5' />
      {'LOTTERY'}
    </Tab>
  )
}

export default LotteryTab