import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import phaserGame from '@/townhall/engine/services/game-controller'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { Vertical, VerticalFullWidth, Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Label } from '@/widgets/text'
import { Gap } from '@/widgets/separator'
import MyInfoSelector from '@/townhall/modules/selector/my-info'
import { getCharactersApi } from '@/api/townhall'
import toast from 'react-hot-toast'
import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { CharacterType } from '@/types'
import BaseModal from '@/widgets/modal/base'
import RoomStore from '@/store/townhall/room'
import SelectedCharacter from '@/townhall/modules/selector/selected-character'

const Frame = tw(Vertical)`
  w-[450px]
  h-[800px]
  bg-white
  pb-6
  rounded
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
`

const CharacterBox = tw.div`
  flex
  justify-center
  border-2
  rounded
  bg-[#f3f4f6]
`

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const CharacterLabel = tw(Label)`
  text-xl
  uppercase
`

type CharacterGroup = {
  name: string
  characters: CharacterType[]
}
const CharacterList: FC = () => {
  const setSelectedCharacter = RoomStore.useStoreActions((action) => action.setSelectedCharacter)
  const [characterGroups, setCharacterGroups] = useState<CharacterGroup[]>([])

  const fetchCharacters = async () => {
    const data = await getCharactersApi()
    if (data.code === 0 && data.data) {
      let groups = new Map<string, CharacterType[]>()
      data.data.game_characters.forEach((character) => {
        const cur = groups.get(character.name)
        if (cur) groups.set(character.name, [...cur, character])
        else groups.set(character.name, [character])
      })
      let characterList: CharacterGroup[] = []
      groups.forEach((val, key) => {
        const sortedList = val.sort((a, b) => {
          return a.level - b.level
        })
        characterList.push({
          name: key,
          characters: sortedList,
        })
      })
      characterList = characterList.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      setCharacterGroups(characterList)
    }
    if (data.error) {
      toast.error(data.error)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [])

  const onSelectedCharacter = (character: CharacterType) => {
    setSelectedCharacter(character)
  }

  return (
    <div>
      {characterGroups.map((group) => (
        <div>
          <Gap height={4} />
          <CharacterLabel> {group.name}</CharacterLabel>
          <Gap height={4} />
          <CharacterListBox>
            {group.characters.map((character) => (
              <CharacterBox onClick={() => onSelectedCharacter(character)}>
                <Image
                  width={80}
                  height={80}
                  src={character.thumbnail_url || StorageConst.USER_DEFAULT.src}
                  alt={'Character'}
                />
              </CharacterBox>
            ))}
          </CharacterListBox>
        </div>
      ))}
    </div>
  )
}

const MarketSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  const selectedCharacter = RoomStore.useStoreState((state) => state.selectedCharacter)
  const setSelectedCharacter = RoomStore.useStoreActions((action) => action.setSelectedCharacter)

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
            <Label className='text-base'> Exchange Center</Label>
          </FullVertical>
        </InfoBox>
        <Gap height={2} />
        <MainBox>
          <CharactersBox>
            <CharacterList />
          </CharactersBox>
        </MainBox>
      </Frame>
      <Gap width={5} />
      <MyInfoSelector playerSelector={playerSelector} />
      <BaseModal isOpen={selectedCharacter !== undefined}>
        <ModalBox>
          <SelectedCharacter onClose={() => setSelectedCharacter(undefined)} />
        </ModalBox>
      </BaseModal>
    </Horizontal>
  )
}

export default MarketSelector
