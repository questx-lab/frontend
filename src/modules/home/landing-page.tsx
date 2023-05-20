import { FunctionComponent } from 'react'

import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { NegativeButton } from '@/widgets/button'
import {
  Horizontal,
  HorizontalBetweenCenter,
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

const Title = tw.span`
  text-7xl
  font-medium
  text-gray-900
`

const Description = tw(LargeText)`
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

const Main = tw(Vertical)`
  w-full
  gap-6
  mt-16
`

const FooterBox = tw(Horizontal)`
  w-full
  pb-3
`

const FooterText = tw.div`
  flex-1
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

const Footer: FunctionComponent = () => {
  return (
    <FooterBox>
      <FooterText>Copyright © 2023 XQuest.</FooterText>
      <Image
        width={30}
        height={30}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
    </FooterBox>
  )
}

const LandingPage: FunctionComponent = () => {
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
            <HorizontalCommunities title={'🔥 Trending Quests'} />
            <HorizontalCommunities title={'⭐ Popular Communities'} />
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
