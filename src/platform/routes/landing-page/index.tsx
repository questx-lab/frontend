import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import AccordionBox from '@/platform/routes/landing-page/accodion'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  VerticalCenter,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Button, IconButton } from '@material-tailwind/react'

const Wrap = tw(VerticalCenter)`
  relative
  bg-gradient-to-b from-[#4A33DD] to-[#A633DD]
  w-full
`

const Frame = tw(VerticalFullWidthCenter)`
  pt-[64px]
  h-full
  z-10
`

const Header = tw(VerticalCenter)`
  w-full
  gap-[120px]
`

const Bg = styled(Image)(tw`
  w-full
  h-full
  object-contain
  overflow-y-hidden
  absolute
`)

const Gap9Vertical = tw(VerticalFullWidthCenter)`
  gap-8
`

const Gap2Vertical = tw(VerticalFullWidthCenter)`
  gap-0
`

const Text216 = tw.div`
  select-none
  text-216
  text-white
  font-rubik
  drop-shadow-[8px 8px 0px #000]
  animate-blueToGreen
  max-sm:text-54
  sm:text-109
  lg:text-163
  xl:text-216
`

const Text400 = tw.div`
  select-none
  text-400
  text-white
  font-rubik
  drop-shadow-[8px 8px 0px #000]
  animate-greenToRed
  max-sm:text-100
  sm:text-200
  lg:text-300
  xl:text-400
`
const Text218 = tw.div`
  select-none
  text-218
  text-white
  font-rubik
  drop-shadow-[8px 8px 0px #000]
  animate-orangeToYellow
  max-sm:text-54
  sm:text-109
  sm:text-109
  lg:text-163
  xl:text-216
`

const FooterBox = tw(HorizontalBetweenCenterFullWidth)`
  w-full
  px-6
  py-2
`

const FooterText = tw.span`
  text-xs
  font-normal
  text-white
`

const SocialBox = tw(HorizontalCenter)`
  gap-1
`

const IconBtn = tw(
  IconButton
)`!bg-transparent !shadow-none hover:!shadow-none hover:!bg-white-rgb10`

const Footer: FC = () => {
  return (
    <FooterBox>
      <FooterText>{'© 2023 XQuest.'}</FooterText>
      <SocialBox>
        <Link to={'https://twitter.com/xquestxyz'} target='_blank'>
          <IconBtn>
            <Image
              width={25}
              height={25}
              src={StorageConst.TWITTER_WHITE_DIR.src}
              alt={StorageConst.TWITTER_WHITE_DIR.alt}
            />
          </IconBtn>
        </Link>

        <Link to={'https://discord.com/invite/YXZmVaBsPe'} target='_blank'>
          <IconBtn>
            <Image
              width={25}
              height={25}
              src={StorageConst.DISCORD_WHITE_DIR.src}
              alt={StorageConst.DISCORD_WHITE_DIR.alt}
            />
          </IconBtn>
        </Link>
      </SocialBox>
    </FooterBox>
  )
}

const Content: FC = () => {
  // hook
  const navigate = useNavigate()

  return (
    <Wrap>
      <Bg className='animate-slideBg' src={StorageConst.BACKGROUND.src} alt={'background'} />
      <Frame>
        <Header>
          <Gap9Vertical>
            <Gap2Vertical>
              <Text216 className='font-outline-4'>{'X a QUEST'}</Text216>
              <Text400 className='font-outline-4'>{'EARN'}</Text400>
              <Text218 className='font-outline-4'>{'REWARDS'}</Text218>
            </Gap2Vertical>
            <Image width={96} height={96} src={StorageConst.ARROW.src} alt='' />
            <Button
              onClick={() => {
                navigate(RouterConst.COMMUNITIES)
              }}
              className='text-xl'
            >
              {'START EARNING'}
            </Button>
          </Gap9Vertical>
          <AccordionBox />
        </Header>
        <Footer />
      </Frame>
    </Wrap>
  )
}

const LandingPage: FC = () => {
  return <Content />
}

export default LandingPage
