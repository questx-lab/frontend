import { FC, useEffect } from 'react'

import tw from 'twin.macro'

import { CloseIcon } from '@/widgets/image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { Gap } from '@/widgets/separator'
import { markShowedInstruction } from '@/utils/helper'

const Frame = tw(Vertical)`
  w-[350px]
  h-[260px]
  bg-white
  rounded
`
const Title = tw.div`
  text-xl
  font-bold
`

const PaddingHorizontal = tw(Horizontal)`
  w-full
  justify-between
  items-center
  p-4
  
`
const Text = tw.div`
  text-base	
  font-normal
  text-gray-700
  text-start
  px-4
`

const KeyboardBox = tw(Horizontal)`
  w-full
  space-x-1
`

const Instruction: FC<{ setOpen: (value: boolean) => void }> = ({ setOpen }) => {
  const onClose = () => {
    setOpen(false)
    markShowedInstruction()
  }

  return (
    <Frame>
      <PaddingHorizontal>
        <Title> Instructions</Title>
        <CloseIcon onClick={onClose} />
      </PaddingHorizontal>
      <Text>To navigate in the game, use the following controls:</Text>
      <Gap height={3} />
      <KeyboardBox>
        <Text className='pr-0'>Use the</Text>
        <Image
          width={25}
          height={25}
          src={StorageConst.KEYBOARD_UP.src}
          alt={StorageConst.KEYBOARD_UP.src}
        />
        <Image
          width={25}
          height={25}
          src={StorageConst.KEYBOARD_DOWN.src}
          alt={StorageConst.KEYBOARD_DOWN.alt}
        />
        <Image
          width={25}
          height={25}
          src={StorageConst.KEYBOARD_LEFT.src}
          alt={StorageConst.KEYBOARD_LEFT.alt}
        />
        <Image
          width={25}
          height={25}
          src={StorageConst.KEYBOARD_RIGHT.src}
          alt={StorageConst.KEYBOARD_RIGHT.alt}
        />
        <Text className='pl-0'> key to move </Text>
      </KeyboardBox>
      <Text>forward, left, backward, right.</Text>
      <Gap height={3} />
      <KeyboardBox>
        <Text className='pr-0'>Use the</Text>
        <Image
          width={25}
          height={25}
          src={StorageConst.KEYBOARD_CLOSE.src}
          alt={StorageConst.KEYBOARD_CLOSE.alt}
        />
        <Text className='pl-0'>key to interact with objects.</Text>
      </KeyboardBox>
      <Gap height={3}></Gap>
      <Text>Enjoy your gaming experience!</Text>
    </Frame>
  )
}

export default Instruction
