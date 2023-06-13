import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { AdminRoutes } from '@/admin-portal/routes/routes-navigation'
import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import AdminPortalStore from '@/store/local/admin-portal'
import { FullWidthHeight } from '@/widgets/orientation'

const Padding = tw(FullWidthHeight)`
  p-3
`

const PaddingTab = tw(Tab)`
  !py-3
  text-base
`

const ControlPanel: FC = () => {
  // data
  const activeTab = AdminPortalStore.useStoreState((state) => state.activeTab)

  const navigate = useNavigate()
  return (
    <Padding>
      <PaddingTab
        onClick={() => {
          navigate(AdminRoutes.TEMPLATES)
        }}
        active={activeTab === ControlPanelTab.TEMPLATES}
      >
        {'Templates'}
      </PaddingTab>
      <PaddingTab
        onClick={() => {
          navigate(AdminRoutes.REFERRALS)
        }}
        active={activeTab === ControlPanelTab.REFERRALS}
      >
        {'Referrals'}
      </PaddingTab>
    </Padding>
  )
}

export default ControlPanel
