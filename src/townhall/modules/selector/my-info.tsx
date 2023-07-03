import { FC, ReactNode, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType, SetType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { CircularImage } from '@/widgets/circular-image'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { BadgeDetailType, UserType } from '@/types'
import StorageConst from '@/constants/storage.const'
import { Gap } from '@/widgets/separator'
import { Label, TextSm } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { getMySetsApi } from '@/api/townhall'
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

const SetsBox = tw(Vertical)`
  p-4
  border-b-2
  w-full
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

const SetListBox = tw.div`
  grid 
  grid-cols-4
  gap-4
`

const SetBox = tw.div`
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

const SetOption: FC<{ set: SetType; children: ReactNode }> = ({ set, children }) => {
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
  const [badges, setBadges] = useState<BadgeDetailType[]>([])

  const fetchBadges = async () => {
    const data = await getMyBadgeDetailsApi(community.handle)
    if (data.code === 0 && data.data) setBadges(data.data.badge_details)
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

const SetList: FC<{ equippedId: string }> = ({ equippedId }) => {
  const [sets, setSets] = useState<SetType[]>([])
  const fetchSets = async () => {
    const data = await getMySetsApi()
    if (data.code === 0 && data.data) setSets(data.data?.sets)
    if (data.error) {
      toast.error(data.error)
    }
  }
  useEffect(() => {
    fetchSets()
  }, [])

  const onChangeSet = (set: SetType) => {
    phaserEvents.emit(Event.PLAYER_SET_CHANGE, set.name)
  }

  return (
    <SetListBox>
      {sets.map((set) => (
        <SetOption set={set}>
          <SetBox onClick={() => onChangeSet(set)}>
            <Image
              width={80}
              height={80}
              src={set.img_url || StorageConst.USER_DEFAULT.src}
              alt={'Set'}
            />
            {set.id === equippedId && <EquippedBox> EQUIPPED </EquippedBox>}
          </SetBox>
        </SetOption>
      ))}
    </SetListBox>
  )
}

const MyInfoSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

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
            <Image width={264} height={264} src={'/images/characters/adam.svg'} alt={'Avatar'} />
          </Player>
        </PlayerBox>
        <TagBox>
          <TagSelected> Cosmetics </TagSelected>
          <Gap width={2} />
          <Tag> Vouchers </Tag>
        </TagBox>
        <SetsBox>
          <SetList equippedId={'1'} />
        </SetsBox>
        <PointBox>
          <Horizontal>
            <GemBox>
              <Image width={18} height={18} src={StorageConst.GEM.src} />
            </GemBox>
            <Gap width={1} />
            <TextSm>{3200}</TextSm>
          </Horizontal>
        </PointBox>
      </MainBox>
    </Frame>
  )
}

export default MyInfoSelector
