import { FC, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenter,
  HorizontalCenter,
  VerticalCenter,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { TextBase, TextXl } from '@/widgets/text'
import { Button, IconButton } from '@material-tailwind/react'

const Wrap = tw(VerticalCenter)`
  relative
  h-screen
  bg-gradient-to-r from-[#020617] to-[#1E293B]
`

const Frame = tw(VerticalFullWidthCenter)`
  pb-12
  px-12
  absolute
  w-[1264px]
  h-full
  overflow-y-scroll
`

const Header = tw(VerticalCenter)`
  py-[192px]
  w-full
`

const Bg = styled(Image)(tw`
  w-full
  h-full
  
`)

const Gap9Vertical = tw(VerticalFullWidthCenter)`
  gap-9
`

const Gap2Vertical = tw(VerticalFullWidthCenter)`
  gap-2
`

const Title = tw.div`
  text-8xl
  font-medium
  text-white
  max-md:text-4xl
`

const Description = tw.div`
  text-4xl
  text-white
  font-normal
  max-md:text-center
`

const RewardSession = tw(HorizontalBetweenCenter)`
  gap-6
  max-md:flex-col
`

const WhiteTextBase = tw(TextBase)`
  text-white
  text-center
`

const RewardBox = tw(VerticalCenter)`
  w-full
  bg-white-rgb5
  rounded-lg
  p-12
  h-full
  shadow-lg
`

const FooterBox = tw(VerticalCenter)`
  w-full
  gap-4
  py-6
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

const WhiteTextXl = tw(TextXl)`text-white`

const IconBtn = tw(IconButton)`!bg-white-rgb5 shadow-none`

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
      des: 'Claim rewards, embrace the journey, earn recognition, and enjoy exciting incentives for your accomplishments.!',
      image: StorageConst.EARN_REWARD.src,
    },
  ],
])

const RewardView: FC<{
  name: string
  des: string
}> = ({ name, des }) => {
  return (
    <RewardBox>
      <WhiteTextXl>{name}</WhiteTextXl>
      <WhiteTextBase>{des}</WhiteTextBase>
    </RewardBox>
  )
}

const Footer: FC = () => {
  return (
    <FooterBox>
      <FooterText>{'Copyright © 2023 XQuest.'}</FooterText>
      <SocialBox>
        <IconBtn variant='text'>
          <SocialLogin
            width={25}
            height={25}
            src={StorageConst.TWITTER_BLACK_DIR.src}
            alt={StorageConst.TWITTER_BLACK_DIR.alt}
          />
        </IconBtn>
        <IconBtn variant='text'>
          <SocialLogin
            width={25}
            height={25}
            src={StorageConst.DISCORD_BLACK_DIR.src}
            alt={StorageConst.DISCORD_BLACK_DIR.alt}
          />
        </IconBtn>
      </SocialBox>
    </FooterBox>
  )
}

const Content: FC = () => {
  // hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // handler
  const onShowAllClicked = () => {
    navigate(RouterConst.COMMUNITIES_TRENDING)
  }

  const fetchListCommunities = useCallback(async (q: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, q, true)
      if (result.code === 0 && result.data?.communities) {
        setCommunities(result.data.communities)
      }
    } catch (error) {
      toast.error('Error while fetching projects')
    } finally {
      setLoading(false)
    }
  }, [])

  // first fetch
  useEffect(() => {
    fetchListCommunities('')
  }, [])

  return (
    <Wrap>
      <Bg src={StorageConst.BACKGROUND.src} alt={'background'} />
      <Frame>
        <Header>
          <Gap9Vertical>
            <Gap2Vertical>
              <Title>{'X a Quests,'}</Title>
              <Title>{'Earn Rewards'}</Title>
              <VerticalFullWidthCenter>
                <Description>{`XQuest is the best way to help community projects`}</Description>
                <Description>{`while earning incredible rewards.`}</Description>
              </VerticalFullWidthCenter>
            </Gap2Vertical>
            <Button
              onClick={() => {
                navigate(RouterConst.COMMUNITIES)
              }}
            >
              {'EXPLORE ALL COMMUNITIES'}
            </Button>
          </Gap9Vertical>
        </Header>
        <RewardSession>
          <RewardView
            name={RewardMapData.get(RewardBoxEnum.JOIN_COMMUNITY)?.name ?? ''}
            des={RewardMapData.get(RewardBoxEnum.JOIN_COMMUNITY)?.des ?? ''}
          />
          <RewardView
            name={RewardMapData.get(RewardBoxEnum.X_A_QUEST)?.name ?? ''}
            des={RewardMapData.get(RewardBoxEnum.X_A_QUEST)?.des ?? ''}
          />
          <RewardView
            name={RewardMapData.get(RewardBoxEnum.EARN_REWARD)?.name ?? ''}
            des={RewardMapData.get(RewardBoxEnum.EARN_REWARD)?.des ?? ''}
          />
        </RewardSession>
        <Footer />
      </Frame>
    </Wrap>
  )
}

const LandingPage: FC = () => {
  return <Content />
}

export default LandingPage
