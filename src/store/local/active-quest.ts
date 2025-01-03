import { action, Action, createContextStore } from 'easy-peasy'

import { QuestTypeEnum } from '@/constants/common.const'
import { UserType } from '@/types'
import { emptyQuest, QuestType } from '@/types/quest'
import { isValidUrl } from '@/utils/validation'

/**
 * This is a model for user to view quest and then claim.
 */
interface ActiveQuestModel {
  quest: QuestType

  url: string
  textSubmit: string
  replyUrlSubmit: string
  fileUpload: File[]
  visitLink: boolean
  quizAnswers: string[]
  telegramSubmit: boolean
  likeRetweetReplyClicked: boolean

  setQuest: Action<ActiveQuestModel, QuestType>
  setUrlSubmit: Action<ActiveQuestModel, string>
  setTextSubmit: Action<ActiveQuestModel, string>
  setReplyUrlSubmit: Action<ActiveQuestModel, string>
  setFileUpload: Action<ActiveQuestModel, File[]>
  setVisitLink: Action<ActiveQuestModel, boolean>
  setQuizAnswers: Action<ActiveQuestModel, string[]>
  setTelegramSubmit: Action<ActiveQuestModel, boolean>
  setLikeRetweetReplyClicked: Action<ActiveQuestModel, boolean>
  setEmptySubmit: Action<ActiveQuestModel>
}

const ActiveQuestStore = createContextStore<ActiveQuestModel>({
  quest: emptyQuest(),
  url: '',
  textSubmit: '',
  replyUrlSubmit: '',
  fileUpload: [],
  visitLink: false,
  quizAnswers: [],
  telegramSubmit: false,
  likeRetweetReplyClicked: false,

  setQuest: action((state, quest) => {
    state.quest = quest
  }),

  setUrlSubmit: action((state, url) => {
    state.url = url
  }),

  setTextSubmit: action((state, text) => {
    state.textSubmit = text
  }),

  setFileUpload: action((state, files) => {
    state.fileUpload = files
  }),

  setReplyUrlSubmit: action((state, url) => {
    state.replyUrlSubmit = url
  }),

  setVisitLink: action((state, visiLink) => {
    state.visitLink = visiLink
  }),

  setQuizAnswers: action((state, answers) => {
    state.quizAnswers = answers
  }),

  setTelegramSubmit: action((state, telegram) => {
    state.telegramSubmit = telegram
  }),

  setLikeRetweetReplyClicked: action((state, clicked) => {
    state.likeRetweetReplyClicked = clicked
  }),

  setEmptySubmit: action((state) => {
    state.textSubmit = ''
    state.replyUrlSubmit = ''
    state.telegramSubmit = false
    state.url = ''
    state.fileUpload = []
    state.quizAnswers = []
    state.likeRetweetReplyClicked = false
  }),
})

/**
 * This functions takes a active quest state and returns if user is eligible to claim it or could
 * not claim because of some missing data.
 */
export const canClaimQuest = ({
  user,
  quest,
  fileUpload,
  url,
  textSubmit,
  quizAnswers,
  visitLink,
  telegramSubmit,
  likeRetweetReplyClicked,
}: {
  user: UserType
  quest: QuestType
  fileUpload: File[]
  url: string
  textSubmit: string
  quizAnswers: string[]
  visitLink: boolean
  telegramSubmit: boolean
  likeRetweetReplyClicked: boolean
}): boolean => {
  if (!user) {
    return false
  }

  let canClaim = false

  switch (quest.type) {
    case QuestTypeEnum.IMAGE:
      if (fileUpload.length > 0) {
        canClaim = true
      }
      break
    case QuestTypeEnum.URL:
      if (isValidUrl(url)) {
        canClaim = true
      }
      break
    case QuestTypeEnum.VISIT_LINK:
      if (visitLink) {
        canClaim = true
      }
      break

    case QuestTypeEnum.EMPTY:
      canClaim = true
      break

    case QuestTypeEnum.TEXT:
      if (textSubmit !== '') {
        canClaim = true
      }
      break

    case QuestTypeEnum.QUIZ:
      if (quizAnswers.length === quest.validation_data?.quizzes?.length) {
        const quizzes = quest.validation_data?.quizzes
        canClaim = true
        for (let i = 0; i < quizAnswers.length; i++) {
          if (quizAnswers[i] !== quizzes[i].answers[0]) {
            canClaim = false
            break
          }
        }
      }
      break
    case QuestTypeEnum.TWITTER_REACTION:
      if (user && user.services && user.services.twitter && likeRetweetReplyClicked) {
        canClaim = true
      }

      break
    case QuestTypeEnum.TWITTER:
    case QuestTypeEnum.TWITTER_FOLLOW:
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
    case QuestTypeEnum.TWITTER_TWEET:
      if (user && user.services && user.services.twitter) {
        canClaim = true
      }
      break
    case QuestTypeEnum.DISCORD:
      if (user && user.services && user.services.discord) {
        canClaim = true
      }
      break

    case QuestTypeEnum.JOIN_TELEGRAM:
      if (telegramSubmit) {
        canClaim = true
      }
      break
    case QuestTypeEnum.INVITES:
      canClaim = true
      break
    default:
    // do nothing
  }

  return canClaim
}

export default ActiveQuestStore
