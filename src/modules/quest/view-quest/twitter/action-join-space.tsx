import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { SizeEnum } from '@/constants/common.const'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { NegativeButton } from '@/widgets/buttons/button'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const TwitterJoinSpace: FunctionComponent<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Link to={action.link} target='_blank'>
      <ActionTwitterFrame>
        <HorizontalStartCenter>
          <NormalText>{'join space'}</NormalText>
        </HorizontalStartCenter>
        <NegativeButton block={!user.services?.twitter} width={SizeEnum.x48}>
          {action.action}
        </NegativeButton>
      </ActionTwitterFrame>
    </Link>
  )
}

export default TwitterJoinSpace
