import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import CommunityStats from '@/admin-portal/modules/communities/community-table/stats'
import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import {
  ActionReviewCommunityEnum,
  CommunityStatusEnum,
} from '@/admin-portal/types/control-panel-tab'
import AdminCommunityStore from '@/store/admin/community'
import { CommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { OptionxBox } from '@/widgets/popover'
import { PopoverClick } from '@/widgets/popover/popover-hover'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export const AvatarBox = styled(Image)(tw`ml-4`)

const Content = tw.div`
  bg-white
  border
  border-solid
  border-gray-200
  rounded-lg
  p-2
`

const RowOption: FC<{ community: CommunityType }> = ({ community }) => {
  // action
  const setShowActiveModal = AdminCommunityStore.useStoreActions(
    (action) => action.setShowActiveModal
  )

  const setCommunity = AdminCommunityStore.useStoreActions((action) => action.setCommunity)

  const setAction = AdminCommunityStore.useStoreActions((action) => action.setAction)

  const onActionClicked = (action: ActionReviewCommunityEnum) => {
    setCommunity(community)
    setAction(action)
    setShowActiveModal(true)
  }

  const RenderOption: FC = () => {
    if (community.status === CommunityStatusEnum.PENDING) {
      return (
        <>
          <OptionxBox
            className='!py-1'
            onClick={() => onActionClicked(ActionReviewCommunityEnum.ACTIVE)}
          >
            {'Active'}
          </OptionxBox>
          <OptionxBox
            className='!py-1'
            onClick={() => onActionClicked(ActionReviewCommunityEnum.REJECT)}
          >
            {'Reject'}
          </OptionxBox>
        </>
      )
    }

    return <CommunityStats comunity={community} />
  }

  return (
    <td>
      <HorizontalFullWidthCenter>
        <PopoverClick
          button={<EllipsisHorizontalIcon className='w-6 h-6 text-gray-900 cursor-pointer' />}
          placement={'right'}
        >
          <Content>
            <RenderOption />
          </Content>
        </PopoverClick>
      </HorizontalFullWidthCenter>
    </td>
  )
}

export default RowOption
