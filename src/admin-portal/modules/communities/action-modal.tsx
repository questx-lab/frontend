import { FC, useState } from 'react'

import { toast } from 'react-hot-toast'

import { Content, GapHorizontal } from '@/admin-portal/modules/referrals/mini-widget'
import { reviewPendingCommunity } from '@/api/communitiy'
import AdminCommunityStore from '@/store/admin/community'
import { Rsp } from '@/types'
import { ActionReviewCommunityEnum } from '@/types/community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { TextBase } from '@/widgets/text'

export const ActionModal: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const showActiveModal = AdminCommunityStore.useStoreState((state) => state.showActiveModal)
  const community = AdminCommunityStore.useStoreState((state) => state.community)
  const action = AdminCommunityStore.useStoreState((state) => state.action)

  // action
  const removeCommunity = AdminCommunityStore.useStoreActions((action) => action.removeCommunity)

  const setShowActiveModal = AdminCommunityStore.useStoreActions(
    (action) => action.setShowActiveModal
  )
  if (!community) {
    return <></>
  }

  const onAction = async () => {
    setLoading(true)

    try {
      let result: Rsp<{}>
      switch (action) {
        case ActionReviewCommunityEnum.ACTIVE:
          result = await reviewPendingCommunity(community.handle, ActionReviewCommunityEnum.ACTIVE)
          break
        case ActionReviewCommunityEnum.REJECT:
          result = await reviewPendingCommunity(community.handle, ActionReviewCommunityEnum.REJECT)
          break

        default:
          return
      }

      if (result.error) {
        onCloseConfirmModal()
        toast.error(result.error)
      }

      if (result.code === 0) {
        toast.success(`${action} successful`)
        onCloseConfirmModal()

        // Remove this community from the list
        removeCommunity(community)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onCloseConfirmModal = () => {
    setShowActiveModal(false)
  }

  return (
    <BasicModal
      title='Confirmation'
      isOpen={showActiveModal}
      onClose={onCloseConfirmModal}
      styled={'flex flex-col !justify-start !items-start !w-[400px] !h-[250px]'}
    >
      <Content>
        <TextBase>
          {`Do you really want to make community "${community.display_name}" ${action}?`}
        </TextBase>
        <GapHorizontal>
          <PositiveButton onClick={onCloseConfirmModal} type={ButtonTypeEnum.NEGATIVE}>
            {'Cancel'}
          </PositiveButton>
          <PositiveButton loading={loading} onClick={onAction} type={ButtonTypeEnum.SUCCESS_BORDER}>
            {'Yes'}
          </PositiveButton>
        </GapHorizontal>
      </Content>
    </BasicModal>
  )
}
