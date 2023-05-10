import { FunctionComponent } from 'react'

import parseHtml from 'html-react-parser'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import { claimRewardApi } from '@/app/api/client/reward'
import { uploadImageApi } from '@/app/api/client/upload'
import { ProjectRoleEnum, QuestTypeEnum } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewProjectStore } from '@/store/local/project.store'
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

const SubmitButton: FunctionComponent = () => {
  const role = NewProjectStore.useStoreState((state) => state.role)
  const quest = NewQuestStore.useStoreState((state) => state.questActive)
  const fileUpload = NewQuestStore.useStoreState((state) => state.fileUpload)
  const urlSubmit = NewQuestStore.useStoreState((state) => state.urlSubmit)
  const textSubmit = NewQuestStore.useStoreState((state) => state.textSubmit)

  const submit = async () => {
    let inp = ''
    switch (quest?.type) {
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
            toast.error('Upload error')
          }
          inp = data?.data?.url || ''
        } catch (error) {
          toast.error('Error while upload file')
          return
        }
        break
      case QuestTypeEnum.URL:
        inp = urlSubmit
      case QuestTypeEnum.TEXT:
        inp = textSubmit
      case QuestTypeEnum.QUIZ:
      // inp = JSON.stringify(chosenAnswers)

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

  if (role === ProjectRoleEnum.GUESS) {
    return (
      <FullWidthBtn disabled onClick={submit}>
        {'Claim Reward'}
      </FullWidthBtn>
    )
  }

  return (
    <WrapBtn>
      <EditButton> {'Edit'} </EditButton>
      <DeleteBtn> {'Delete'} </DeleteBtn>
    </WrapBtn>
  )
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
  onClose: () => void
}> = ({ onClose }) => {
  const quest = NewQuestStore.useStoreState((state) => state.questActive)

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
