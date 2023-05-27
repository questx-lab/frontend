import { FunctionComponent, ReactNode } from 'react'

import Carousel from 'react-multi-carousel'
import { ArrowProps } from 'react-multi-carousel/lib/types'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { VerticalCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Card = tw.div`
  mx-2
`

const EmptyBox = tw(VerticalCenter)`
  w-full
`

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1921 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1441 },
    items: 4,
  },
  mediumDesktop: {
    breakpoint: { max: 1440, min: 1025 },
    items: 4,
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
    hover:bg-gray-100
    bg-white border
    border-gray-500
    p-2
    border-solid
    rounded-full
    w-10
    h-10
    absolute
    right-0
    text-gray-500
  `,
  isLeft && tw`left-0`,
])

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <ArrowBtn onClick={onClick}>
      <ChevronRightIcon />
    </ArrowBtn>
  )
}

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <ArrowBtn onClick={onClick} isLeft>
      <ChevronLeftIcon />
    </ArrowBtn>
  )
}

const CarouselList: FunctionComponent<{
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
          {
            "Ohhh! This doesn't have any data yet. Please follow and come back at a later time."
          }
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
