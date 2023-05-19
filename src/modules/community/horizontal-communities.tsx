import { FunctionComponent, useEffect, useState } from 'react'

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
  Vertical,
  VerticalCenter,
} from '@/widgets/orientation'
import { NormalText, PrimaryText } from '@/widgets/text'
import {
  ArrowSmallRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

import { listProjectsApi as listCommunities } from '@/app/api/client/project'
import { MoonLoader } from 'react-spinners'
import CommunityBox from './community-box'

const Wrap = tw(Vertical)`
  gap-4
  w-full
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

const CommunityList: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<ProjectType[]>([])

  useEffect(() => {
    fetchCommunityList()
  }, [])

  const fetchCommunityList = async () => {
    setLoading(true)
    try {
      const list = await listCommunities(0, 50)
      setCommunities(list.data!.projects)
    } catch (error) {
      // TODO: show error (not toast) to indicate that the communities cannot be loaded.
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
  }

  const renderCarousel = communities.map((e) => (
    <Card key={e.id}>
      <CommunityBox community={e} />
    </Card>
  ))

  if (!communities.length) {
    return (
      <EmptyBox>
        <Image
          width={300}
          height={300}
          src={StorageConst.CHICKEN.src}
          alt={StorageConst.CHICKEN.alt}
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

const HorizontalCommunities: FunctionComponent<{
  title: string
}> = ({ title }) => {
  return (
    <Wrap>
      <HeaderBox>
        <HeaderText>{title}</HeaderText>
        <PrimaryText isHover size='lg'>
          {'Show all'}
          <ArrowSmallRightIcon className='text-primary w-7 h-7' />
        </PrimaryText>
      </HeaderBox>
      <CommunityList />
    </Wrap>
  )
}

export default HorizontalCommunities
