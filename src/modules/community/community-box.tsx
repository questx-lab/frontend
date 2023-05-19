import { FunctionComponent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { ProjectType } from '@/types/project.type'
import { Horizontal, Vertical, VerticalBetween } from '@/widgets/orientation'

const ContentProjectBox = tw(Vertical)`
  justify-between
`

const ImageProjectBox = styled(Image)(tw`
  rounded-full
`)

const PbDes = tw.div`
  mt-3
  text-lg
  font-normal
  text-gray-700
  overflow-hidden
  text-ellipsis
  line-clamp-3
`

const PbInfo = tw(Horizontal)`
  mt-3 gap-3
`

const PbInfoBox = tw.div`
  bg-gray-100
  px-2
  py-1
  rounded-lg
  text-sm
  font-normal
  text-gray-700
`

const PBottomBox = tw(Horizontal)`
  w-full
  items-center
`

const ProjectBoxWrap = tw(VerticalBetween)`
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
  hover:shadow-lg
`

const PTopBox = tw(Vertical)`
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
`

const TitleProjectBox = tw.p`
  mt-3
  text-black
  font-medium
  text-lg
  max-lg:text-lg
`

const CommunityBox: FunctionComponent<{ project: ProjectType }> = ({
  project,
}) => {
  const router = useRouter()

  return (
    <ProjectBoxWrap
      onClick={() => router.push(RouterConst.PROJECT + project.id)}
    >
      <PTopBox>
        <ImageProjectBox
          width={60}
          height={60}
          src={'/images/dummy/1.svg'}
          alt={'avatar'}
        />
        <ContentProjectBox>
          <TitleProjectBox>{project.name!}</TitleProjectBox>
          <PbInfo>
            <PbInfoBox>{'8 Quests'}</PbInfoBox>
            <PbInfoBox>{'8 Quests'}</PbInfoBox>
          </PbInfo>
          <PbDes>
            {'Swap platform on Sui blockchain.  Every XP you get in CREW3 can be used to redeem ' +
              'Suiswap token airdrops Swap platform on Sui blockchain.  Every XP you get in CREW3 ' +
              'can be used to redeem Suiswap token airdrops'}
          </PbDes>
        </ContentProjectBox>
      </PTopBox>
      <PBottomBox>
        <RewardBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <RewardText>{'300 Gems'}</RewardText>
        </RewardBox>
      </PBottomBox>
    </ProjectBoxWrap>
  )
}

export default CommunityBox
