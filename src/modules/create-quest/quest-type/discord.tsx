import { NewQuestStore } from '@/store/local/new-quest.store'
import { PositiveButton } from '@/widgets/button'
import { FunctionComponent } from 'react'

const Discord: FunctionComponent = () => {
  const project = NewQuestStore.useStoreState((state) => state.project)

  const onConnectDiscord = () => {
    // signIn(Oauth2ProviderEnum.DISCORD_BOT_PROVIDER)
    // TODO: sign with discord.
  }

  return (
    <>
      {!project.discord && (
        <PositiveButton onClick={onConnectDiscord}>Connect with Discord</PositiveButton>
      )}
    </>
  )
}

export default Discord
