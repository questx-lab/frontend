import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { Horizontal, Vertical, VerticalBetween } from '@/widgets/orientation'

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
  h-[320px]
  3xl:h-[500px]
  max-md:h-[280px]
  hover:shadow-lg
`

const Top = tw(Vertical)`
  w-full
  h-full
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
    <CommunityBoxWrap onClick={() => navigate(communityRoute(community.handle))}>
      <Top>
        <ImageProjectBox
          width={60}
          height={60}
          src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
          alt='community'
        />
        <ContentProjectBox>
          <Title>{community.display_name!}</Title>
          <InfoSection>
            <Info>{`${community.number_of_quests} Quests`}</Info>
          </InfoSection>
          <Description>{community.introduction}</Description>
        </ContentProjectBox>
      </Top>
    </CommunityBoxWrap>
  )
}

export default CommunityBox
