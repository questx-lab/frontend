import { FunctionComponent } from 'react'

import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import { ArrowProps } from 'react-multi-carousel/lib/types'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { HeaderText } from '@/styles/home.style'
import { ProjectType } from '@/types/project.type'
import {
  HorizontalBetweenCenter,
  VerticalCenter,
  VerticalStart,
} from '@/widgets/orientation'
import { NormalText, PrimaryText } from '@/widgets/text'
import {
  ArrowSmallRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

import CommunityBox from './community-box'

const Wrap = tw(VerticalStart)`
  gap-4
  w-full
  py-8
`

const Card = tw.div`
  mx-2
`

const HeaderBox = tw(HorizontalBetweenCenter)`
  w-full
`

const EmptyBox = tw(VerticalCenter)`
  w-full
`

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1450 },
    items: 5,
  },
  mediumDesktop: {
    breakpoint: { max: 1450, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
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

const CarouselCommunity: FunctionComponent<{
  title: string
  communities: ProjectType[]
}> = ({ title, communities }) => {
  const renderCarousel = communities.map((e) => (
    <Card key={e.id}>
      <CommunityBox project={e} />
    </Card>
  ))

  const Slides: FunctionComponent = () => {
    if (!communities.length) {
      return (
        <EmptyBox>
          <Image
            width={300}
            height={300}
            src={StorageConst.HUSKY.src}
            alt={StorageConst.HUSKY.alt}
          />
          <NormalText>
            {
              "Ohhh! This doesn't have any communities yet. Please follow and come back at a later time."
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

  return (
    <Wrap>
      <HeaderBox>
        <HeaderText>{title}</HeaderText>
        <PrimaryText isHover size='lg'>
          {'Show all'}
          <ArrowSmallRightIcon className='text-primary w-7 h-7' />
        </PrimaryText>
      </HeaderBox>
      <Slides />
    </Wrap>
  )
}

export default CarouselCommunity
