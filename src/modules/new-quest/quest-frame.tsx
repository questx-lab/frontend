'use client'

import { FunctionComponent, useEffect, useState } from 'react'

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
import tw from 'twin.macro'

import { getCommunityApi } from '@/app/api/client/community'
import {
  newQuestApi,
  getQuestApi,
  updateQuestApi,
} from '@/app/api/client/quest'
import {
  QuestStatusEnum,
  QuestTypeEnum,
  TwitterEnum,
  QuestRecurrencesStringMap,
  QuestRecurrence,
  QuestTypeMap,
} from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import QuestReward from '@/modules/new-quest/quest-reward'
import QuestTemplate from '@/modules/new-quest/quest-template'
import QuestTypeView from '@/modules/new-quest/quest-type'
import Recurrence from '@/modules/new-quest/recurrence'
import { NewQuestModel, NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { RequireSignal } from '@/styles/input.style'
import {
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CWrap,
  ICard,
  PICard,
} from '@/styles/questboard.style'
import { ReqNewQuestType, ValidationQuest } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import Editor from '@/widgets/editor'
import { TextField } from '@/widgets/form'
import { ProgressModal } from '@/widgets/modal'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { Label } from '@/widgets/text'

const TitleBox = tw(HorizontalStartCenter)`
  px-12
  py-6
  w-full
`

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

const ButtonSubmit: FunctionComponent<{
  setIsOpen: (e: boolean) => any
  id: string
  editId: string
}> = ({ setIsOpen, id, editId = '' }) => {
  const store = NewQuestStore.useStore()
  const router = useRouter()
  const title = NewQuestStore.useStoreState((state) => state.title)
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const actionTwitter = NewQuestStore.useStoreState(
    (state) => state.actionTwitter
  )
  const visitLink = NewQuestStore.useStoreState((state) => state.visitLink)
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const accountUrl = NewQuestStore.useStoreState((state) => state.accountUrl)
  const tweetUrl = NewQuestStore.useStoreState((state) => state.tweetUrl)
  const contentTw = NewQuestStore.useStoreState((state) => state.contentTw)
  const spaceUrlTw = NewQuestStore.useStoreState((state) => state.spaceUrlTw)
  const telegramLink = NewQuestStore.useStoreState(
    (state) => state.telegramLink
  )
  const textAutoValid = NewQuestStore.useStoreState(
    (state) => state.textAutoValid
  )
  const anwser = NewQuestStore.useStoreState((state) => state.anwser)

  const submitAction = async (
    status: string,
    community_id: string,
    editId: string
  ) => {
    setIsOpen(true)
    const rs = await handleSubmit(store, id, status, editId)
    if (rs) {
      router.push(RouterConst.PROJECT + id)
    } else {
      setIsOpen(false)
    }
  }

  let disable = true

  if (title !== '') {
    switch (questType) {
      case QuestTypeEnum.URL:
        disable = false
        break
      case QuestTypeEnum.IMAGE:
        disable = false
        break
      case QuestTypeEnum.TEXT:
        if (textAutoValid && anwser === '') {
          disable = true
        } else {
          disable = false
        }
        break
      case QuestTypeEnum.QUIZ:
        const quiz = quizzes[quizzes.length - 1]
        if (
          quiz.question !== '' &&
          quiz.answers.length &&
          quiz.question.length
        ) {
          disable = false
        }
        break
      case QuestTypeEnum.VISIT_LINK:
        if (visitLink !== '') {
          disable = false
        }
        break
      case QuestTypeEnum.EMPTY:
        disable = false
        break
      case QuestTypeEnum.TWITTER:
        actionTwitter.forEach((e) => {
          switch (e) {
            case TwitterEnum.FOLLOW:
              if (accountUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.LIKE:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.REPLY:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.RETWEET:
              if (tweetUrl !== '') {
                disable = false
              }
              break
            case TwitterEnum.TWEET:
              if (contentTw !== '') {
                disable = false
              }
              break
            case TwitterEnum.JOIN_SPACE:
              if (spaceUrlTw !== '') {
                disable = false
              }
              break
          }
        })

        break
      case QuestTypeEnum.DISCORD:
        disable = false
        break
      case QuestTypeEnum.JOIN_TELEGRAM:
        if (telegramLink !== '') {
          disable = false
        }
        break
      case QuestTypeEnum.INVITES:
        disable = false
        break
    }
  }

  return (
    <BtnWrap>
      <NegativeButton
        isFull
        block={disable}
        onClick={() => submitAction(QuestStatusEnum.DRAFT, id, editId)}
      >
        {'Draft'}
      </NegativeButton>
      <PositiveButton
        isFull
        block={disable}
        onClick={() => submitAction(QuestStatusEnum.ACTIVE, id, editId)}
      >
        {'Publish'}
      </PositiveButton>
    </BtnWrap>
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
  community_id: string,
  status: string,
  editId: string
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
      validations.quizs = state.quizzes.map((e) => ({
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
      validations.discord_invite_link = state.discordLink
      break
    case QuestTypeEnum.JOIN_TELEGRAM:
      validations.telegram_invite_link = state.telegramLink
      break
    case QuestTypeEnum.INVITES:
      validations.number = state.invites
      break
  }

  const payload: ReqNewQuestType = {
    id: editId,
    community_id: community_id,
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
    status,
  }

  try {
    let data
    if (editId) {
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

const QuestFrame: FunctionComponent<{
  id: string // edit mean quest_id and create is project_id
  isTemplate?: boolean
  isEdit?: boolean
}> = ({ id, isTemplate = false, isEdit = false }) => {
  const router = useRouter()

  // Data
  const title = NewQuestStore.useStoreState((state) => state.title)
  const project = NewQuestStore.useStoreState((state) => state.project)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Actions
  const onTitleChanged = NewQuestStore.useStoreActions(
    (actions) => actions.setTitle
  )
  const onDescriptionChanged = NewQuestStore.useStoreActions(
    (actions) => actions.setDescription
  )

  const setProject = NewQuestStore.useStoreActions(
    (action) => action.setProject
  )

  const setRecurrence = NewQuestStore.useStoreActions(
    (actions) => actions.setRecurrence
  )

  const setQuestType = NewQuestStore.useStoreActions(
    (actions) => actions.setQuestType
  )

  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setAnswer = NewQuestStore.useStoreActions(
    (actions) => actions.setAnswer
  )
  const setVisitLink = NewQuestStore.useStoreActions(
    (actions) => actions.setVisitLink
  )
  const setTelegramLink = NewQuestStore.useStoreActions(
    (actions) => actions.setTelegramLink
  )
  const setInvites = NewQuestStore.useStoreActions(
    (actions) => actions.setInvites
  )

  const setActionTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setActionTwitter
  )
  const setAccountLink = NewQuestStore.useStoreActions(
    (actions) => actions.setAccountLink
  )
  const setTweetUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setTweetUrl
  )
  const setReplyTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setReplyTwitter
  )
  const setContentTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setContentTwitter
  )
  const setTwitterType = NewQuestStore.useStoreActions(
    (actions) => actions.setTwitterType
  )
  const setSpaceUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setSpaceUrl
  )

  useEffect(() => {
    if (isEdit) {
      fetchQuestByID(id)
    } else {
      fetchProjectByID(id)
    }
  }, [])

  const fetchProjectByID = async (id: string) => {
    try {
      const rs = await getCommunityApi(id)
      setProject(rs.data!.community)
      // setLoading(false)
    } catch (error) {
      toast.error('Error while fetch project')
      // setLoading(false)
    }
  }

  const fetchQuestByID = async (id: string) => {
    try {
      const res = await getQuestApi(id)
      const {
        community_id,
        title,
        type,
        description,
        recurrence,
        rewards,
        validation_data,
      } = res.data || {}

      const {
        tweet_url,
        like,
        reply,
        retweet,
        default_reply,
        link,
        discord_invite_url,
        telegram_invite_url,
        twitter_handle,
        default_tweet,
        quizs,
      } = validation_data || {}

      onTitleChanged(title || '')
      onDescriptionChanged(description || '')
      setRecurrence(
        QuestRecurrencesStringMap.get(recurrence || '') || QuestRecurrence.ONCE
      )
      setTweetUrl(tweet_url || '')

      setQuestType(QuestTypeMap.get(type || '') || QuestTypeEnum.URL)

      fetchProjectByID(community_id || '')
      setVisitLink(link || '')
      setTelegramLink(telegram_invite_url || '')
      setAccountLink(twitter_handle || '')
      // setLoading(false)
    } catch (error) {
      toast.error('Error while fetch project')
      // setLoading(false)
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
                <Label>
                  {'QUEST TITLE'}
                  <RequireSignal>{'*'}</RequireSignal>
                </Label>
                <TextField
                  required
                  value={title}
                  placeholder='The name of the quest is written here.'
                  onChange={(e) => onTitleChanged(e.target.value)}
                  errorMsg='You must have a quest title to create this quest.'
                />
                <Gap />
                <Label>{'QUEST DESCRIPTION'}</Label>
                <Editor onChange={(value) => onDescriptionChanged(value)} />
              </PICard>
            </ICard>
            <Gap height={8} />

            <QuestTypeView />
            <Gap height={8} />

            <Recurrence />
            <Gap height={8} />

            <ButtonSubmit setIsOpen={setIsOpen} id={project.id} editId={id} />
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
