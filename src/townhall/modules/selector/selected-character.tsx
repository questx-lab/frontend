import { CloseIcon } from '@/widgets/image'
import {
  HorizontalCenter,
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { FC } from 'react'
import tw from 'twin.macro'
import { Image } from '@/widgets/image'
import StorageConst from '@/constants/storage.const'
import { Gap } from '@/widgets/separator'
import { TextSm } from '@/widgets/text'
import RoomStore from '@/store/townhall/room'
import { PositiveButton } from '@/widgets/buttons'
import { buyCharacterApi } from '@/api/townhall'
import toast from 'react-hot-toast'
import { select } from '@material-tailwind/react'

const Frame = tw(Vertical)`
  w-[250px]
  h-[420px]
  bg-white
  rounded
`

const FullVertical = tw(VerticalFullWidth)`
  items-end
  p-2
`

const Avatar = tw.div`
  flex
  justify-center
  py-4
  w-full
`

const CharacterLabel = tw.div`
  text-xl
  uppercase
  text-center
  w-full
  font-bold
`

const GemBox = tw.div`
  rounded-full
  bg-orange-100
`

const SelectedCharacter: FC<{ onClose: () => void }> = ({ onClose }) => {
  const selectedCharacter = RoomStore.useStoreState((state) => state.selectedCharacter)
  const community = RoomStore.useStoreState((state) => state.community)

  const onBuy = async () => {
    const resp = await buyCharacterApi(community.handle, selectedCharacter?.id || '')
    if (resp.code === 0 && resp.data) {
      toast.success('Buy character successful')
      onClose()
    }
    if (resp.error) {
      toast.error(resp.error)
    }
  }
  return (
    <Frame>
      <FullVertical>
        <CloseIcon onClick={onClose} />
        <Vertical className='w-full border-b-2'>
          <Avatar>
            <Image
              width={144}
              height={144}
              src={selectedCharacter?.thumbnail_url || StorageConst.USER_DEFAULT.src}
              alt={'Avatar'}
            />
          </Avatar>
          <HorizontalFullWidth className='justify-center'>
            <Image
              width={24}
              height={24}
              src={'/images/icons/character_level_3.svg'}
              alt={'Avatar'}
            />
          </HorizontalFullWidth>
          <Gap height={2} />
        </Vertical>
        <Gap height={3} />
        <CharacterLabel> {selectedCharacter?.name || ''} </CharacterLabel>
        <Gap height={3} />
        <HorizontalCenter className='w-full'>
          <GemBox>
            <Image width={36} height={36} src={StorageConst.GEM.src} />
          </GemBox>

          <TextSm className='text-xl font-bold'>{selectedCharacter?.points || 0}</TextSm>
        </HorizontalCenter>
        <Gap height={3} />
        <div className='w-full px-4'>
          <PositiveButton isFull block={false} onClick={onBuy} requireLogin>
            {'Exchange'}
          </PositiveButton>
        </div>
      </FullVertical>
    </Frame>
  )
}

export default SelectedCharacter
