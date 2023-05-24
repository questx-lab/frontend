import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/community'
import { RouterConst } from '@/constants/router.const'
import { RewardsData, StorageConst } from '@/constants/storage.const'
import CommunityBox from '@/modules/community/community-box'
import { CommunityType } from '@/utils/type'
import { NegativeButton } from '@/widgets/button'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/CategoryBox'
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

const LandingPage: FunctionComponent = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  useEffect(() => {
    fetchCommunityList()
  }, [])

  const fetchCommunityList = async () => {
    setLoading(true)
    try {
      const list = await listCommunitiesApi(0, 50, '', true)
      setCommunities(list.data!.communities)
    } catch (error) {
      // TODO: show error (not toast) to indicate that the communities cannot be loaded.
    } finally {
      setLoading(false)
    }
  }

  const onShowAllClicked = () => {
    router.push(RouterConst.COMMUNITIES)
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
                  onClick={() => router.push(RouterConst.COMMUNITIES)}
                >
                  {'Explore'}
                </NegativeButton>
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
                name={RewardsData[0].name}
                des={RewardsData[0].des}
                imgSrc={RewardsData[0].image}
              />
              <RewardView
                name={RewardsData[1].name}
                des={RewardsData[1].des}
                imgSrc={RewardsData[1].image}
              />
              <RewardView
                name={RewardsData[2].name}
                des={RewardsData[2].des}
                imgSrc={RewardsData[2].image}
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
        <Bg
          width={1600}
          height={1200}
          src={StorageConst.BACKGROUND.src}
          alt={'background'}
        />
      </Head>
    </Wrap>
  )
}

export default LandingPage
