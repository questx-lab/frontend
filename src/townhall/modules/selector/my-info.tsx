import { FC, ReactNode, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { CircularImage } from '@/widgets/circular-image'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { BadgeDetailType, UserType, CharacterType, UserCharacterType } from '@/types'
import StorageConst from '@/constants/storage.const'
import { Gap } from '@/widgets/separator'
import { Label, TextSm } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { getMyCharactersApi } from '@/api/townhall'
import toast from 'react-hot-toast'
import { phaserEvents, Event } from '@/townhall/engine/events/event-center'
import { getMyBadgeDetailsApi } from '@/api/user'
import RoomStore from '@/store/townhall/room'
import {
  OptionxBox,
  PopItem,
  PopPanel,
  PopoverButton,
  PopoverPosition,
  PopoverSize,
} from '@/widgets/popover'
import { getMyFollowerInfoApi } from '@/api/communitiy'

const Frame = tw(Vertical)`
  w-[450px]
  h-[800px]
  bg-white
`

const FullVertical = tw(VerticalFullWidth)`
  items-end
  p-2
`

const MainBox = tw.div`
  border-2
  rounded
  mx-6
`

const InfoBox = tw(Horizontal)`
  px-4
`

const PlayerBox = tw(Vertical)`
  flex
  justify-center
  border-b-2
  w-full
`

const Player = tw.div`
  flex
  justify-center
  w-full
  bg-[#f3f4f6]
`

const CharactersBox = tw(Vertical)`
  p-4
  border-b-2
  w-full
  h-[180px]
`

const TagBox = tw(Horizontal)`
  p-4
  border-b-2
  w-full
`

const Tag = tw.div`
  py-1
  px-3
  bg-[#DEE0E3]
  rounded-xl
`

const TagSelected = tw.div`
  py-1
  px-3
  bg-[#565ADD]
  text-white
  rounded-xl
`

const PointBox = tw.div`
  p-4
`

const GemBox = tw.div`
  rounded-full
  bg-orange-100
`

const CharacterListBox = tw.div`
  grid 
  grid-cols-4
  gap-4
`

const CharacterBox = tw.div`
  flex
  justify-center
  border-2
  rounded
  h-full
  bg-[#f3f4f6]
  relative
`

const BadgeListBox = tw.div`
  grid 
  grid-cols-10
  gap-4
  p-4
`

const EquippedBox = tw.div`
  absolute 
  bottom-0
  bg-[#22C55E]
  text-white
  rounded
  text-xs
  p-1
`
const Absolute = tw.div`
  absolute
  z-50
`

const CharacterOption: FC<{ character: UserCharacterType; children: ReactNode }> = ({
  character,
  children,
}) => {
  const onActionClicked = (action: string) => {}
  return (
    <PopoverPosition>
      <PopoverButton className={'outline-0'}>{children}</PopoverButton>
      <Absolute>
        <PopPanel size={PopoverSize.SMALL}>
          <PopItem>
            <OptionxBox onClick={() => onActionClicked('Remove')}>{'Remove'}</OptionxBox>
            <OptionxBox onClick={() => onActionClicked('Drop')}>{'Drop'}</OptionxBox>
          </PopItem>
        </PopPanel>
      </Absolute>
    </PopoverPosition>
  )
}

const BadgeList: FC = () => {
  const community = RoomStore.useStoreState((state) => state.community)
  const [badges, characterBadges] = useState<BadgeDetailType[]>([])

  const fetchBadges = async () => {
    const data = await getMyBadgeDetailsApi(community.handle)
    if (data.code === 0 && data.data) characterBadges(data.data.badge_details)
    if (data.error) {
      toast.error(data.error)
    }
  }
  useEffect(() => {
    fetchBadges()
  }, [])

  return (
    <BadgeListBox>
      {badges &&
        badges.map((badge) => (
          <Image
            width={40}
            height={40}
            src={badge.badge.icon_url || StorageConst.USER_DEFAULT.src}
            alt={badge.badge.name}
          />
        ))}
    </BadgeListBox>
  )
}

const CharacterList: FC<{ equippedId: string }> = ({ equippedId }) => {
  const community = RoomStore.useStoreState((state) => state.community)
  const [characters, setCharacters] = useState<UserCharacterType[]>([])

  const fetchCharacters = async () => {
    const data = await getMyCharactersApi(community.handle)
    if (data.code === 0 && data.data) setCharacters(data.data.user_characters)
    if (data.error) {
      toast.error(data.error)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  const onChangeCharacter = (character: UserCharacterType) => {
    // phaserEvents.emit(Event.PLAYER_SET_CHANGE, character.game_character.name)
  }

  return (
    <CharacterListBox>
      {characters.map((character) => (
        <CharacterOption character={character}>
          <CharacterBox onClick={() => onChangeCharacter(character)}>
            <Image
              width={80}
              height={80}
              src={character.game_character.thumbnail_url || StorageConst.USER_DEFAULT.src}
              alt={'Character'}
            />
            {character.game_character.id === equippedId && <EquippedBox> EQUIPPED </EquippedBox>}
          </CharacterBox>
        </CharacterOption>
      ))}
    </CharacterListBox>
  )
}

const MyInfoSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const community = RoomStore.useStoreState((state) => state.community)
  const [point, setPoint] = useState<number>(0)

  const fetchMyFollowerInfo = async () => {
    const data = await getMyFollowerInfoApi(community.handle)
    if (data.code === 0 && data.data) {
      setPoint(data.data.points)
    }
    if (data.error) {
      toast.error(data.error)
    }
  }

  useEffect(() => {
    fetchMyFollowerInfo()
  }, [])

  if (playerSelector !== ItemType.MY_INFO) {
    return <></>
  }

  const onClose = () => {
    phaserGame.changePlayerSelectorListeners(ItemType.NONE)
    if (phaserGame.isPaused) {
      phaserGame.resume()
    }
  }

  return (
    <Frame>
      <FullVertical>
        <CloseIcon onClick={onClose} />
      </FullVertical>
      <InfoBox>
        <CircularImage
          width={48}
          height={48}
          src={user.avatar_url || StorageConst.USER_DEFAULT.src}
          alt={'Avatar'}
        />
        <Gap width={2} />
        <FullVertical>
          <Label> {user.name || ''}</Label>
        </FullVertical>
      </InfoBox>
      <BadgeList />
      <MainBox>
        <PlayerBox>
          <Player>
            <Image width={264} height={264} src={StorageConst.USER_DEFAULT.src} alt={'Avatar'} />
          </Player>
        </PlayerBox>
        <TagBox>
          <TagSelected> Cosmetics </TagSelected>
          <Gap width={2} />
          <Tag> Vouchers </Tag>
        </TagBox>
        <CharactersBox>
          <CharacterList equippedId={'1'} />
        </CharactersBox>
        <PointBox>
          <Horizontal>
            <GemBox>
              <Image width={18} height={18} src={StorageConst.GEM.src} />
            </GemBox>
            <Gap width={1} />
            <TextSm>{point}</TextSm>
          </Horizontal>
        </PointBox>
      </MainBox>
    </Frame>
  )
}

export default MyInfoSelector
