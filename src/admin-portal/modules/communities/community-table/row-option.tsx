import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import AdminCommunityStore from '@/store/admin/community'
import { CommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { OptionxBox, PopItem } from '@/widgets/popover'
import { PopoverClick } from '@/widgets/popover/popover-hover'
import { Popover } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export const AvatarBox = styled(Image)(tw`ml-4`)

const PopoverPosition = styled(Popover)(tw`
  relative
  flex
  flex-row
  justify-center
  mt-4
`)

const Content = tw.div`
  bg-white
  border
  border-solid
  border-gray-200
  rounded-lg
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
    <td>
      <HorizontalFullWidthCenter>
        <PopoverClick
          button={<EllipsisHorizontalIcon className='w-6 h-6 text-gray-900 cursor-pointer' />}
          placement={'left'}
        >
          <Content>
            <PopItem>
              <OptionxBox onClick={() => onActionClicked('Active')}>{'Activate'}</OptionxBox>
            </PopItem>
          </Content>
        </PopoverClick>
      </HorizontalFullWidthCenter>
    </td>
  )
}

export default RowOption
