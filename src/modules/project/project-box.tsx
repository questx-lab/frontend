import tw from 'twin.macro'
import styled from 'styled-components'

import { FunctionComponent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { ProjectType } from '@/types/project.type'

const ContentProjectBox = tw.div`
  flex
  flex-col
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

const PbInfo = tw.div`
  mt-3 flex flex-row justify-start gap-3
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

const PBottomBox = tw.div`
  flex
  flex-row
  w-full
  justify-start
  items-center
`

const ProjectBoxWrap = tw.div`
  cursor-pointer
  p-5
  border
  rounded-lg
  border
  border-solid
  border-gray-300
  flex
  flex-col
  justify-between
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
  h-[350px]
  hover:shadow-lg
`

const PTopBox = tw.div`
  flex
  flex-col
  w-full
  h-full
  justify-start
  items-start
`

const RewardBox = tw.div`
  flex
  flex-row
  gap-1
  justify-start
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

const ProjectBox: FunctionComponent<{ project: ProjectType }> = ({
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

export default ProjectBox
