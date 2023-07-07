import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { buyCharacterApi, getCharactersApi } from '@/api/townhall'
import RoomStore from '@/store/townhall/room'
import { CharacterType } from '@/types'
import { PositiveButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'

const Frame = tw(Vertical)`
  w-[480px]
  h-[462px]
  bg-white
  rounded
`

const Title = tw.div`
  p-4
  text-xl
  font-bold
`

const Description = tw.div`
  p-4
  px-4
  pt-0
  text-sm
  text-start
`

const CharacterBox = tw.div`
  flex
  justify-around
  w-full
`

const Character = tw.div`
  w-[210px]
  h-[210px]
  border-2
  rounded
`

const ButtonBox = tw.div`
  px-4
  pt-6
  pb-4
  w-full
`

const BackButton = tw.button`
  bg-white
  text-primary
  font-bold
  text-sm
  w-full
`
const SelectCharacter: FC<{
  setOpen: (value: boolean) => void
  onCharacterSelected: () => void
}> = ({ setOpen, onCharacterSelected }) => {
  const community = RoomStore.useStoreState((state) => state.community)

  const [selectedCharacter, setSelectedCharacter] = useState<Partial<CharacterType>>()

  const [characterList, setCharacterList] = useState<CharacterType[]>([])

  const fetchCharacters = async () => {
    const data = await getCharactersApi()
    if (data.code === 0 && data.data) {
      const characters = data.data?.game_characters.filter((character) => character.level === 0)
      setCharacterList(characters.slice(0, 2))
    }
    if (data.error) {
      toast.error(data.error)
    }
  }

  const onChangeCharacter = (character: CharacterType) => {
    setSelectedCharacter(character)
  }

  const onSelectedCharacter = async () => {
    const resp = await buyCharacterApi(community.handle, selectedCharacter?.id || '')
    if (resp.code === 0 && resp.data) {
      toast.success('Select character successful')
      setOpen(false)

      onCharacterSelected()
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <Frame>
      <Title> Welcome to Townhall </Title>
      <Description>
        Welcome to Townhall, please select a character to begin your journey of exploring the world.
      </Description>
      <CharacterBox>
        {characterList.map((character, index) => (
          <Character
            key={index}
            onClick={() => onChangeCharacter(character)}
            className={character.id === selectedCharacter?.id ? 'border-primary-500' : ''}
          >
            <Image width={210} height={210} src={character.thumbnail_url} alt={'Character'} />
          </Character>
        ))}
      </CharacterBox>
      <ButtonBox>
        <PositiveButton
          isFull
          block={!!!selectedCharacter}
          onClick={onSelectedCharacter}
          requireLogin
        >
          {'Join Towhall'}
        </PositiveButton>
      </ButtonBox>
      <ButtonBox className='pt-2'>
        <BackButton>Back to Community</BackButton>
      </ButtonBox>
    </Frame>
  )
}

export default SelectCharacter
