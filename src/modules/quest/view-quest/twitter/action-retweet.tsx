import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { ColorEnum, SizeEnum } from '@/constants/common.const'
import { ActionTwitterFrame, ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { NegativeButton } from '@/widgets/buttons'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ArrowPathRoundedSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const TwitterRetweet: FC<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // hook
  const [warningRetweet, setWarningRetweet] = useState<boolean>(false)

  return (
    <div onClick={() => setWarningRetweet(true)}>
      <VerticalFullWidth>
        <Link to={action.link} target='_blank' className='w-full'>
          <ActionTwitterFrame>
            <HorizontalStartCenter>
              <ArrowPathRoundedSquareIcon className='h-7 w-7 text-info' />
              <NormalText>{'Retweet this post'}</NormalText>
            </HorizontalStartCenter>
            <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
              {action.action}
            </NegativeButton>
          </ActionTwitterFrame>
        </Link>

        {warningRetweet && (
          <ColorBox boxColor={ColorEnum.DANGER}>
            <ExclamationTriangleIcon className='w-7 h-7 text-danger' />
            {
              'Be sure to claim this quest right after your retweet, as we are only looking at your 50 last retweets'
            }
          </ColorBox>
        )}
      </VerticalFullWidth>
    </div>
  )
}

export default TwitterRetweet
