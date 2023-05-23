import { FunctionComponent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { NegativeButton } from '@/widgets/button'
import {
  HorizontalBetweenCenter,
  HorizontalCenter,
  Vertical,
  VerticalCenter,
} from '@/widgets/orientation'
import { LargeText } from '@/widgets/text'

import HorizontalCommunities from '../community/horizontal-communities'

const Wrap = tw(Vertical)`
  min-h-screen
`

const Head = tw.div`
  relative
  bg-white
  w-full
  min-h-screen
`

const HeadWrap = tw(Vertical)`
  absolute
  w-full
  gap-6
  h-full
  max-md:px-8
  md:px-16
  lg:px-32
  2xl:px-48
  3xl:px-64
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
  text-7xl
  font-medium
  text-gray-900
  3xl:text-12xl
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

const RewardTextText = tw(LargeText)`
  text-gray-500
  font-normal
  text-center
  3xl:text-3xl
`

const RewardBox = tw(VerticalCenter)`
  w-full
  bg-white
  rounded-lg
  p-6
  h-full
  gap-4
  shadow-lg
  3xl:p-16
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

const MainImage = styled(Image)(tw`
  3xl:w-[1000px]
  3xl:h-[1000px]
  max-md:w-full
  max-md:h-full
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

  return (
    <Wrap>
      <Head>
        <HeadWrap>
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
            <MainImage
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
            <HorizontalCommunities
              title={'🔥 Trending Communities'}
              byTrending={true}
            />
            <HorizontalCommunities
              title={'⭐ Popular Communities'}
              byTrending={false}
            />
          </Main>
          <Footer />
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
