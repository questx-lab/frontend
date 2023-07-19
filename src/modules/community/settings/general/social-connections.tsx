import { FC } from 'react'

import { SizeEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
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

  // action
  const setWebsiteUrl = NewCommunityStore.useStoreActions((action) => action.setWebsiteUrl)

  return (
    <VerticalFullWidth>
      <VerticalFullWidth className='gap-3'>
        <HeaderText3>{'WEBSITE URL'}</HeaderText3>
        <TextField value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}></TextField>
        <Gap height={6} />
      </VerticalFullWidth>

      <HeaderText3>{'SOCIAL CONNECTION'}</HeaderText3>
      <DiscordConnect />
    </VerticalFullWidth>
  )
}

export default SocialConnection
