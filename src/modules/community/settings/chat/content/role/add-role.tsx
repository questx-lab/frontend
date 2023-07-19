import { FC, ReactNode, useState } from 'react'

import tw from 'twin.macro'

import { ButtonAdd } from '@/modules/community/settings/chat/content/mini-widget'
import { InputBox } from '@/widgets/form'
import { VerticalFullWidth } from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`
  gap-6
  p-6
`

const GapVertical = tw(VerticalFullWidth)`
  gap-2
`

const Element: FC<{ label: string; children: ReactNode }> = ({ label, children }) => {
  return (
    <GapVertical>
      <MediumTextSm>{label}</MediumTextSm>
      {children}
    </GapVertical>
  )
}

const AddRole: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

  const onModal = (value: boolean) => {
    setIsOpen(value)
  }

  return (
    <ButtonAdd
      buttonName='Add Role'
      titleModal='Add new role'
      onModal={onModal}
      isOpenModal={isOpen}
    >
      <Frame>
        <Element label="Role's name">
          <InputBox value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Element>
      </Frame>
    </ButtonAdd>
  )
}

export default AddRole
