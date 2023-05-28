'use client'

import { QuestTypeEnum } from '@/constants/common.const'
import Invite from '@/modules/create-quest/quest-type/invite'
import Quizzes from '@/modules/create-quest/quest-type/quizzes'
import { QuestTypeText } from '@/modules/create-quest/quest-type/text'
import TwitterList from '@/modules/create-quest/quest-type/twitter'
import { VisitLink } from '@/modules/create-quest/quest-type/visit-link'
import { NewQuestStore } from '@/store/local/new-quest.store'

const QuestType = () => {
  // Data
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const telegramLink = NewQuestStore.useStoreState((state) => state.telegramLink)

  const project = NewQuestStore.useStoreState((state) => state.project)

  // Actions
  const setTelegramLink = NewQuestStore.useStoreActions((actions) => actions.setTelegramLink)

  const onConnectDiscord = () => {
    // signIn(Oauth2ProviderEnum.DISCORD_BOT_PROVIDER)
    // TODO: sign with discord.
  }
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
      return <></>
    case QuestTypeEnum.TWITTER:
      return <TwitterList />
    case QuestTypeEnum.JOIN_TELEGRAM:
      return <></>
    // return (
    //   <>
    //     <Divider />
    //     <PICard>
    //       <Label>{'JOIN TELEGRAM'}</Label>
    //       <TextField
    //         onChange={(e) => setTelegramLink(e.target.value)}
    //         placeholder='Telegram invite link'
    //         value={telegramLink}
    //         required
    //         errorMsg='You must have a url to telegramLink submission.'
    //       />
    //       <NormalText>{'Invite link should be in the format https://t.me/groupid'}</NormalText>
    //     </PICard>
    //   </>
    // )
    case QuestTypeEnum.INVITES:
      return <Invite />
    case QuestTypeEnum.DISCORD:
      return <></>
    // return (
    //   <>
    //     {!project.discord && (
    //       <FullWidthBtn className='mt-3' onClick={onConnectDiscord}>
    //         Connect with Discord
    //       </FullWidthBtn>
    //     )}
    //   </>
    // )
  }
  return <></>
}

export default QuestType
