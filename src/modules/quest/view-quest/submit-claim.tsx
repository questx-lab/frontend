import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { claimRewardApi } from '@/api/claim'
import { deleteQuest } from '@/api/quest'
import { ClaimedQuestStatus, CommunityRoleEnum, QuestTypeEnum } from '@/constants/common.const'
import { editQuestRoute } from '@/constants/router.const'
import ActiveQuestStore, { canClaimQuest } from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import broadcast, { BroadcastEventType } from '@/types/broadcast'
import { emptyQuest, QuestType } from '@/types/quest'
import { hasDiscord } from '@/types/user'
import { uploadFile } from '@/utils/file'
import { DangerButton, NegativeButton, PositiveButton } from '@/widgets/buttons'
import ConfirmationModal from '@/widgets/modal/confirmation'
import { Horizontal } from '@/widgets/orientation'

const ButtonFrame = tw(Horizontal)`
  w-full
  gap-2
`

const handleSubmit = async (
  quest: QuestType,
  user: UserType,
  fileUpload: File[],
  urlSubmit: string,
  textSubmit: string,
  replyUrlSubmit: string,
  quizAnswers: string[],
  setLoading: (e: boolean) => void
): Promise<boolean> => {
  let submissionData = ''
  switch (quest.type) {
    case QuestTypeEnum.IMAGE:
      const tuple = await uploadFile(fileUpload)
      if (tuple.error) {
        toast.error(tuple.error)
      } else {
        submissionData = tuple.value || ''
      }
      break
    case QuestTypeEnum.URL:
      submissionData = urlSubmit
      break
    case QuestTypeEnum.TEXT:
      submissionData = textSubmit
      break
    case QuestTypeEnum.QUIZ:
      submissionData = JSON.stringify({ answers: quizAnswers })
      break
    case QuestTypeEnum.TWITTER_REACTION:
      submissionData = replyUrlSubmit
      break
    case QuestTypeEnum.TWITTER_TWEET:
      submissionData = replyUrlSubmit
      break
    default:
      break
  }

  if (quest.type === QuestTypeEnum.IMAGE && submissionData === '') {
    toast.error('Url image is invalid, please try again!')
    return false
  }

  // If quest has discord role reward & user has not link Discord yet, we need to ask user to
  // link their discord in the settings.
  if (quest.rewards && !hasDiscord(user)) {
    for (let reward of quest.rewards) {
      if (reward.type === 'discord_role') {
        toast.error('You need to link your discord account to receive Discord Role reward')
        return false
      }
    }
  }

  try {
    setLoading(true)
    const data = await claimRewardApi({
      quest_id: quest?.id,
      submission_data: submissionData,
    })

    if (data.error) {
      toast.error(data.error)
      return false
    }

    if (data.data) {
      switch (data.data.status) {
        case ClaimedQuestStatus.PENDING:
          toast.success('Submit quest success, we will consider your submition')
          break
        case ClaimedQuestStatus.AUTO_REJECTED:
          toast.error(data.data.message || 'Your claimed auto rejected')
          return false

        default:
          toast.success('Claim reward successfully')
      }
    }
  } catch (error) {
    return false
  } finally {
    setLoading(false)
  }

  return true
}

const SubmitClaim: FC<{
  quest: QuestType
}> = ({ quest }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const url = ActiveQuestStore.useStoreState((state) => state.url)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)
  // const replyUrlSubmit = ActiveQuestStore.useStoreState((state) => state.replyUrlSubmit)
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)
  const visitLink = ActiveQuestStore.useStoreState((state) => state.visitLink)
  const telegramSubmit = ActiveQuestStore.useStoreState((state) => state.telegramSubmit)

  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setEditQuest = NewQuestStore.useStoreActions((action) => action.setQuest)
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  // handler
  const onSubmit = async () => {
    try {
      const result = await handleSubmit(
        quest,
        user,
        fileUpload,
        url,
        textSubmit,
        // replyUrlSubmit, // temporarily disable reply submit url
        '',
        quizAnswers,
        setLoading
      )

      if (result) {
        // Reload page after done claim
        navigate(0)
      }
    } catch (error) {}
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

  const onEdit = () => {
    switch (role) {
      case CommunityRoleEnum.EDITOR:
      case CommunityRoleEnum.OWNER:
        setEditQuest(quest)
        setActiveQuest(emptyQuest())
        navigate(editQuestRoute(quest.community.handle))
        break
    }
  }

  const onDeleteConfirmed = async () => {
    try {
      // Make a request to delete the quest
      const result = await deleteQuest(quest.id)
      if (result.code === 0) {
        setActiveQuest(emptyQuest())
        broadcast.publish(BroadcastEventType.DELETE_QUEST, quest)
      }
    } finally {
      setShowDeleteConfirmation(false)
    }
  }

  const canClaim =
    quest.unclaimable_reason !== ''
      ? false
      : canClaimQuest({
          user,
          quest,
          fileUpload,
          url,
          textSubmit,
          quizAnswers,
          visitLink,
          telegramSubmit,
        })

  switch (role) {
    case CommunityRoleEnum.ADMIN:
    case CommunityRoleEnum.EDITOR:
    case CommunityRoleEnum.OWNER:
      return (
        <>
          <ButtonFrame>
            <NegativeButton isFull onClick={onEdit}>
              {'Edit'}
            </NegativeButton>
            <DangerButton isFull onClick={() => setShowDeleteConfirmation(true)}>
              {'Delete'}
            </DangerButton>
          </ButtonFrame>
          <ConfirmationModal
            title={'Are you sure you want to delete this quest?'}
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onPositiveClicked={onDeleteConfirmed}
          />
        </>
      )

    default:
      return (
        <PositiveButton isFull block={!canClaim} loading={loading} onClick={onSubmit} requireLogin>
          {'Claim Reward'}
        </PositiveButton>
      )
  }
}

export default SubmitClaim
