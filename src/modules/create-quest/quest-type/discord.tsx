import { Fragment, FunctionComponent } from 'react'

import { handleLoginDiscord } from '@/handler/auth/discord'
import { CommunityStore } from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { PositiveButton } from '@/widgets/buttons'
import { TextField } from '@/widgets/form'
import { NormalText } from '@/widgets/text'

const Discord: FunctionComponent = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const discordLink = NewQuestStore.useStoreState((state) => state.discordLink)
  const setDiscordLink = NewQuestStore.useStoreActions((action) => action.setDiscordLink)

  if (!community) {
    return <></>
  }

  if (!community.discord) {
    return (
      <Fragment>
        <Gap height={1} />
        <PositiveButton
          isFull
          onClick={() =>
            handleLoginDiscord({
              joinCommunity: true,
              communityHandle: community.handle,
            })
          }
        >
          Connect with Discord
        </PositiveButton>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <NormalText>{'Invite Link Discord'}</NormalText>
      <TextField
        onChange={(e) => setDiscordLink(e.target.value)}
        placeholder='Enter invite link discord to join community'
        value={discordLink}
        required
        msg='This field is required'
      />
    </Fragment>
  )
}

export default Discord
