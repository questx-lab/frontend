import { FC } from 'react'

import tw from 'twin.macro'

import BadgesTab from '@/admin-portal/modules/portal/control-panel/badges'
import CommunitiesTab from '@/admin-portal/modules/portal/control-panel/communities'
import ReferralsTab from '@/admin-portal/modules/portal/control-panel/referrals'
import TemplatesTab from '@/admin-portal/modules/portal/control-panel/templates'
import { FullWidthHeight } from '@/widgets/orientation'

const Padding = tw(FullWidthHeight)`px-3`

const ControlPanel: FC = () => {
  // data
  return (
    <Padding>
      <BadgesTab />
      <CommunitiesTab />
      <TemplatesTab />
      <ReferralsTab />
    </Padding>
  )
}

export default ControlPanel
