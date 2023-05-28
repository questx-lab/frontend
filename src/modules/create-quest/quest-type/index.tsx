'use client'

import { FunctionComponent } from 'react'

import { QuestTypeEnum } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { InputInviteBox } from '@/styles/input.style'
import { NegativeButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import { Label, NormalText } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'
import { QuestTypeText } from '@/modules/create-quest/quest-type/text'
import { OuterBox } from '@/modules/create-quest/quest-type/mini-widget'
import { VisitLink } from '@/modules/create-quest/quest-type/visit-link'
import Quizzes from '@/modules/create-quest/quest-type/quizzes'

// import TwitterList from './twitter-list'

const QuestType = () => {
  // Data
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const textAutoValid = NewQuestStore.useStoreState((state) => state.textAutoValid)
  const telegramLink = NewQuestStore.useStoreState((state) => state.telegramLink)

  const project = NewQuestStore.useStoreState((state) => state.project)

  const invites = NewQuestStore.useStoreState((state) => state.invites)

  // Actions
  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setTelegramLink = NewQuestStore.useStoreActions((actions) => actions.setTelegramLink)
  const setInvites = NewQuestStore.useStoreActions((actions) => actions.setInvites)

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
      // return <TwitterList />
      return <></>
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
      return <></>
    // return (
    //   <>
    //     <Divider />
    //     <PICard>
    //       <Label>{'INVITES'}</Label>
    //       <Gap height={2} />
    //       <InputInviteBox
    //         onChange={(e) => setInvites(parseInt(e.target.value ?? '0'))}
    //         defaultValue={invites}
    //         type='number'
    //       />
    //       <Gap height={2} />
    //       <LabelDes>{'Invited user needs to complete 1 quest for invite to count'}</LabelDes>
    //     </PICard>
    //   </>
    // )
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
