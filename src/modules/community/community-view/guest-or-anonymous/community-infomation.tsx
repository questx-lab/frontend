import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, unFollowCommunityApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import StorageConst from '@/constants/storage.const'
import FollowCommunity from '@/modules/community/community-view/guest-or-anonymous/follow-community'
import { BorderBottom, FixedWidth, PaddingHorizontal } from '@/modules/community/mini-widget'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { onCopy } from '@/utils/helper'
import { Image } from '@/widgets/image'
import ConfirmationModal from '@/widgets/modal/confirmation'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalStartCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const VerticalCenter = tw(VerticalFullWidth)`
  h-full
  justify-center
  max-sm:items-center
  gap-3
`

const Introduce = tw.div`
  text-sm
  text-gray-700
  font-normal
  overflow-hidden
  text-ellipsis
  line-clamp-3
`

const FullWidthHorizontal = tw(HorizontalCenter)`
  w-full
  max-sm:w-full
  max-sm:flex-col
`

const ReponsiveHorizontal = tw(HorizontalBetweenCenterFullWidth)`
  max-sm:flex-col
  gap-3
`

const CenterEndHorizontal = tw(HorizontalCenter)`
  justify-end
`

const PointerImage = tw(Image)`
  cursor-pointer
`

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
    <Link to={discordUrl} target='_blank'>
      <PointerImage
        width={30}
        height={30}
        src={StorageConst.DISCORD_BLACK_DIR.src}
        alt={StorageConst.DISCORD_BLACK_DIR.alt}
      />
    </Link>
  )
}

const CommunityInformation: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const showUnfollowConfirmation = CommunityStore.useStoreState(
    (state) => state.showUnfollowConfirmation
  )
  const setShowUnfollowConfirmation = CommunityStore.useStoreActions(
    (action) => action.setShowUnfollowConfirmation
  )

  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )

  const unfollowCommunity = async () => {
    const resp = await unFollowCommunityApi(community.handle)
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) toast.success('Unfollow successful')
    if (resp.error) {
      toast.error(resp.error)
    }

    setShowUnfollowConfirmation(false)
    const result = await getFollowCommunitiesApi()

    if (result.code === ErrorCodes.NOT_ERROR) {
      setCommunitiesFollowing(result.data?.followers)
    }
  }
  return (
    <BorderBottom>
      <FixedWidth>
        <PaddingHorizontal>
          <Image
            width={168}
            height={168}
            src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt={StorageConst.COMMUNITY_DEFAULT.alt}
            className='rounded-lg'
          />
          <FullWidthHorizontal>
            <VerticalCenter>
              <Text2xl>{community.display_name}</Text2xl>
              <Introduce>{community.introduction}</Introduce>
              <HorizontalStartCenter>
                <TwitterLink twitterUrl={community.twitter} />
                <DiscordLink discordUrl={community.discord_invite_link} />
              </HorizontalStartCenter>
              <ReponsiveHorizontal>
                <CenterEndHorizontal>
                  <FollowCommunity community={community} />
                  <ConfirmationModal
                    title={'Are you sure you want to unfollow this community?'}
                    isOpen={showUnfollowConfirmation}
                    onClose={() => setShowUnfollowConfirmation(false)}
                    onPositiveClicked={() => unfollowCommunity()}
                  />
                </CenterEndHorizontal>
              </ReponsiveHorizontal>
            </VerticalCenter>
          </FullWidthHorizontal>
        </PaddingHorizontal>
      </FixedWidth>
    </BorderBottom>
  )
}

export default CommunityInformation
