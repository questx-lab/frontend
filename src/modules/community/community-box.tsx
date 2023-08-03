import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, HorizontalCenter, Vertical, VerticalBetween } from '@/widgets/orientation'

const ContentProjectBox = tw(Vertical)`
  justify-between
`

const Description = tw.div`
  mt-3
  text-sm
  font-normal
  text-gray-700
  overflow-hidden
  text-ellipsis
  line-clamp-3
`

const InfoSection = tw(Horizontal)`
  mt-3 gap-3
`

const Info = tw(HorizontalCenter)`
  bg-gray-100
  px-2
  py-[3px]
  rounded-lg
  text-xs
  font-normal
  text-gray-700
  gap-1
`

const CommunityBoxWrap = tw(VerticalBetween)`
  cursor-pointer
  p-5
  border
  rounded-lg
  border
  border-solid
  border-gray-200
  max-sm:w-full
  h-[268px]
  hover:shadow-lg
`

const Top = tw(Vertical)`
  w-full
  h-full
`

const Title = tw.p`
  mt-3
  text-gray-900
  font-medium
  text-lg
`

const CommunityBox: FC<{ community: CommunityType }> = ({ community }) => {
  const navigate = useNavigate()

  return (
    <CommunityBoxWrap onClick={() => navigate(communityRoute(community.handle))}>
      <Top>
        <CircularImage
          width={64}
          height={64}
          src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
          alt='community'
        />
        <ContentProjectBox>
          <Title>{community.display_name!}</Title>
          <InfoSection>
            <Info>
              <span>⚡</span>
              {`${community.number_of_quests}`}
            </Info>
          </InfoSection>
          <Description>{community.introduction}</Description>
        </ContentProjectBox>
      </Top>
    </CommunityBoxWrap>
  )
}

export default CommunityBox
