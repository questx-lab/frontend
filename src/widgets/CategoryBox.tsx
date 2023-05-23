import { FunctionComponent, ReactNode } from 'react'

import tw from 'twin.macro'

import { HeaderText } from '@/styles/home.style'
import { HorizontalBetweenCenter, Vertical } from '@/widgets/orientation'
import { PrimaryText } from '@/widgets/text'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'

const Wrap = tw(Vertical)`
  gap-4
  w-full
`

const HeaderBox = tw(HorizontalBetweenCenter)`
  w-full
`

const CategoryBox: FunctionComponent<{
  title: string
  children: ReactNode
  onClick: () => void
}> = ({ title, children, onClick }) => {
  return (
    <Wrap>
      <HeaderBox>
        <HeaderText>{title}</HeaderText>
        <PrimaryText isHover size='lg' onClick={onClick}>
          {'Show all'}
          <ArrowSmallRightIcon className='text-primary w-7 h-7' />
        </PrimaryText>
      </HeaderBox>
      {children}
    </Wrap>
  )
}

export default CategoryBox
