import { FC } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import CommunityQuests from '@/modules/community/community-view/guest-or-anonymous/community-quests'
import FollowCommunity from '@/modules/community/community-view/guest-or-anonymous/follow-community'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import CommunityStore from '@/store/local/community'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalStartCenter,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const Content = tw(Vertical)`
  max-sm:px-2
  md:px-8
  xl:w-[980px]
  md:w-[780px]
  pb-[30px]
  w-full
  gap-6
  mr-[350px]
  2xl:mr-[280px]
  max-md:mr-0
`

const VerticalCenter = tw(VerticalFullWidth)`
  h-full
  justify-center
  max-sm:items-center
  gap-3
`

const PaddingHorizontal = tw(HorizontalBetweenCenterFullWidth)`
  max-sm:flex-col
  max-sm:justify-start
  max-sm:items-start
  p-3
  rounded-lg
  gap-6
`

const Introduce = tw.div`
  text-lg
  text-gray-700
  font-normal
  overflow-hidden
  text-ellipsis
  line-clamp-2
`

const FullWidthHorizontal = tw(HorizontalCenter)`
  w-full
  max-sm:w-full
  max-sm:flex-col
`

const ReponsiveHorizontal = tw(HorizontalBetweenCenterFullWidth)`
  max-sm:flex-col
`

const CenterEndHorizontal = tw(HorizontalCenter)`
  justify-end
`

const PointerImage = tw(Image)`
  cursor-pointer
`

const onCopy = (url: string) => {
  if (url) {
    navigator.clipboard.writeText(url)
    toast(`Copied ${url}`, {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }
}

const TwitterLink: FC<{ twitterUrl?: string }> = ({ twitterUrl }) => {
  if (!twitterUrl) {
    return <></>
  }

  return (
    <PointerImage
      onClick={() => onCopy(twitterUrl)}
      width={30}
      height={30}
      src={StorageConst.TWITTER_BLACK_DIR.src}
      alt={StorageConst.TWITTER_BLACK_DIR.alt}
    />
  )
}

const DiscordLink: FC<{ discordUrl?: string }> = ({ discordUrl }) => {
  if (!discordUrl) {
    return <></>
  }

  return (
    <PointerImage
      onClick={() => onCopy(discordUrl)}
      width={30}
      height={30}
      src={StorageConst.DISCORD_BLACK_DIR.src}
      alt={StorageConst.DISCORD_BLACK_DIR.alt}
    />
  )
}

const CommunityGuestOrAnonymous: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  if (!community) {
    return <></>
  }

  return (
    <Content>
      <PaddingHorizontal>
        <CircularImage
          width={200}
          height={200}
          src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
          alt={StorageConst.COMMUNITY_DEFAULT.alt}
        />
        <FullWidthHorizontal>
          <VerticalCenter>
            <Text2xl>{community.display_name}</Text2xl>
            <Introduce>{community.introduction}</Introduce>
            <HorizontalStartCenter>
              <TwitterLink twitterUrl={community.twitter} />
              <DiscordLink discordUrl={community.discord} />
            </HorizontalStartCenter>
            <ReponsiveHorizontal>
              {/* TODO: Town hall <PositiveButton block>{'Join Town Hall'}</PositiveButton> */}
              <CenterEndHorizontal>
                <FollowCommunity community={community} />
              </CenterEndHorizontal>
            </ReponsiveHorizontal>
          </VerticalCenter>
        </FullWidthHorizontal>
      </PaddingHorizontal>
      <CommunityQuests />
      <Leaderboard />
    </Content>
  )
}

export default CommunityGuestOrAnonymous
