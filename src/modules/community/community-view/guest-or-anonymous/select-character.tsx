import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal } from '@/widgets/orientation'
import { Label } from '@/widgets/text'
import { Gap } from '@/widgets/separator'
import toast from 'react-hot-toast'
import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import ConfirmationModal from '@/widgets/modal/confirmation'
import CommunityStore from '@/store/local/community'
import { RouterConst } from '@/constants/router.const'
import { useNavigate } from 'react-router-dom'
import { CharacterType } from '@/types'
import { buyCharacterApi, getCharactersApi } from '@/api/communitiy'

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

const CharactersBox = tw(Vertical)`
  p-4
  w-full
`

const CharacterListBox = tw.div`
  grid 
  grid-cols-4
  gap-4
  w-full
`

const CharacterBox = tw.div`
  flex
  justify-center
  border-2
  rounded
  bg-[#f3f4f6]
`

const CharacterList: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const navigate = useNavigate()
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isShowConfirmCharacter, setIsShowConfirmCharacter] = useState<boolean>(false)
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>()
  const fetchCharacters = async () => {
    const data = await getCharactersApi()
    if (data.code === 0 && data.data) setCharacters(data.data?.game_characters)
    if (data.error) {
      toast.error(data.error)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [])

  const onSelectCharacter = async () => {
    const resp = await buyCharacterApi(community.handle, selectedCharacter?.id || '')
    if (resp.code === 0 && resp.data) {
      navigate(RouterConst.TOWNHALL + `/${community.handle}`)
    } else {
      toast.error(resp.error || '')
    }
    setIsShowConfirmCharacter(false)
  }

  return (
    <CharacterListBox>
      {characters.map((character) => (
        <CharacterBox
          onClick={() => {
            setSelectedCharacter(character)
            setIsShowConfirmCharacter(true)
          }}
        >
          <Image
            width={80}
            height={80}
            src={character.image_url || StorageConst.USER_DEFAULT.src}
            alt={'Character'}
          />
        </CharacterBox>
      ))}
      <ConfirmationModal
        isOpen={isShowConfirmCharacter}
        title='Confirm choose character'
        onClose={() => setIsShowConfirmCharacter(false)}
        onPositiveClicked={onSelectCharacter}
      />
    </CharacterListBox>
  )
}

const SelectCharacter: FC<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  const onClose = () => {
    setOpen(false)
  }

  return (
    <Horizontal>
      <Frame>
        <FullVertical>
          <CloseIcon onClick={onClose} />
        </FullVertical>
        <InfoBox>
          <Image width={30} height={30} src={StorageConst.MANTA_LOGO.src} alt={'Select'} />
          <Gap width={2} />
          <FullVertical>
            <Label> Select a character</Label>
          </FullVertical>
        </InfoBox>
        <Gap height={2} />
        <MainBox>
          <CharactersBox>
            <CharacterList />
          </CharactersBox>
        </MainBox>
      </Frame>
    </Horizontal>
  )
}

export default SelectCharacter
