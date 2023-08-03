import { FC, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { createChannelApi, updateChannelApi } from '@/api/chat'
import { getChannels } from '@/modules/community/settings/chat/channel'
import { Element, PaddingVertical } from '@/modules/community/settings/member/content/mini-widget'
import ChannelSettingStore, { ChannelAction } from '@/store/local/channel-setting'
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
  const channelId = ChannelSettingStore.useStoreState((state) => state.channelId)
  const name = ChannelSettingStore.useStoreState((state) => state.name)
  const description = ChannelSettingStore.useStoreState((state) => state.description)
  const channelAction = ChannelSettingStore.useStoreState((state) => state.channelAction)

  // action
  const setShowModal = ChannelSettingStore.useStoreActions((action) => action.setShowModal)
  const setName = ChannelSettingStore.useStoreActions((action) => action.setName)
  const setDescription = ChannelSettingStore.useStoreActions((action) => action.setDescription)
  const setChannels = ChannelSettingStore.useStoreActions((action) => action.setChannels)

  if (!communityHandle) {
    return <></>
  }

  const onCreated = async () => {
    setLoading(true)
    try {
      const { error } = await createChannelApi(communityHandle, name, description)
      if (error) {
        toast.error(error)
        return
      }
      toast.success('Created channel successfully')
      getChannels(communityHandle, setChannels)
      setShowModal(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onUpdated = async () => {
    setLoading(true)
    try {
      const { error } = await updateChannelApi(channelId, name, description)
      if (error) {
        toast.error(error)
        return
      }
      toast.success('Updated channel successfully')
      getChannels(communityHandle, setChannels)
      setShowModal(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const title = channelAction === ChannelAction.ADD ? 'Add new channel' : 'Edit channel'

  const ActionButton: FC = () => {
    if (channelAction === ChannelAction.EDIT) {
      return (
        <PositiveButton loading={loading} onClick={onUpdated}>
          {'Update'}
        </PositiveButton>
      )
    }

    return (
      <PositiveButton block={name === ''} loading={loading} onClick={onCreated}>
        {'Add'}
      </PositiveButton>
    )
  }

  return (
    <BasicModal
      title={title}
      styled='!w-[480px]'
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <PaddingVertical>
        <Element label='Name'>
          <InputBox value={name} onChange={(e) => setName(e.target.value)} />
        </Element>
        <Element label='Description'>
          <MultipleInputBox
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Element>
        <EndHorizontal>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => setShowModal(false)}>
            {'Cancel'}
          </PositiveButton>
          <ActionButton />
        </EndHorizontal>
      </PaddingVertical>
    </BasicModal>
  )
}

export default FormChannel
