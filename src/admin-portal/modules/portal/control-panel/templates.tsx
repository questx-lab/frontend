import { FC } from 'react'

import { useNavigate } from 'react-router'

import { Tab } from '@/modules/community/control-panel/mini-widgets'

const TemplatesTab: FC = () => {
  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (false) {
          return
        }

        navigate('./')
      }}
      active={true}
    >
      {'Templates'}
    </Tab>
  )
}

export default TemplatesTab
