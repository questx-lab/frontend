'use client'

import { FunctionComponent, useState } from 'react'

import {
  EasyPeasyConfig,
  FilterActionTypes,
  StateMapper,
  Store,
} from 'easy-peasy'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { newQuestApi } from '@/app/api/client/quest'
import { QuestTypeEnum, TwitterEnum } from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import QuestReward from '@/modules/new-quest/quest-reward'
import QuestTemplate from '@/modules/new-quest/quest-template'
import QuestTypeView from '@/modules/new-quest/quest-type'
import Recurrence from '@/modules/new-quest/recurrence'
import { NewQuestModel, NewQuestStore } from '@/store/local/new-quest.store'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CWrap,
  ICard,
  PICard,
  TitleBox,
} from '@/styles/questboard.style'
import { ReqNewQuestType, ValidationQuest } from '@/types/project.type'
import Editor from '@/widgets/editor'
import { ProgressModal } from '@/widgets/modal'

const CreateQuestLabel: FunctionComponent<{
  id: string
  isTemplate?: boolean
  router: AppRouterInstance
}> = ({ id, isTemplate = false, router }) => {
  if (isTemplate) {
    return <></>
  }

  return (
    <>
      <TitleBox>
        <Image
          className='cursor-pointer'
          onClick={() => router.push(RouterConst.PROJECT + id)}
          width={35}
          height={35}
          src={StorageConst.ARROW_BACK_ICON.src}
          alt={StorageConst.ARROW_BACK_ICON.alt}
        />
        <Gap width={3} />
        <CHeadling>{'Create Quest'}</CHeadling>
      </TitleBox>
    </>
  )
}

const errorMessage = (state: StateMapper<FilterActionTypes<NewQuestModel>>) => {
  if (!state.title) {
    return 'Quest title cannot be empty.'
  }

  return ''
}

const handleSubmit = async (
  store: Store<NewQuestModel, EasyPeasyConfig<undefined, {}>>,
  id: string
): Promise<boolean> => {
  const state = store.getState()
  const error = errorMessage(state)
  if (error) {
    toast.error(error)
    return false
  }

  const type =
    state.questType !== QuestTypeEnum.TWITTER
      ? state.questType
      : state.twitterType
  const validations: ValidationQuest = {}

  switch (state.questType) {
    case QuestTypeEnum.URL:
      break
    case QuestTypeEnum.IMAGE:
      break
    case QuestTypeEnum.TEXT:
      validations.auto_validate = state.textAutoValid
      validations.answer = state.anwser
      break
    case QuestTypeEnum.QUIZ:
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
            break
          case TwitterEnum.LIKE:
            validations.tweet_url = state.tweetUrl
            validations.like = true
            break
          case TwitterEnum.REPLY:
            validations.reply = true
            validations.tweet_url = state.tweetUrl

            break
          case TwitterEnum.RETWEET:
            validations.retweet = true
            validations.tweet_url = state.tweetUrl
            break
          case TwitterEnum.TWEET:
            validations.included_words = []
            validations.default_tweet = state.contentTw
            break
          case TwitterEnum.JOIN_SPACE:
            validations.space_url = state.spaceUrlTw
            break
        }
      })

      break
    case QuestTypeEnum.DISCORD:
      break
    case QuestTypeEnum.JOIN_TELEGRAM:
      validations.invite_link = state.telegramLink
      break
    case QuestTypeEnum.INVITES:
      validations.number = state.invites
      break
  }

  const payload: ReqNewQuestType = {
    project_id: id,
    type,
    title: state.title,
    description: state.description,
    categories: [],
    recurrence: state.recurrence,
    rewards: [
      {
        type: 'points',
        data: {
          points: state.pointReward,
        },
      },
    ],
    validation_data: validations,
    condition_op: 'and',
    conditions: [],
  }

  try {
    const data = await newQuestApi(payload)
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

const QuestFrame: FunctionComponent<{
  id: string
  isTemplate?: boolean
}> = ({ id, isTemplate = false }) => {
  const router = useRouter()

  // Data
  const title = NewQuestStore.useStoreState((state) => state.title)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const store = NewQuestStore.useStore()

  // Actions
  const onTitleChanged = NewQuestStore.useStoreActions(
    (actions) => actions.setTitle
  )
  const onDescriptionChanged = NewQuestStore.useStoreActions(
    (actions) => actions.setDescription
  )

  const submitAction = async () => {
    setIsOpen(true)
    const rs = await handleSubmit(store, id)
    if (rs) {
      router.push(RouterConst.PROJECT + id)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <QuestTemplate />
      <CWrap>
        <CreateQuestLabel router={router} isTemplate={isTemplate} id={id} />

        <CBox isTemplate={isTemplate}>
          <CCard>
            <ICard>
              <PICard>
                <LabelInput>{'QUEST TITLE'}</LabelInput>
                <Gap />
                <InputBox
                  value={title}
                  placeholder='The name of the quest is written here.'
                  onChange={(e) => onTitleChanged(e.target.value)}
                />
                <Gap height={6} />
                <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
                <Gap />
                <Editor onChange={(value) => onDescriptionChanged(value)} />
              </PICard>
            </ICard>
            <Gap height={8} />

            <QuestTypeView />
            <Gap height={8} />

            <Recurrence />
            <Gap height={8} />

            <BtnWrap>
              <BtnDraft>{'Draft'}</BtnDraft>
              <BtnCreateQuest onClick={submitAction}>
                {'Publish'}
              </BtnCreateQuest>
            </BtnWrap>
          </CCard>
          <QuestReward />
        </CBox>
      </CWrap>

      <ProgressModal
        isOpen={isOpen}
        title={`Hang in there!`}
        lines={[
          `We're creating new quest.`,
          'This might take a few seconds...',
        ]}
      />
    </>
  )
}

export default QuestFrame
