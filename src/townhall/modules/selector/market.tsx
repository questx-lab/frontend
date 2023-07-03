import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType, SetType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { Label } from '@/widgets/text'
import { Gap } from '@/widgets/separator'
import MyInfoSelector from '@/townhall/modules/selector/my-info'
import { getSetListApi } from '@/api/townhall'
import { phaserEvents, Event } from '@/townhall/engine/events/event-center'
import toast from 'react-hot-toast'
import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'

const Frame = tw(Vertical)`
  w-[450px]
  h-[800px]
  bg-white
  pb-6
`

const FullVertical = tw(VerticalFullWidth)`
  items-end
  p-2
`

const InfoBox = tw(Horizontal)`
  px-4
`

const MainBox = tw.div`
  border-2
  rounded
  mx-6
  h-full
`

const SetsBox = tw(Vertical)`
  p-4
  w-full
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
  bg-[#f3f4f6]
`

const SetList: FC = () => {
  const [sets, setSets] = useState<SetType[]>([])
  const fetchSets = async () => {
    const data = await getSetListApi()
    if (data.code === 0 && data.data) setSets(data.data?.sets)
    if (data.error) {
      toast.error(data.error)
    }
  }
  useEffect(() => {
    fetchSets()
  }, [])

  const onChangeSet = (set: SetType) => {
    phaserEvents.emit(Event.PLAYER_BUY_SET, set)
  }

  return (
    <SetListBox>
      {sets.map((set) => (
        <SetBox onClick={() => onChangeSet(set)}>
          <Image
            width={80}
            height={80}
            src={set.img_url || StorageConst.USER_DEFAULT.src}
            alt={'Set'}
          />
        </SetBox>
      ))}
    </SetListBox>
  )
}

const MarketSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
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
    <Horizontal>
      <Frame>
        <FullVertical>
          <CloseIcon onClick={onClose} />
        </FullVertical>
        <InfoBox>
          <Image width={30} height={30} src={StorageConst.EXCHANGE.src} alt={'Exchange'} />
          <Gap width={2} />
          <FullVertical>
            <Label> Exchange Center</Label>
          </FullVertical>
        </InfoBox>
        <Gap height={2} />
        <MainBox>
          <SetsBox>
            <SetList />
          </SetsBox>
        </MainBox>
      </Frame>
      <Gap width={5} />
      <MyInfoSelector playerSelector={playerSelector} />
    </Horizontal>
  )
}

export default MarketSelector
