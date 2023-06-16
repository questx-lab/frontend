import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import AdminCommunityStore from '@/store/local/admin-community'
import { CommunityType } from '@/types/community'
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

const RowOption: FC<{ community: CommunityType }> = ({ community }) => {
  // action

  const setShowActiveModal = AdminCommunityStore.useStoreActions(
    (action) => action.setShowActiveModal
  )

  const setCommunity = AdminCommunityStore.useStoreActions((action) => action.setCommunity)

  const setAction = AdminCommunityStore.useStoreActions((action) => action.setAction)

  const onActionClicked = (action: string) => {
    setCommunity(community)
    setAction(action)
    setShowActiveModal(true)
  }

  return (
    <PopoverPosition>
      <PopoverButton className={'outline-0'}>...</PopoverButton>
      <PopPanel size={PopoverSize.SMALL}>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Active')}>{'Active'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Reject')}>{'Reject'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Pending')}>{'Pending'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Pause')}>{'Pause'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Delete')}>{'Delete'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={() => onActionClicked('Edit')}>{'Edit'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopoverPosition>
  )
}

export default RowOption
