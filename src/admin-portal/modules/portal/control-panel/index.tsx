import { FC } from 'react'

import BadgesTab from '@/admin-portal/modules/portal/control-panel/badges'
import CommunitiesTab from '@/admin-portal/modules/portal/control-panel/communities'
import ReferralsTab from '@/admin-portal/modules/portal/control-panel/referrals'
import TemplatesTab from '@/admin-portal/modules/portal/control-panel/templates'
import { FullWidthHeight } from '@/widgets/orientation'

const ControlPanel: FC = () => {
  // data
  return (
    <FullWidthHeight>
      <BadgesTab />
      <CommunitiesTab />
      <TemplatesTab />
      <ReferralsTab />
    </FullWidthHeight>
  )
}

export default ControlPanel
