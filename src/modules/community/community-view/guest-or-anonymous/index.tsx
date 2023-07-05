import { FC, useState } from 'react'

import { BrowserView } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import CommunityQuests from '@/modules/community/community-view/guest-or-anonymous/community-quests'
import FollowCommunity from '@/modules/community/community-view/guest-or-anonymous/follow-community'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import { BorderBottom, FixedWidth, PaddingHorizontal } from '@/modules/community/mini-widget'
import CommunityStore from '@/store/local/community'
import { onCopy } from '@/utils/helper'
import { PositiveButton } from '@/widgets/buttons'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalStartCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'
import SelectCharacter from '@/modules/community/community-view/guest-or-anonymous/select-character'
import BaseModal from '@/widgets/modal/base'
import { getMyCharactersApi } from '@/api/user'

const Content = tw(VerticalFullWidth)`
  justify-start
  items-center
  gap-0
`

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

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
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
  const navigate = useNavigate()

  const [showCharacterSelectModal, setShowCharacterSelectModal] = useState<boolean>(false)

  if (!community) {
    return <></>
  }
  const joinTownhall = async () => {
    const resp = await getMyCharactersApi(community.handle)
    console.log(resp.data)

    if (resp.data && resp.data.user_characters.length === 0) setShowCharacterSelectModal(true)
    else navigate(RouterConst.TOWNHALL + `/${community.handle}`)
  }

  return (
    <Content>
      <BorderBottom>
        <FixedWidth>
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
                  <BrowserView>
                    <PositiveButton onClick={joinTownhall}>{'Join Town Hall'}</PositiveButton>
                  </BrowserView>
                  <CenterEndHorizontal>
                    <FollowCommunity community={community} />
                  </CenterEndHorizontal>
                </ReponsiveHorizontal>
              </VerticalCenter>
            </FullWidthHorizontal>
          </PaddingHorizontal>
        </FixedWidth>
      </BorderBottom>

      <CommunityQuests />

      <FixedWidth>
        <Leaderboard />
      </FixedWidth>
      <BaseModal isOpen={showCharacterSelectModal}>
        <ModalBox>
          <SelectCharacter setOpen={setShowCharacterSelectModal} />
        </ModalBox>
      </BaseModal>
    </Content>
  )
}

export default CommunityGuestOrAnonymous
