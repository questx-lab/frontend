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

  const onActiveClicked = () => {
    setCommunity(community)
    setAction('Active')
    setShowActiveModal(true)
  }
  const onRejectClicked = () => {
    setCommunity(community)
    setAction('Reject')
    setShowActiveModal(true)
  }
  const onPendingClicked = () => {
    setCommunity(community)
    setAction('Pending')
    setShowActiveModal(true)
  }
  const onPauseClicked = () => {
    setCommunity(community)
    setAction('Pause')
    setShowActiveModal(true)
  }
  const onDeleteClicked = () => {
    setCommunity(community)
    setAction('Delete')
    setShowActiveModal(true)
  }
  const onEditClicked = () => {
    setCommunity(community)
    setAction('Edit')
    setShowActiveModal(true)
  }

  return (
    <PopoverPosition>
      <PopoverButton className={'outline-0'}>...</PopoverButton>
      <PopPanel size={PopoverSize.SMALL}>
        <PopItem>
          <OptionxBox onClick={onActiveClicked}>{'Active'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onRejectClicked}>{'Reject'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onPendingClicked}>{'Pending'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onPauseClicked}>{'Pause'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onDeleteClicked}>{'Delete'}</OptionxBox>
        </PopItem>
        <PopItem>
          <OptionxBox onClick={onEditClicked}>{'Edit'}</OptionxBox>
        </PopItem>
      </PopPanel>
    </PopoverPosition>
  )
}

export default RowOption
