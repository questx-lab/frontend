import { FunctionComponent, useState } from 'react'

import { EasyPeasyConfig, Store } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listQuestApi, newQuestApi, updateQuestApi } from '@/app/api/client/quest'
import { QuestTypeEnum, TwitterEnum } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import ActionButtons from '@/modules/create-quest/action-buttons'
import Highlighted from '@/modules/create-quest/highlighted'
import { QuestFieldsBox } from '@/modules/create-quest/mini-widget'
import QuestTypeSelection from '@/modules/create-quest/quest-type/selection'
import Recurrence from '@/modules/create-quest/recurrence'
import QuestReward from '@/modules/create-quest/reward'
import TopLabel from '@/modules/create-quest/top-label'
import { CommunityStore } from '@/store/local/community'
import { NewQuestModel, NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { ReqNewQuestType, ValidationQuest } from '@/utils/type'
import Editor from '@/widgets/editor'
import { TextField } from '@/widgets/form'
import { ProgressModal } from '@/widgets/modal'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Label } from '@/widgets/text'

const Fullscreen = tw(Vertical)`
  w-full
  h-full
`

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

const handleSubmit = async (
  store: Store<NewQuestModel, EasyPeasyConfig<undefined, {}>>,
  community_handle: string,
  status: string,
  questId: string
): Promise<boolean> => {
  const state = store.getState()
  if (!state.title) {
    toast.error('Quest title cannot be empty.')
    return false
  }

  let type = state.type
  const validations: ValidationQuest = {}

  switch (state.type) {
    case QuestTypeEnum.URL:
      break
    case QuestTypeEnum.IMAGE:
      break
    case QuestTypeEnum.TEXT:
      validations.auto_validate = state.textAutoValid
      validations.answer = state.anwser
      break
    case QuestTypeEnum.QUIZ:
      validations.quizzes = state.quizzes.map((e) => ({
        question: e.question,
        answers: e.answers,
        options: e.options,
      }))
      break
    case QuestTypeEnum.VISIT_LINK:
      validations.link = state.visitLink
      break
    case QuestTypeEnum.EMPTY:
      validations.auto_validate = state.textAutoValid
      break
    case QuestTypeEnum.TWITTER:
      validations.like = false
      validations.reply = false
      validations.retweet = false
      state.actionTwitter.forEach((e) => {
        switch (e) {
          case TwitterEnum.FOLLOW:
            validations.twitter_handle = state.accountUrl
            type = QuestTypeEnum.TWITTER_FOLLOW
            break
          case TwitterEnum.LIKE:
            validations.tweet_url = state.tweetUrl
            validations.like = true
            type = QuestTypeEnum.TWITTER_REACTION
            break
          case TwitterEnum.REPLY:
            validations.reply = true
            validations.tweet_url = state.tweetUrl
            type = QuestTypeEnum.TWITTER_REACTION

            break
          case TwitterEnum.RETWEET:
            validations.retweet = true
            validations.tweet_url = state.tweetUrl
            type = QuestTypeEnum.TWITTER_REACTION
            break
          case TwitterEnum.TWEET:
            validations.included_words = []
            validations.default_tweet = state.contentTw
            type = QuestTypeEnum.TWITTER_TWEET
            break
          case TwitterEnum.JOIN_SPACE:
            validations.space_url = state.spaceUrlTw
            type = QuestTypeEnum.TWITTER_JOIN_SPACE
            break
        }
      })

      break
    case QuestTypeEnum.DISCORD:
      validations.invite_link = state.discordLink
      break
    case QuestTypeEnum.JOIN_TELEGRAM:
      validations.invite_link = state.telegramLink
      break
    case QuestTypeEnum.INVITES:
      validations.number = state.invites
      break
  }

  const payload: ReqNewQuestType = {
    id: questId,
    community_handle: community_handle,
    type,
    title: state.title,
    description: state.description,
    categories: [],
    recurrence: state.recurrence,
    points: state.pointReward, // Other types of rewards are not supported for now
    validation_data: validations,
    condition_op: 'and',
    conditions: [],
    status,
    is_highlight: state.highlighted,
  }

  try {
    let data
    if (questId && questId !== '') {
      data = await updateQuestApi(payload)
    } else data = await newQuestApi(payload)
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
  communityHandle: string
  isTemplate?: boolean
  isEdit?: boolean
}> = ({ communityHandle, isTemplate = false, isEdit = false }) => {
  const navigate = useNavigate()

  // data
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
    const rs = await handleSubmit(store, communityHandle, submitType, '')
    if (rs) {
      navigate(RouterConst.PROJECT + communityHandle)

      // reload the quests list so that it could displayed in the community quest list.
      const result = await listQuestApi(communityHandle, '')
      if (result.code === 0) {
        setQuests(result.data?.quests || [])
      }
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Fullscreen>
      <TopLabel isTemplate={isTemplate} />

      <BodyFrame isTemplate={isTemplate}>
        <EditInfoFrame>
          <QuestFieldsBox title={'QUEST TITLE'} required={true}>
            <TextField
              required
              value={title}
              placeholder='The name of the quest is written here.'
              onChange={(e) => setTitle(e.target.value)}
              msg='You must have a quest title to create this quest.'
            />
            <Gap />

            <Label>{'QUEST DESCRIPTION'}</Label>
            <Editor onChange={(value) => setDescription(value)} value={description} />
          </QuestFieldsBox>

          <QuestFieldsBox title={'SUBMISSION TYPE'} required={true}>
            <QuestTypeSelection />
          </QuestFieldsBox>

          <QuestFieldsBox title={'REPEAT'} required={true}>
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
    </Fullscreen>
  )
}
