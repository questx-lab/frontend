import { FC, ReactNode, useState } from 'react'

import tw from 'twin.macro'

import { ButtonAdd } from '@/modules/community/settings/chat/content/mini-widget'
import { MemberRole } from '@/types/chat'
import { InputBox } from '@/widgets/form'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { MediumTextSm } from '@/widgets/text'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const Frame = tw(VerticalFullWidth)`
  gap-6
  p-6
`

const GapVertical = tw(VerticalFullWidth)`
  gap-2
`

const RoleBox = tw(HorizontalBetweenCenterFullWidth)`
  p-3
  border
  border-solid
  border-primary
  rounded-lg
  text-sm
  font-normal
  cursor-pointer
`

const RoleOption = tw.div`
  p-3
  text-sm
  font-normal
  cursor-pointer
`

const Element: FC<{ label: string; children: ReactNode }> = ({ label, children }) => {
  return (
    <GapVertical>
      <MediumTextSm>{label}</MediumTextSm>
      {children}
    </GapVertical>
  )
}

const RenderRole: FC<{ onRole: (value: MemberRole) => void; onVisible: () => void }> = ({
  onRole,
  onVisible,
}) => {
  const renderRoles = Object.values(MemberRole).map((role, index) => (
    <RoleOption
      onClick={() => {
        onRole(role)
        onVisible()
      }}
      key={index}
    >
      {role}
    </RoleOption>
  ))

  return <>{renderRoles}</>
}

const AddMember: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [role, setRole] = useState<MemberRole>()
  const [visible, setVisible] = useState<boolean>(false)

  const onModal = (value: boolean) => {
    setIsOpen(value)
  }

  const onRole = (newRole: MemberRole) => {
    setRole(newRole)
  }

  const onVisible = () => {
    setVisible(false)
  }

  return (
    <ButtonAdd
      buttonName='Add Member'
      titleModal='Add new member'
      onModal={onModal}
      isOpenModal={isOpen}
    >
      <Frame>
        <Element label='Profile'>
          <InputBox value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Element>
        <Element label='Profile'>
          <PopPover
            visible={visible}
            button={
              <RoleBox onClick={() => setVisible(true)}>
                {role ?? 'select roles'}
                <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </RoleBox>
            }
            isFull
            styled='!w-full mt-2'
          >
            <RenderRole onRole={onRole} onVisible={onVisible} />
          </PopPover>
        </Element>
      </Frame>
    </ButtonAdd>
  )
}

export default AddMember
