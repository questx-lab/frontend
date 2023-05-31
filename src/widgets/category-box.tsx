import { FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { HorizontalBetweenCenter, Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Large2xlText, PrimaryText } from '@/widgets/text'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'

const Wrap = tw(Vertical)`
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
          <Large2xlText>{title}</Large2xlText>
          <PrimaryText isHover size='lg' onClick={onClick}>
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
        <Large2xlText>{title}</Large2xlText>
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
