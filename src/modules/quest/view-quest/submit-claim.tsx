import { FunctionComponent, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { claimRewardApi } from '@/app/api/client/claim'
import { ClaimedQuestStatus, CommunityRoleEnum, QuestTypeEnum } from '@/constants/common.const'
import { editQuestRoute } from '@/constants/router.const'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { CommunityStore } from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest.store'
import { GlobalStoreModel } from '@/store/store'
import { uploadFile } from '@/utils/file'
import { QuestType, UserType } from '@/utils/type'
import { DangerButton, NegativeButton, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { Horizontal } from '@/widgets/orientation'

const ButtonFrame = tw(Horizontal)`
  w-full
  gap-2
`

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
      const tuple = await uploadFile(fileUpload)
      if (tuple.error) {
        toast.error(tuple.error)
      } else {
        inp = tuple.value || ''
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

  if (quest.type === QuestTypeEnum.IMAGE && inp === '') {
    setLoading(false)
    return
  }

  try {
    const data = await claimRewardApi({
      quest_id: quest?.id,
      submission_data: inp,
    })

    if (data.error) {
      toast.error(data.error)
    }

    if (data.data) {
      switch (data.data.status) {
        case ClaimedQuestStatus.PENDING:
          toast.success('Submit quest success, we will consider your submition')
          break
        case ClaimedQuestStatus.AUTO_REJECTED:
          toast.error('Submit failed')
          break
        default:
          toast.success('Claim reward successfully')
      }
    }
  } catch (error) {
  } finally {
    setLoading(false)
  }
}

const SubmitClaim: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const urlSubmit = ActiveQuestStore.useStoreState((state) => state.urlSubmit)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)
  const replyUrlSubmit = ActiveQuestStore.useStoreState((state) => state.replyUrlSubmit)
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)
  const visitLink = ActiveQuestStore.useStoreState((state) => state.visitLink)
  const telegramSubmit = ActiveQuestStore.useStoreState((state) => state.telegramSubmit)

  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setEditQuest = NewQuestStore.useStoreActions((action) => action.setQuest)

  // handler
  const onSubmit = () => {
    handleSubmit(quest, fileUpload, urlSubmit, textSubmit, replyUrlSubmit, quizAnswers, setLoading)
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

  let block = true

  const onEdit = () => {
    setEditQuest(quest)
    navigate(editQuestRoute(quest.community.handle))
  }

  const onDelete = () => {
    setShowDeleteConfirmation(true)
  }

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
      if (quizAnswers.length === quest.validation_data?.quizzes?.length) {
        block = false
      }
      break

    case QuestTypeEnum.TWITTER:
    case QuestTypeEnum.TWITTER_FOLLOW:
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
    case QuestTypeEnum.TWITTER_REACTION:
    case QuestTypeEnum.TWITTER_TWEET:
      if (user && user.services && user.services.twitter) {
        block = false
      }
      break
    case QuestTypeEnum.DISCORD:
      if (user && user.services && user.services.discord) {
        block = false
      }
      break

    case QuestTypeEnum.JOIN_TELEGRAM:
      if (telegramSubmit) {
        block = false
      }
      break
    default:
      break
  }

  switch (role) {
    case CommunityRoleEnum.EDITOR:
    case CommunityRoleEnum.OWNER:
      return (
        <>
          <ButtonFrame>
            <NegativeButton isFull onClick={onEdit}>
              {'Edit'}
            </NegativeButton>
            <DangerButton isFull onClick={onDelete}>
              {'Delete'}
            </DangerButton>
          </ButtonFrame>
          <BasicModal
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
          >
            AAAAA
          </BasicModal>
        </>
      )

    default:
      return (
        <PositiveButton isFull block={block} loading={loading} onClick={onSubmit} requireLogin>
          {'Claim Reward'}
        </PositiveButton>
      )
  }
}

export default SubmitClaim
