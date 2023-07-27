import { FC, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { createChannelApi } from '@/api/chat'
import { Element, PaddingVertical } from '@/modules/community/settings/member/content/mini-widget'
import ChannelSettingStore from '@/store/local/channel-setting'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import MultipleInputBox from '@/widgets/input/multiple-input-box'
import BasicModal from '@/widgets/modal/basic'
import { EndHorizontal } from '@/widgets/orientation'

const FormChannel: FC = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const { communityHandle } = useParams()

  // data
  const showModal = ChannelSettingStore.useStoreState((state) => state.showModal)
  const name = ChannelSettingStore.useStoreState((state) => state.name)

  // action
  const setShowModal = ChannelSettingStore.useStoreActions((action) => action.setShowModal)
  const setName = ChannelSettingStore.useStoreActions((action) => action.setName)

  if (!communityHandle) {
    return <></>
  }

  const onCreated = async () => {
    setLoading(true)
    try {
      const { error } = await createChannelApi(communityHandle, name)
      if (error) {
        toast.error(error)
        return
      }
      toast.success('Created channel successfully')
      setShowModal(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <BasicModal
      title={'Add new channel'}
      styled='!w-[480px]'
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <PaddingVertical>
        <Element label='Name'>
          <InputBox value={name} onChange={(e) => setName(e.target.value)} />
        </Element>
        <Element label='Description'>
          <MultipleInputBox rows={3} />
        </Element>
        <EndHorizontal>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => setShowModal(false)}>
            {'Cancel'}
          </PositiveButton>
          <PositiveButton block={name === ''} loading={loading} onClick={onCreated}>
            {'Add'}
          </PositiveButton>
        </EndHorizontal>
      </PaddingVertical>
    </BasicModal>
  )
}

export default FormChannel
