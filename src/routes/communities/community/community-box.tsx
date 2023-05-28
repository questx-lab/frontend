import { FunctionComponent } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { IMAGES_SOURCE } from '@/constants/images'
import { StorageConst } from '@/constants/storage.const'
import { CommunityType } from '@/utils/type'
import { Horizontal, Vertical, VerticalBetween } from '@/widgets/orientation'
import { Image } from '@/widgets/image'
import { useNavigate } from 'react-router-dom'
import { RouterConst } from '@/constants/router.const'

const ContentProjectBox = tw(Vertical)`
  justify-between
`

const ImageProjectBox = styled(Image)(tw`
  rounded-full
  3xl:w-[100px]
  3xl:h-[100px]
  max-md:w-[40px]
  max-md:h-[40px]
`)

const Description = tw.div`
  mt-3
  text-lg
  font-normal
  text-gray-700
  overflow-hidden
  text-ellipsis
  line-clamp-3
  3xl:text-2xl
`

const InfoSection = tw(Horizontal)`
  mt-3 gap-3
`

const Info = tw.div`
  bg-gray-100
  px-2
  py-1
  rounded-lg
  text-sm
  font-normal
  text-gray-700
  3xl:text-xl
  3xl:px-4
  3xl:py-2
`

const Bottom = tw(Horizontal)`
  w-full
  items-center
`

const CommunityBoxWrap = tw(VerticalBetween)`
  cursor-pointer
  p-5
  border
  rounded-lg
  border
  border-solid
  border-gray-300
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
  h-[350px]
  3xl:h-[500px]
  max-md:h-[280px]
  hover:shadow-lg
`

const Top = tw(Vertical)`
  w-full
  h-full
`

const RewardBox = tw(Horizontal)`
  gap-1
  items-center
`

const RewardText = tw.span`
  text-[#FF7B05]
  text-sm
  font-medium
  3xl:text-xl
`

const Title = tw.p`
  mt-3
  text-black
  font-medium
  text-lg
  max-lg:text-lg
  3xl:text-xl
`

const CommunityBox: FunctionComponent<{ community: CommunityType }> = ({ community }) => {
  const navigate = useNavigate()

  return (
    <CommunityBoxWrap onClick={() => navigate(RouterConst.PROJECT + community.id)}>
      <Top>
        <ImageProjectBox
          width={60}
          height={60}
          src={community.logo_url || IMAGES_SOURCE.community_default}
          alt={'avatar'}
        />
        <ContentProjectBox>
          <Title>{community.name!}</Title>
          <InfoSection>
            <Info>{'8 Quests'}</Info>
          </InfoSection>
          <Description>{community.introduction}</Description>
        </ContentProjectBox>
      </Top>
      <Bottom>
        <RewardBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <RewardText>{'300 Gems'}</RewardText>
        </RewardBox>
      </Bottom>
    </CommunityBoxWrap>
  )
}

export default CommunityBox