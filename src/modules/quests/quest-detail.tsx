import { FunctionComponent, useEffect } from 'react'

import parseHtml from 'html-react-parser'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import { claimRewardApi } from '@/app/api/client/reward'
import { uploadImageApi } from '@/app/api/client/upload'
import { ProjectRoleEnum, QuestTypeEnum } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { CommunityStore } from '@/store/local/community.store'
import { DeleteBtn, EditButton, FullWidthBtn } from '@/styles/button.style'
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
import { QuestType } from '@/types/project.type'

import {
  QuestDiscord,
  QuestImage,
  QuestText,
  QuestTwitter,
  QuestUrl,
  QuestVisitLink,
} from './quest-type'

const handleSubmit = async (
  quest: QuestType,
  fileUpload: File[],
  urlSubmit: string,
  textSubmit: string
) => {
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
      // inp = JSON.stringify(chosenAnswers)
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
  }
}

const SubmitButton: FunctionComponent = () => {
  const role = CommunityStore.useStoreState((state) => state.role)
  const quest = ActiveQuestStore.useStoreState((state) => state.quest)

  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const urlSubmit = ActiveQuestStore.useStoreState((state) => state.urlSubmit)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)

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
    case QuestTypeEnum.TEXT:
      if (textSubmit !== '') {
        block = false
      }
    case QuestTypeEnum.QUIZ:
    // inp = JSON.stringify(chosenAnswers)

    default:
      break
  }

  switch (role) {
    case (ProjectRoleEnum.OWNER, ProjectRoleEnum.EDITOR):
      return (
        <WrapBtn>
          <EditButton> {'Edit'} </EditButton>
          <DeleteBtn> {'Delete'} </DeleteBtn>
        </WrapBtn>
      )

    case ProjectRoleEnum.GUEST:
      return (
        <FullWidthBtn
          disabled={block}
          block={block}
          onClick={() => handleSubmit(quest, fileUpload, urlSubmit, textSubmit)}
        >
          {'Claim Reward'}
        </FullWidthBtn>
      )

    default:
      return <></>
  }
}

const QuestContent: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  switch (quest?.type) {
    case QuestTypeEnum.URL:
      return <QuestUrl />
    case QuestTypeEnum.IMAGE:
      return <QuestImage />
    case QuestTypeEnum.TEXT:
      return <QuestText />
    case QuestTypeEnum.VISIT_LINK:
      return <QuestVisitLink />
    // case QuestTypeEnum.QUIZ:
    //   return withQuizzes()

    case QuestTypeEnum.TWITTER_TWEET:
      return <QuestTwitter />
    case QuestTypeEnum.TWITTER_FOLLOW:
      return <QuestTwitter />
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
      return <QuestTwitter />
    case QuestTypeEnum.TWITTER_REACTION:
      return <QuestTwitter />
    case QuestTypeEnum.EMPTY:
      return <></>
    // case (QuestTypeEnum.TEXT, QuestTypeEnum.IMAGE, QuestTypeEnum.URL):
    //   return withText()
    case QuestTypeEnum.DISCORD:
      return <QuestDiscord />
    default:
      return <></>
  }
}

export const QuestDetail: FunctionComponent<{
  quest: QuestType
  onClose: () => void
}> = ({ quest }) => {
  useEffect(() => {}, [])

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
            <PointText>{'300 Points'}</PointText>
          </HeaderBox>
        </RewardBox>
        <SubmitButton />
      </ReviewBox>
    </QuestDetailWrap>
  )
}
