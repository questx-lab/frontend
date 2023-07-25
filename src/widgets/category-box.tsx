import { FC, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { HorizontalBetweenCenter, Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { PrimaryText, TextXl } from '@/widgets/text'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'

const FullWidth = tw(Vertical)`
  w-full
  gap-5
`

const HeaderBox = tw(HorizontalBetweenCenter)`
  w-full
`

const Header: FC<{ title: string; show: boolean; onClick: () => void }> = ({
  title,
  show,
  onClick,
}) => {
  if (!show) {
    return (
      <HeaderBox>
        <TextXl>{title}</TextXl>
      </HeaderBox>
    )
  }

  return (
    <HeaderBox>
      <TextXl>{title}</TextXl>
      <PrimaryText isHover size='sm' onClick={onClick} className='gap-0 font-medium'>
        {'Show all'}
        <ArrowSmallRightIcon className='text-primary w-5 h-5' />
      </PrimaryText>
    </HeaderBox>
  )
}

const CategoryBox: FC<{
  title: string
  children: ReactNode
  onClick: () => void
  loading?: boolean
  hasShowAll?: boolean
}> = ({ title, children, onClick, loading = false, hasShowAll = true }) => {
  if (loading) {
    return (
      <FullWidth>
        <Header title={title} onClick={onClick} show={hasShowAll} />
        <VerticalFullWidthCenter>
          <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
        </VerticalFullWidthCenter>
      </FullWidth>
    )
  }

  return (
    <FullWidth>
      <Header title={title} onClick={onClick} show={hasShowAll} />
      {children}
    </FullWidth>
  )
}

export default CategoryBox
