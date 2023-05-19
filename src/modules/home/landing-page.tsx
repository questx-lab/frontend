import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listProjectsApi } from '@/app/api/client/project'
import { StorageConst } from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { FullScreen } from '@/styles/common.style'
import { NegativeButton } from '@/widgets/button'
import {
  HorizontalBetweenCenter,
  Vertical,
  VerticalCenter,
  VerticalStart,
} from '@/widgets/orientation'
import { LargeText } from '@/widgets/text'

import CarouselCommunity from '../community/carousel'

const Wrap = tw(Vertical)`
  min-h-screen
`

const Head = tw.div`
  relative
  bg-white
  w-full
  min-h-screen
`

const HeadWrap = tw(VerticalStart)`
  absolute
  w-full
  gap-6
  h-full
  px-48
  max-2xl:px-32
`

const HeadBox = tw(HorizontalBetweenCenter)`
  w-full
`

const Bg = styled(Image)(tw`
  w-full
`)

const InfoBox = tw(VerticalCenter)`
  h-full
  items-start
  w-2/5
  gap-4
`

const TitleText = tw.span`
  text-7xl
  font-medium
  text-gray-900
`

const DescriptionText = tw(LargeText)`
  text-gray-700
  font-normal
`

const RewardSession = tw(HorizontalBetweenCenter)`
  gap-6
`

const RewardTextText = tw(LargeText)`
  text-gray-500
  font-normal
  text-center
`

const RewardBox = tw(VerticalCenter)`
  w-full
  bg-white
  rounded-lg
  p-6
  h-full
  gap-4
  shadow-lg
`

const Main = tw(VerticalStart)`
  w-full
  gap-6
  mt-16
`

const RewardView: FunctionComponent<{
  name: string
  imgSrc: string
  des: string
}> = ({ name, imgSrc, des }) => {
  return (
    <RewardBox>
      <Image width={300} height={300} src={imgSrc} alt={'logo'} />
      <LargeText>{name}</LargeText>
      <RewardTextText>{des}</RewardTextText>
    </RewardBox>
  )
}

const LandingPage: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchListProjects()
  }, [])

  // data
  const projectsTrending = useStoreState<GlobalStoreModel>(
    (state) => state.projectsTrending
  )

  // action
  const setProjectsTrending = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsTrending
  )

  const fetchListProjects = async () => {
    setLoading(true)
    try {
      const list = await listProjectsApi(0, 50)
      setProjectsTrending(list.data!.projects)
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <FullScreen>
        <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
      </FullScreen>
    )
  }

  return (
    <Wrap>
      <Head>
        <HeadWrap>
          <HeadBox>
            <InfoBox>
              <TitleText>{'X a Quests,'}</TitleText>
              <TitleText>{'Earn Rewards'}</TitleText>
              <DescriptionText>
                {
                  'XQuest is the best way to help community projects while earning incredible rewards.'
                }
              </DescriptionText>
              <NegativeButton>{'Explore'}</NegativeButton>
            </InfoBox>
            <Image
              width={680}
              height={680}
              src={'/images/logos/cat.svg'}
              alt={'background'}
            />
          </HeadBox>
          <RewardSession>
            <RewardView
              name='Join a Community'
              des='Join a vibrant community, connect with like-minded individuals, and unlock endless possibilities for collaboration and growth.'
              imgSrc={StorageConst.JOIN_COMMUNITY.src}
            />
            <RewardView
              name='X a Quest'
              des='Take on the challenge, push your limits, and triumph over obstacles. Dare to X a Quest and achieve greatness!'
              imgSrc={StorageConst.X_A_QUEST.src}
            />
            <RewardView
              name='Earn Reward'
              des='Unlock exciting incentives and reap the rewards of your accomplishments. Embrace the journey and earn your well-deserved recognition. Claim your rewards now!'
              imgSrc={StorageConst.EARN_REWARD.src}
            />
          </RewardSession>
          <Main>
            <CarouselCommunity
              title={'🔥 Trending Quests'}
              communities={projectsTrending}
            />
            <CarouselCommunity
              title={'⭐ Popular Communities'}
              communities={projectsTrending}
            />
          </Main>
        </HeadWrap>
        <Bg
          width={200}
          height={200}
          src={StorageConst.BACKGROUND.src}
          alt={'background'}
        />
      </Head>
    </Wrap>
  )
}

export default LandingPage
