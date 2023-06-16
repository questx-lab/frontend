import { FC, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Content, GapHorizontal } from '@/admin-portal/modules/referrals/mini-widget'
import { approvePendingCommunityApi } from '@/api/communitiy'
import AdminCommunityStore from '@/store/local/admin-community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { TextBase, TextXl } from '@/widgets/text'
import { Rsp } from '@/types'

export const ActionModal: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const showActiveModal = AdminCommunityStore.useStoreState((state) => state.showActiveModal)
  const community = AdminCommunityStore.useStoreState((state) => state.community)
  const action = AdminCommunityStore.useStoreState((state) => state.action)

  // data
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
        case 'Active':
          result = await approvePendingCommunityApi(community.handle)
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
        navigate(0)
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
      isOpen={showActiveModal}
      onClose={onCloseConfirmModal}
      styled={'flex flex-col !justify-start !items-start !w-[400px] !h-[250px]'}
    >
      <Content>
        <TextXl>{`${action} reward?`}</TextXl>
        <TextBase>{`Do you really want to ${action} reward`}</TextBase>
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
