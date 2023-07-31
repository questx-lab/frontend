import { FC, ReactNode } from 'react'

import Carousel from 'react-multi-carousel'
import { ArrowProps } from 'react-multi-carousel/lib/types'
import styled from 'styled-components'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { VerticalCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Card = tw.div`
  mr-4
`

const EmptyBox = tw(VerticalCenter)`
  w-full
`

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1921 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1440 },
    items: 3,
  },
  mediumDesktop: {
    breakpoint: { max: 1439, min: 1025 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1025, min: 769 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
}

const ArrowBtn = styled.button<{ isLeft?: boolean }>(({ isLeft = false }) => [
  tw`
    hover:border-gray-300
    bg-white border
    border-gray-200
    p-2
    border-solid
    rounded-full
    w-10
    h-10
    absolute
    right-0
    text-gray-700
    shadow-lg
  `,
  isLeft && tw`left-0`,
])

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <ArrowBtn onClick={onClick}>
      <ChevronRightIcon className='w-5 h-5 text-gray-700 hover:text-gray-900' />
    </ArrowBtn>
  )
}

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <ArrowBtn onClick={onClick} isLeft>
      <ChevronLeftIcon className='w-5 h-5 text-gray-700 hover:text-gray-900' />
    </ArrowBtn>
  )
}

const CarouselList: FC<{
  data: any[]
  renderItemFunc: (item: any, index?: number) => ReactNode
}> = ({ data, renderItemFunc }) => {
  const renderCarousel = data.map((item, index) => (
    <Card key={index}>{renderItemFunc(item, index)}</Card>
  ))

  if (!data.length) {
    return (
      <EmptyBox>
        <Image
          width={300}
          height={300}
          src={StorageConst.CHICKEN.src}
          alt={StorageConst.CHICKEN.alt}
        />
        <NormalText className='text-center'>
          {"Ohhh! This doesn't have any data yet. Please come back at a later time."}
        </NormalText>
      </EmptyBox>
    )
  }

  return (
    <Carousel
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      className='w-full h-full'
      responsive={responsive}
    >
      {renderCarousel}
    </Carousel>
  )
}

export default CarouselList
