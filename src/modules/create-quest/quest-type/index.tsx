'use client'

import { QuestTypeEnum } from '@/constants/common.const'
import Discord from '@/modules/create-quest/quest-type/discord'
import Invite from '@/modules/create-quest/quest-type/invite'
import JoinTelegarm from '@/modules/create-quest/quest-type/join-telegram'
import Quizzes from '@/modules/create-quest/quest-type/quizzes'
import { QuestTypeText } from '@/modules/create-quest/quest-type/text'
import TwitterList from '@/modules/create-quest/quest-type/twitter'
import { VisitLink } from '@/modules/create-quest/quest-type/visit-link'
import { NewQuestStore } from '@/store/local/new-quest.store'

const QuestType = () => {
  // data
  const questType = NewQuestStore.useStoreState((state) => state.questType)

  switch (questType) {
    case QuestTypeEnum.URL:
      return <></>
    case QuestTypeEnum.IMAGE:
      return <></>
    case QuestTypeEnum.TEXT:
      return <QuestTypeText />
    case QuestTypeEnum.QUIZ:
      return <Quizzes />
    case QuestTypeEnum.VISIT_LINK:
      return <VisitLink />
    case QuestTypeEnum.EMPTY:
      // TODO: Bring back empty when we have condition
      return <></>
    case QuestTypeEnum.TWITTER:
      return <TwitterList />
    case QuestTypeEnum.JOIN_TELEGRAM:
      return <JoinTelegarm />
    case QuestTypeEnum.INVITES:
      return <Invite />
    case QuestTypeEnum.DISCORD:
      return <Discord />
  }
  return <></>
}

export default QuestType
