import { FC } from 'react'

import TemplatesTab from '@/admin-portal/modules/portal/control-panel/templates'
import { FullWidthHeight } from '@/widgets/orientation'

const ControlPanel: FC = () => {
  return (
    <FullWidthHeight>
      <TemplatesTab />
    </FullWidthHeight>
  )
}

export default ControlPanel
