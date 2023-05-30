import { FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { HeaderText } from '@/styles/home.style'
import { HorizontalBetweenCenter, Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
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
  loading?: boolean
}> = ({ title, children, onClick, loading = false }) => {
  if (loading) {
    return (
      <Wrap>
        <HeaderBox>
          <HeaderText>{title}</HeaderText>
          <PrimaryText size='lg' onClick={onClick}>
            {'Show all'}
            <ArrowSmallRightIcon className='text-primary w-7 h-7' />
          </PrimaryText>
        </HeaderBox>
        <VerticalFullWidthCenter>
          <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
        </VerticalFullWidthCenter>
      </Wrap>
    )
  }

  return (
    <Wrap>
      <HeaderBox>
        <HeaderText>{title}</HeaderText>
        <PrimaryText size='lg' onClick={onClick}>
          {'Show all'}
          <ArrowSmallRightIcon className='text-primary w-7 h-7' />
        </PrimaryText>
      </HeaderBox>
      {children}
    </Wrap>
  )
}

export default CategoryBox
