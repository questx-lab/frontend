import { FunctionComponent, useState } from 'react'

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
import { QuestType } from '@/types/quest'
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

const SubmitClaim: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  // data
  const store = ActiveQuestStore.useStore()
  const role = CommunityStore.useStoreState((state) => state.role)
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const urlSubmit = ActiveQuestStore.useStoreState((state) => state.url)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)
  const replyUrlSubmit = ActiveQuestStore.useStoreState((state) => state.replyUrlSubmit)
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)

  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setEditQuest = NewQuestStore.useStoreActions((action) => action.setQuest)
  const setDeletedQuestId = ActiveQuestStore.useStoreActions((action) => action.setDeletedQuestId)

  // handler
  const onSubmit = () => {
    handleSubmit(quest, fileUpload, urlSubmit, textSubmit, replyUrlSubmit, quizAnswers, setLoading)
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

  const onEdit = () => {
    setEditQuest(quest)
    navigate(editQuestRoute(quest.community.handle))
  }

  const onDeleteConfirmed = async () => {
    try {
      // Make a request to delete the quest
      const result = await deleteQuest(quest.id)
      if (result.code === 0) {
        setDeletedQuestId(quest.id)
      }
    } finally {
      setShowDeleteConfirmation(false)
    }
  }

  const canClaim = canClaimQuest(store.getState(), user, quest)

  switch (role) {
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
