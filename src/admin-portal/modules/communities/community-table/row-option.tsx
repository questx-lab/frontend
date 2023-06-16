import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import AdminCommunityStore from '@/store/admin/community'
import { CommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { OptionxBox, PopItem, PopoverButton, PopoverSize, PopPanel } from '@/widgets/popover'
import { Popover } from '@headlessui/react'

export const AvatarBox = styled(Image)(tw`ml-4`)

const PopoverPosition = styled(Popover)(tw`
  relative
  flex
  flex-row
  justify-center
  mt-4
`)

const Absolute = tw.div`
  absolute
  z-50
`

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
      <Absolute>
        <PopPanel size={PopoverSize.SMALL}>
          <PopItem>
            <OptionxBox onClick={() => onActionClicked('Active')}>{'Activate'}</OptionxBox>
          </PopItem>
        </PopPanel>
      </Absolute>
    </PopoverPosition>
  )
}

export default RowOption
