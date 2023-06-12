import { FC } from 'react'

import ReferralsTab from '@/admin-portal/modules/portal/control-panel/referrals'
import TemplatesTab from '@/admin-portal/modules/portal/control-panel/templates'
import { FullWidthHeight } from '@/widgets/orientation'

const ControlPanel: FC = () => {
  return (
    <FullWidthHeight>
      <TemplatesTab />
      <ReferralsTab />
    </FullWidthHeight>
  )
}

export default ControlPanel
