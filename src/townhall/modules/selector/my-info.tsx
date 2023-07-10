import { FC, ReactNode, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { CircularImage } from '@/widgets/circular-image'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { BadgeDetailType, UserType, UserCharacterType } from '@/types'
import StorageConst from '@/constants/storage.const'
import { Gap } from '@/widgets/separator'
import { Label, TextSm } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { getMyCharactersApi, getMyCharactersByRoomApi } from '@/api/townhall'
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
  rounded
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
  h-[240px]
  overflow-scroll
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
  const currentCharacter = RoomStore.useStoreState((state) => state.currentCharacter)

  let actionList = ['Equip', 'Drop']
  if (currentCharacter?.id === character.game_character.id) actionList = ['Remove', 'Drop']

  const onActionClicked = (action: string) => {
    if (action === 'Equip') phaserGame.changeCharacter(character.game_character.id)
  }
  return (
    <PopoverPosition>
      <PopoverButton className={'outline-0'}>{children}</PopoverButton>
      <Absolute>
        <PopPanel size={PopoverSize.SMALL}>
          <PopItem>
            {actionList.map((action) => (
              <OptionxBox onClick={() => onActionClicked(action)}>{action}</OptionxBox>
            ))}
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
  const selectedCharacter = RoomStore.useStoreState((state) => state.selectedCharacter)

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

  useEffect(() => {
    if (selectedCharacter === undefined) fetchCharacters()
  }, [selectedCharacter])
  return (
    <CharacterListBox>
      {characters.map((character) => (
        <CharacterOption character={character}>
          <CharacterBox>
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
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const roomId = gameRooms.length > 0 ? gameRooms[0].id : ''
  const currentCharacter = RoomStore.useStoreState((state) => state.currentCharacter)
  const setCurrentCharacter = RoomStore.useStoreActions((action) => action.setCurrentCharacter)

  const fetchCurrentCharacter = async () => {
    const resp = await getMyCharactersByRoomApi(roomId)

    if (resp.code === 0 && resp.data) {
      const cur = resp.data.user_characters.find((character) => character.is_equipped)
      if (cur) setCurrentCharacter(cur.game_character)
    }
    if (resp.error) {
      toast.error(resp.error)
    }
  }

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
    fetchCurrentCharacter()
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
          <Label className='text-base'> {user.name || ''}</Label>
        </FullVertical>
      </InfoBox>
      <BadgeList />
      <MainBox>
        <PlayerBox>
          <Player>
            <Image
              width={264}
              height={264}
              src={currentCharacter?.thumbnail_url || StorageConst.USER_DEFAULT.src}
              alt={'Avatar'}
            />
          </Player>
        </PlayerBox>
        <TagBox>
          <TagSelected> Cosmetics </TagSelected>
          <Gap width={2} />
          <Tag> Vouchers </Tag>
        </TagBox>
        <CharactersBox>
          <CharacterList equippedId={currentCharacter?.id || ''} />
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
