import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { CommunityRoleEnum } from '@/constants/common.const'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import {
  OptionxBox,
  PopItem,
  PopoverButton,
  PopoverPosition,
  PopoverSize,
  PopPanel,
} from '@/widgets/popover'

export const AvatarBox = styled(Image)(tw`ml-4`)

const RowOption: FC<{ quest: QuestType }> = ({ quest }) => {
  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)

  const onPreviewClicked = () => {
    setActiveQuest(quest)
    setRole(CommunityRoleEnum.ADMIN)
  }
  const onEditClicked = () => {}

  return (
    <PopoverPosition>
      <PopoverButton className={'outline-0'}>...</PopoverButton>
      <PopPanel size={PopoverSize.SMALL}>
        <PopItem>
          <OptionxBox onClick={onPreviewClicked}>{'Preview'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onEditClicked}>{'Edit'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopoverPosition>
  )
}

export default RowOption