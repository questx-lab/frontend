import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getTrendingCommunities } from '@/app/api/client/communitiy'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import CommunityBox from '@/routes/communities/community/community-box'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType } from '@/utils/type'
import { NegativeButton } from '@/widgets/button'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenter,
  HorizontalCenter,
  Vertical,
  VerticalCenter,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { LargeText, NormalText } from '@/widgets/text'

const Wrap = tw(Vertical)`
  min-h-screen
`

const Head = tw.div`
  relative
  bg-white
  w-full
  min-h-screen
`

const HeadWrap = tw(VerticalFullWidthCenter)`
  absolute
  w-full
  gap-6
  h-full
`

const HeadBody = tw(Vertical)`
  max-sm:px-2
  md:px-8
  w-full
  xl:w-[1180px]
  h-full
`

const HeadBox = tw(HorizontalBetweenCenter)`
  w-full
  max-md:pt-[70px]
  max-md:flex-col-reverse
`

const Bg = styled(Image)(tw`
  w-full
`)

const InfoBox = tw(VerticalCenter)`
  h-full
  items-start
  w-2/5
  gap-4
  max-md:w-full
  3xl:gap-8
  max-md:items-center
`

const Title = tw.span`
  text-8xl
  font-medium
  text-gray-900
  max-md:text-4xl
`

const Description = tw(LargeText)`
  text-gray-700
  font-normal
  3xl:text-3xl
  max-md:text-center
`

const RewardSession = tw(HorizontalBetweenCenter)`
  gap-6
  max-md:flex-col
`

const RewardTextText = tw(NormalText)`
  text-gray-500
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
  3xl:rounded-2xl
`

const Main = tw(Vertical)`
  w-full
  gap-6
  mt-16
`

const FooterBox = tw(HorizontalBetweenCenter)`
  w-full
  py-8
`

const FooterText = tw.span`
  text-lg
  font-normal
  text-gray-500
  3xl:text-2xl
`

const SocialBox = tw(HorizontalCenter)`
  gap-2
`

const SocialLogin = styled(Image)(tw`
  3xl:w-[40px]
  3xl:h-[40px]
`)

type RewardDataType = {
  name: string
  des: string
  image: string
}

enum RewardBoxEnum {
  JOIN_COMMUNITY,
  X_A_QUEST,
  EARN_REWARD,
}

const RewardMapData = new Map<RewardBoxEnum, RewardDataType>([
  [
    RewardBoxEnum.JOIN_COMMUNITY,
    {
      name: 'Join a Community',
      des: 'Join a vibrant community, connect with like-minded individuals, and unlock endless possibilities for collaboration and growth.',
      image: StorageConst.JOIN_COMMUNITY.src,
    },
  ],
  [
    RewardBoxEnum.X_A_QUEST,
    {
      name: 'X a Quest',
      des: 'Take on the challenge, push your limits, and triumph over obstacles. Dare to X a Quest and achieve greatness!',
      image: StorageConst.X_A_QUEST.src,
    },
  ],
  [
    RewardBoxEnum.EARN_REWARD,
    {
      name: 'Earn Reward',
      des: 'Unlock exciting incentives and reap the rewards of your accomplishments. Embrace the journey and earn your well-deserved recognition. Claim your rewards now!',
      image: StorageConst.EARN_REWARD.src,
    },
  ],
])

const RewardView: FunctionComponent<{
  name: string
  imgSrc: string
  des: string
}> = ({ name, imgSrc, des }) => {
  return (
    <RewardBox>
      <Image width={600} height={600} src={imgSrc} alt={'logo'} />
      <LargeText>{name}</LargeText>
      <RewardTextText>{des}</RewardTextText>
    </RewardBox>
  )
}

const Footer: FunctionComponent = () => {
  return (
    <FooterBox>
      <FooterText>{'Copyright © 2023 XQuest.'}</FooterText>
      <SocialBox>
        <SocialLogin
          width={25}
          height={25}
          src={StorageConst.TWITTER_BLACK_DIR.src}
          alt={StorageConst.TWITTER_BLACK_DIR.alt}
        />
        <SocialLogin
          width={25}
          height={25}
          src={StorageConst.DISCORD_BLACK_DIR.src}
          alt={StorageConst.DISCORD_BLACK_DIR.alt}
        />
      </SocialBox>
    </FooterBox>
  )
}

const Content: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const navigate = useNavigate()
  // global data
  const communitiesTrending: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesTrending
  )

  // global action
  const setCommunitiesTrending = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesTrending
  )

  useEffect(() => {
    if (communitiesTrending && communitiesTrending.length === 0) {
      fetchTrending()
    }
  }, [])

  const fetchTrending = async () => {
    const result = await getTrendingCommunities()
    if (result.code === 0 && result.data) {
      setCommunities(result.data.communities)
      setCommunitiesTrending(result.data.communities)
    }

    setLoading(false)
  }

  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES)
  }

  return (
    <Wrap>
      <Head>
        <HeadWrap>
          <HeadBody>
            <HeadBox>
              <InfoBox>
                <Title>{'X a Quests,'}</Title>
                <Title>{'Earn Rewards'}</Title>
                <Description>
                  {
                    'XQuest is the best way to help community projects while earning incredible rewards.'
                  }
                </Description>
                <NegativeButton
                  onClick={() => {
                    // TODO: router.push(RouterConst.COMMUNITIES)}
                  }}
                >
                  {'Explore'}
                </NegativeButton>
              </InfoBox>
              <Image width={680} height={680} src={'/images/logos/cat.svg'} alt={'background'} />
            </HeadBox>
            <RewardSession>
              <RewardView
                name={RewardMapData.get(RewardBoxEnum.JOIN_COMMUNITY)?.name ?? ''}
                des={RewardMapData.get(RewardBoxEnum.JOIN_COMMUNITY)?.des ?? ''}
                imgSrc={RewardMapData.get(RewardBoxEnum.JOIN_COMMUNITY)?.image ?? ''}
              />
              <RewardView
                name={RewardMapData.get(RewardBoxEnum.X_A_QUEST)?.name ?? ''}
                des={RewardMapData.get(RewardBoxEnum.X_A_QUEST)?.des ?? ''}
                imgSrc={RewardMapData.get(RewardBoxEnum.X_A_QUEST)?.image ?? ''}
              />
              <RewardView
                name={RewardMapData.get(RewardBoxEnum.EARN_REWARD)?.name ?? ''}
                des={RewardMapData.get(RewardBoxEnum.EARN_REWARD)?.des ?? ''}
                imgSrc={RewardMapData.get(RewardBoxEnum.EARN_REWARD)?.image ?? ''}
              />
            </RewardSession>
            <Main>
              <CategoryBox
                title='🔥 Trending Communities'
                onClick={onShowAllClicked}
                loading={loading}
              >
                <CarouselList
                  data={communities}
                  renderItemFunc={(community: CommunityType) => {
                    return <CommunityBox community={community} />
                  }}
                />
              </CategoryBox>
              <CategoryBox
                title='⭐ Popular Communities'
                onClick={onShowAllClicked}
                loading={loading}
              >
                <CarouselList
                  data={communities}
                  renderItemFunc={(community: CommunityType) => {
                    return <CommunityBox community={community} />
                  }}
                />
              </CategoryBox>
            </Main>
            <Footer />
          </HeadBody>
        </HeadWrap>
        <Bg width={1600} height={1200} src={StorageConst.BACKGROUND.src} alt={'background'} />
      </Head>
    </Wrap>
  )
}

const LandingPage: FunctionComponent = () => {
  return <Content />
}

export default LandingPage
