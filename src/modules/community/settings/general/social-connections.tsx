import { FC } from 'react'

import { SizeEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
import AddressWallet from '@/modules/community/settings/general/address-wallet'
import CommunityStore from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3 } from '@/widgets/text'

const DiscordConnect: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  if (community.discord !== '') {
    return (
      <PositiveButton block width={SizeEnum.x64}>
        <Image
          width={30}
          height={30}
          src={StorageConst.DISCORD_DIR.src}
          alt={StorageConst.DISCORD_DIR.alt}
        />
        {community.discord}
      </PositiveButton>
    )
  }

  return (
    <PositiveButton
      onClick={() =>
        handleLoginDiscord({
          joinCommunity: true,
          communityHandle: community.handle,
        })
      }
      type={ButtonTypeEnum.NEGATIVE}
      width={SizeEnum.x64}
    >
      <Image
        width={30}
        height={30}
        src={StorageConst.DISCORD_DIR.src}
        alt={StorageConst.DISCORD_DIR.alt}
      />
      {'Connect Discord'}
    </PositiveButton>
  )
}

const SocialConnection: FC = () => {
  // data
  const websiteUrl = NewCommunityStore.useStoreState((state) => state.websiteUrl)
  const discordInviteLink = NewCommunityStore.useStoreState((state) => state.discordInviteLink)
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setWebsiteUrl = NewCommunityStore.useStoreActions((action) => action.setWebsiteUrl)
  const setDiscordInviteLink = NewCommunityStore.useStoreActions(
    (action) => action.setDiscordInviteLink
  )

  return (
    <VerticalFullWidth>
      <VerticalFullWidth>
        <HeaderText3>{'WEBSITE URL'}</HeaderText3>
        <Gap height={2} />
        <TextField value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}></TextField>
        <Gap height={6} />
      </VerticalFullWidth>
      {community.discord !== '' && (
        <VerticalFullWidth>
          <HeaderText3>{'DISCORD INVITE JOIN COMMUNITY URL'}</HeaderText3>
          <Gap height={2} />
          <TextField
            value={discordInviteLink}
            onChange={(e) => setDiscordInviteLink(e.target.value)}
          />
          <Gap height={6} />
        </VerticalFullWidth>
      )}
      <AddressWallet />
      <HeaderText3>{'SOCIAL CONNECTION'}</HeaderText3>
      <Gap height={2} />
      <DiscordConnect />
    </VerticalFullWidth>
  )
}

export default SocialConnection
