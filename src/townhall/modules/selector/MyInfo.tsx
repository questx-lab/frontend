import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType, SetType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { CircularImage } from '@/widgets/circular-image'
import { GlobalStoreModel } from '@/store/store'
import { useStoreState } from 'easy-peasy'
import { UserType } from '@/types'
import StorageConst from '@/constants/storage.const'
import { Gap } from '@/widgets/separator'
import { Label, TextSm } from '@/widgets/text'
import { SmallText } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { getSetsApi } from '@/api/townhall'
import toast from 'react-hot-toast'
import { phaserEvents, Event } from '@/townhall/engine/events/event-center'

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
  h-full
  w-full
  p-2
`

const InfoBox = tw(Horizontal)`
  px-4
  py-2
`

const PlayerBox = tw(Vertical)`
  flex
  justify-center
  border-b-2
  w-full
  p-12
`

const Player = tw.div`
  flex
  justify-center
  w-full
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
  rounded-full
`

const TagSelected = tw.div`
  py-1
  px-3
  bg-black
  text-white
  rounded-full
`

const PointBox = tw.div`
  p-6
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
  w-full
  border-2
  rounded
  h-full
  p-5
`

const SetList: FC<{ equippedId: string }> = ({ equippedId }) => {
  const [sets, setSets] = useState<SetType[]>([])
  const fetchSets = async () => {
    const data = await getSetsApi()
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
        <SetBox onClick={() => onChangeSet(set)}>
          <Image
            width={60}
            height={60}
            src={set.img_url || StorageConst.USER_DEFAULT.src}
            alt={'Set'}
          />
        </SetBox>
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
          <SmallText> {user.role} </SmallText>
        </FullVertical>
      </InfoBox>
      <Gap height={2} />
      <MainBox>
        <PlayerBox>
          <Player>
            <Image width={200} height={200} src={StorageConst.USER_DEFAULT.src} alt={'Avatar'} />
          </Player>
        </PlayerBox>
        <TagBox>
          <Tag> Sets </Tag>
          <Gap width={1} />
          <TagSelected> Vouchers </TagSelected>
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
