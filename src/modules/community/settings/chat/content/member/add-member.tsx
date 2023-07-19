import { FC, ReactNode, useState } from 'react'

import tw from 'twin.macro'

import { MemberRole } from '@/types/chat'
import { PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { MediumTextSm } from '@/widgets/text'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

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

  const onCloseModal = () => {
    setIsOpen(false)
  }

  const onRole = (newRole: MemberRole) => {
    setRole(newRole)
  }

  const onVisible = () => {
    setVisible(false)
  }

  return (
    <>
      <EndHorizontal onClick={() => setIsOpen(true)}>
        <PositiveButton>{'Add Member'}</PositiveButton>
      </EndHorizontal>

      <BasicModal title='Add new member' styled='!w-[480px]' isOpen={isOpen} onClose={onCloseModal}>
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
      </BasicModal>
    </>
  )
}

export default AddMember
