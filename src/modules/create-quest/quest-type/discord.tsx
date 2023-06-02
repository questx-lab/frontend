import { FunctionComponent } from 'react'

import { CommunityStore } from '@/store/local/community'
import { Gap } from '@/styles/common.style'
import { PositiveButton } from '@/widgets/buttons/button'

const Discord: FunctionComponent = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const onConnectDiscord = () => {
    // signIn(Oauth2ProviderEnum.DISCORD_BOT_PROVIDER)
    // TODO: sign with discord.
  }

  if (!community) {
    return <></>
  }

  return (
    <>
      {community.discord && (
        <>
          <Gap height={1} />
          <PositiveButton isFull onClick={onConnectDiscord}>
            Connect with Discord
          </PositiveButton>
        </>
      )}
    </>
  )
}

export default Discord
