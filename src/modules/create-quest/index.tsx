import { FunctionComponent, useState } from 'react'

import { EasyPeasyConfig, Store } from 'easy-peasy'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listQuestApi, newQuestApi, updateQuestApi } from '@/app/api/client/quest'
import ActionButtons from '@/modules/create-quest/action-buttons'
import Highlighted from '@/modules/create-quest/highlighted'
import { QuestFieldsBox } from '@/modules/create-quest/mini-widget'
import QuestTypeSelection from '@/modules/create-quest/quest-type/selection'
import Recurrence from '@/modules/create-quest/recurrence'
import QuestReward from '@/modules/create-quest/reward'
import TemplateGroups from '@/modules/create-quest/template-groups'
import TopLabel from '@/modules/create-quest/top-label'
import { CommunityStore } from '@/store/local/community'
import NewQuestStore, { NewQuestModel, stateToNewQuestRequest } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import Editor from '@/widgets/editor'
import { TextField } from '@/widgets/form'
import { ProgressModal } from '@/widgets/modal'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Label } from '@/widgets/text'

const BodyFrame = styled(Horizontal)<{ isTemplate?: boolean }>(({ isTemplate = false }) => {
  if (isTemplate) {
    return tw`
      w-full
      h-full
      justify-center
      pr-12
      mb-12
    `
  }

  return tw`
    w-full
  `
})

const EditInfoFrame = tw.div`
  w-2/3
  h-full
  bg-white
  py-8
  pl-12
`

const EditFrame = styled(Vertical)<{ isTemplate: boolean }>(({ isTemplate }) => {
  if (isTemplate) {
    return [tw`pl-80`]
  }

  return [tw`flex-1`]
})

const handleSubmit = async (
  store: Store<NewQuestModel, EasyPeasyConfig<undefined, {}>>,
  community_handle: string,
  status: string,
  questId: string
): Promise<boolean> => {
  const payload = stateToNewQuestRequest(store.getState(), questId, community_handle, status)
  if (payload.error) {
    toast.error(payload.error)
    return false
  }

  if (!payload.data) {
    return false
  }

  const request = payload.data
  try {
    let data
    if (questId && questId !== '') {
      data = await updateQuestApi(request)
    } else data = await newQuestApi(request)
    if (data.error) {
      toast.error(data.error)
    }
    if (data.data) {
      return true
    }
  } catch (error) {
    toast.error('Error while creating quest')
  }
  return false
}

export const CreateOrEditQuest: FunctionComponent<{
  isTemplate?: boolean
  isEdit?: boolean
  onQuestCreated: () => void
}> = ({ isTemplate = false, isEdit = false, onQuestCreated }) => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const store = NewQuestStore.useStore()
  const title = NewQuestStore.useStoreState((state) => state.title)
  const description = NewQuestStore.useStoreState((state) => state.description)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Actions
  const setTitle = NewQuestStore.useStoreActions((actions) => actions.setTitle)
  const setDescription = NewQuestStore.useStoreActions((actions) => actions.setDescription)
  const setQuests = CommunityStore.useStoreActions((action) => action.setQuests)

  const submitAction = async (submitType: string) => {
    setIsOpen(true)
    try {
      const result = await handleSubmit(store, community.handle, submitType, '')
      if (result) {
        // reload the quests list so that it could displayed in the community quest list.
        const result = await listQuestApi(community.handle, '')
        if (result.code === 0) {
          setQuests(result.data?.quests || [])

          onQuestCreated()
        }
      }
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Horizontal>
      <TemplateGroups show={isTemplate} />
      <EditFrame isTemplate={isTemplate}>
        <TopLabel isEdit={isEdit} communityHandle={community.handle} />

        <BodyFrame isTemplate={isTemplate}>
          <EditInfoFrame>
            <QuestFieldsBox title={'Quest Title'} required={true}>
              <TextField
                required
                value={title}
                placeholder='The name of the quest is written here.'
                onChange={(e) => setTitle(e.target.value)}
                msg='You must have a quest title to create this quest.'
              />
              <Gap />

              <Label>{'QUEST DESCRIPTION'}</Label>
              <Editor
                onChange={(value) => {
                  setDescription(value)
                }}
                value={description}
              />
            </QuestFieldsBox>

            <QuestFieldsBox title={'Submission Type'} required={true}>
              <QuestTypeSelection />
            </QuestFieldsBox>

            <QuestFieldsBox title={'Repeat'} required={true}>
              <Recurrence />
            </QuestFieldsBox>

            <QuestFieldsBox title={'Highlighted'}>
              <Highlighted />
            </QuestFieldsBox>

            <ActionButtons onSubmit={submitAction} />
          </EditInfoFrame>

          <QuestReward />
        </BodyFrame>

        <ProgressModal
          isOpen={isOpen}
          title={`Hang in there!`}
          lines={[`We're creating new quest.`, 'This might take a few seconds...']}
        />
      </EditFrame>
    </Horizontal>
  )
}
