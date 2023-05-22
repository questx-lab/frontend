import { FunctionComponent, useState } from 'react'

import parseHtml from 'html-react-parser'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import { claimRewardApi } from '@/app/api/client/reward'
import { uploadImageApi } from '@/app/api/client/upload'
import {
  ProjectRoleEnum,
  QuestTypeEnum,
  TwitterEnum,
} from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { CommunityStore } from '@/store/local/community.store'
import { DeleteBtn, EditButton } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import {
  ContentBox,
  ContentCard,
  HeaderBox,
  PointText,
  QuestDetailWrap,
  ReviewBox,
  RewardBox,
  Title,
  WrapBtn,
} from '@/styles/quest-detail.style'
import { QuestTwitterActionType, QuestType } from '@/types/project.type'
import { getUserLocal } from '@/utils/helper'
import { PositiveButton } from '@/widgets/button'

import { QuestQuiz } from './quest-quiz'
import {
  QuestDiscord,
  QuestImage,
  QuestTelegram,
  QuestText,
  QuestTwitter,
  QuestUrl,
  QuestVisitLink,
} from './quest-type'

const handleSubmit = async (
  quest: QuestType,
  fileUpload: File[],
  urlSubmit: string,
  textSubmit: string,
  replyUrlSubmit: string,
  quizAnswers: string[],
  setLoading: (e: boolean) => void
) => {
  setLoading(true)
  let inp = ''
  switch (quest.type) {
    case QuestTypeEnum.IMAGE:
      let formData = new FormData()
      if (fileUpload.length === 0) {
        toast.error('Must upload file')
        return
      }
      const file = fileUpload[0]
      formData.append('image', file || '')
      try {
        const data = await uploadImageApi(formData)
        if (data.error) {
          toast.error(data.error)
          return
        }
        inp = data?.data?.url || ''
      } catch (error) {
        toast.error('Error while upload file')
        return
      }
      break
    case QuestTypeEnum.URL:
      inp = urlSubmit
      break
    case QuestTypeEnum.TEXT:
      inp = textSubmit
      break
    case QuestTypeEnum.QUIZ:
      inp = JSON.stringify({ answers: quizAnswers })
      break
    case QuestTypeEnum.TWITTER_REACTION:
      inp = replyUrlSubmit
      break
    case QuestTypeEnum.TWITTER_TWEET:
      inp = replyUrlSubmit
      break
    default:
      break
  }
  try {
    const data = await claimRewardApi({
      quest_id: quest?.id,
      input: inp,
    })
    if (data.error) {
      toast.error(data.error)
      return
    }
    toast.success('Claim reward successfully')
  } catch (error) {
    toast.error('Server error')
  } finally {
    setLoading(false)
  }
}

const SubmitButton: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const quest = ActiveQuestStore.useStoreState((state) => state.quest)
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const urlSubmit = ActiveQuestStore.useStoreState((state) => state.urlSubmit)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)
  const replyUrlSubmit = ActiveQuestStore.useStoreState(
    (state) => state.replyUrlSubmit
  )
  const quizAnswers = ActiveQuestStore.useStoreState(
    (state) => state.quizAnswers
  )
  const visitLink = ActiveQuestStore.useStoreState((state) => state.visitLink)

  let block = true

  switch (quest.type) {
    case QuestTypeEnum.IMAGE:
      if (fileUpload.length > 0) {
        block = false
      }
      break
    case QuestTypeEnum.URL:
      if (urlSubmit !== '') {
        block = false
      }
      break
    case QuestTypeEnum.VISIT_LINK:
      if (visitLink) {
        block = false
      }

      break
    case QuestTypeEnum.EMPTY:
      block = false

      break
    case QuestTypeEnum.TEXT:
      if (textSubmit !== '') {
        block = false
      }
      break
    case QuestTypeEnum.QUIZ:
      if (quizAnswers.length === quest.validation_data?.quizs?.length) {
        block = false
      }
      break

    case QuestTypeEnum.TWITTER:
    case QuestTypeEnum.TWITTER_FOLLOW:
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
    case QuestTypeEnum.TWITTER_REACTION:
    case QuestTypeEnum.TWITTER_TWEET:
      const user = getUserLocal()
      if (user.services) {
        block = !user.services.twitter
      }
      break
    default:
      break
  }

  switch (role) {
    case ProjectRoleEnum.GUEST:
      return (
        <PositiveButton
          isFull
          block={block}
          loading={loading}
          onClick={() =>
            handleSubmit(
              quest,
              fileUpload,
              urlSubmit,
              textSubmit,
              replyUrlSubmit,
              quizAnswers,
              setLoading
            )
          }
        >
          {'Claim Reward'}
        </PositiveButton>
      )

    default:
      return (
        <WrapBtn>
          <EditButton> {'Edit'} </EditButton>
          <DeleteBtn> {'Delete'} </DeleteBtn>
        </WrapBtn>
      )
  }
}

const generateTweetLink = (defaultTweet: string): string => {
  return `https://twitter.com/compose/tweet?text=${defaultTweet}`
}

const generateRetweetLink = (status_link: string): string => {
  const status_id = status_link.split('/').at(-1)
  return `https://twitter.com/intent/retweet?tweet_id=${status_id}`
}

const generateReplyLink = (
  status_link: string,
  default_reply: string
): string => {
  const status_id = status_link.split('/').at(-1)
  return `https://twitter.com/intent/tweet?in_reply_to=${status_id}&text=${default_reply}`
}

const QuestContent: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  const {
    tweet_url,
    twitter_handle,
    default_reply,
    link,
    discord_invite_url,
    telegram_invite_url,
    like,
    reply,
    retweet,
    default_tweet,
    quizs,
  } = quest.validation_data || {}
  switch (quest?.type) {
    case QuestTypeEnum.URL:
      return <QuestUrl />
    case QuestTypeEnum.IMAGE:
      return <QuestImage />
    case QuestTypeEnum.TEXT:
      return <QuestText />
    case QuestTypeEnum.VISIT_LINK:
      return <QuestVisitLink link={link || ''} />
    // case QuestTypeEnum.QUIZ:
    //   return withQuizzes()

    case QuestTypeEnum.TWITTER_TWEET:
      return (
        <QuestTwitter
          actions={[
            {
              link: generateTweetLink(default_tweet || ''),
              action: TwitterEnum.TWEET,
            },
          ]}
        />
      )
    case QuestTypeEnum.TWITTER_FOLLOW:
      return (
        <QuestTwitter
          actions={[
            {
              action: TwitterEnum.FOLLOW,
              link: twitter_handle || '',
            },
          ]}
        />
      )
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
      return (
        <QuestTwitter
          actions={[
            {
              action: TwitterEnum.JOIN_SPACE,
              link: tweet_url ?? '',
            },
          ]}
        />
      )
    case QuestTypeEnum.TWITTER_REACTION:
      let actions: QuestTwitterActionType[] = []
      if (retweet) {
        actions.push({
          action: TwitterEnum.RETWEET,
          link: generateRetweetLink(tweet_url ?? ''),
        })
      }
      if (like) {
        actions.push({
          action: TwitterEnum.LIKE,
          link: tweet_url ?? '',
        })
      }
      if (reply) {
        actions.push({
          action: TwitterEnum.REPLY,
          link: generateReplyLink(tweet_url || '', default_reply || ''),
        })
      }

      return <QuestTwitter actions={actions} />
    case QuestTypeEnum.QUIZ:
      return <QuestQuiz quizs={quizs!} />
    case QuestTypeEnum.EMPTY:
      return <></>
    // case (QuestTypeEnum.TEXT, QuestTypeEnum.IMAGE, QuestTypeEnum.URL):
    //   return withText()
    case QuestTypeEnum.DISCORD:
      return <QuestDiscord link={discord_invite_url || ''} />
    case QuestTypeEnum.JOIN_TELEGRAM:
      return <QuestTelegram link={telegram_invite_url || ''} />
    default:
      return <></>
  }
}

export const QuestDetail: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  return (
    <QuestDetailWrap>
      <ContentBox>
        <ContentCard>
          {parseHtml(quest.description ?? '')}
          <QuestContent quest={quest} />
        </ContentCard>
      </ContentBox>
      <ReviewBox>
        <RewardBox>
          <Title>Reward</Title>
          <Gap height={4} />
          <HeaderBox>
            <Image
              width={40}
              height={40}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{`${
              quest.rewards?.length && quest.rewards[0].data.points
            } Points`}</PointText>
          </HeaderBox>
        </RewardBox>
        <SubmitButton />
      </ReviewBox>
    </QuestDetailWrap>
  )
}
