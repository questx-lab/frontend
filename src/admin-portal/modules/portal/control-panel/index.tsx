import { FC } from 'react'

import CommunitiesTab from '@/admin-portal/modules/portal/control-panel/communities'
import ReferralsTab from '@/admin-portal/modules/portal/control-panel/referrals'
import TemplatesTab from '@/admin-portal/modules/portal/control-panel/templates'
import { FullWidthHeight } from '@/widgets/orientation'

const ControlPanel: FC = () => {
  return (
    <FullWidthHeight>
      <CommunitiesTab />
      <TemplatesTab />
      <ReferralsTab />
    </FullWidthHeight>
  )
}

export default ControlPanel
