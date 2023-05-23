import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Carousel from 'react-multi-carousel'
import { ArrowProps } from 'react-multi-carousel/lib/types'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/community'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { HeaderText } from '@/styles/home.style'
import { CommunityType } from '@/utils/type'
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

const CommunityList: FunctionComponent<{ byTrending: boolean }> = ({
  byTrending,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  useEffect(() => {
    fetchCommunityList()
  }, [])

  const fetchCommunityList = async () => {
    setLoading(true)
    try {
      const list = await listCommunitiesApi(0, 50, '', byTrending)
      setCommunities(list.data!.communities)
    } catch (error) {
      // TODO: show error (not toast) to indicate that the communities cannot be loaded.
    } finally {
      setLoading(false)
    }
  }

  if (!communities) {
    return <></>
  }

  if (loading) {
    return <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
  }

  if (!communities) {
    return <></>
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
  byTrending: boolean
}> = ({ title, byTrending }) => {
  const router = useRouter()

  const onShowAllClicked = () => {
    router.push(RouterConst.COMMUNITIES)
  }

  return (
    <Wrap>
      <HeaderBox>
        <HeaderText>{title}</HeaderText>
        <PrimaryText isHover size='lg' onClick={onShowAllClicked}>
          {'Show all'}
          <ArrowSmallRightIcon className='text-primary w-7 h-7' />
        </PrimaryText>
      </HeaderBox>
      <CommunityList byTrending />
    </Wrap>
  )
}

export default HorizontalCommunities
