import { FunctionComponent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import {
  ContentProjectBox,
  ImageProjectBox,
  PBottomBox,
  ProjectBoxWrap,
  PTopBox,
  RewardBox,
  RewardText,
  TitleProjectBox,
} from '@/styles/explore.style'
import { ProjectType } from '@/types/project.type'

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
          <div className='mt-3 flex flex-row justify-start gap-3'>
            <div className='bg-gray-100 px-2 py-1 rounded-lg text-sm font-normal text-gray-700'>
              {'8 Quests'}
            </div>
            <div className='bg-gray-100 px-2 py-1 rounded-lg text-sm font-normal text-gray-700'>
              {'8 Quests'}
            </div>
          </div>
          <div className='mt-3 text-lg font-normal text-gray-700 overflow-hidden text-ellipsis line-clamp-3'>
            {
              'Swap platform on Sui blockchain.  Every XP you get in CREW3 can be used to redeem Suiswap token airdrops Swap platform on Sui blockchain.  Every XP you get in CREW3 can be used to redeem Suiswap token airdrops'
            }
          </div>
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
