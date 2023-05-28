import { QuestTypeEnum } from '@/constants/common.const'

export function isTwitterType(type: QuestTypeEnum) {
  switch (type) {
    case QuestTypeEnum.TWITTER:
    case QuestTypeEnum.TWITTER_FOLLOW:
    case QuestTypeEnum.TWITTER_REACTION:
    case QuestTypeEnum.TWITTER_JOIN_SPACE:
      return true
  }

  return false
}
