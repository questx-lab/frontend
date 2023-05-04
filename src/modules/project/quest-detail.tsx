import { FunctionComponent } from 'react'

import Image from 'next/image'

import { StorageConst } from '@/constants/storage.const'
import { FullWidthBtn } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/types/project.type'

import { Description, HeaderBox, PointText, Title } from './quest-detail-styles'

export const QuestDetail: FunctionComponent<{
  quest: QuestType | null
}> = ({ quest }) => {
  return (
    <div className='grid gap-2 grid-cols-2 overscroll-none divide-x-2 h-max'>
      <div className='text-left p-6'>
        <Title>Mission</Title>
        <Gap height={2} />
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac leo
          dui. Sed porttitor augue erat, a hendrerit neque viverra et.
        </Description>
        <Gap height={4} />
        <Title>Guild</Title>
        <Gap height={2} />
        <Description>
          Nulla ut nibh a metus sollicitudin fermentum. Mauris in sollicitudin
          nisl, eget semper justo. Cras convallis tempus ex nec euismod.
        </Description>
        <Gap height={4} />
        <Image
          width={400}
          height={200}
          src={StorageConst.FAVORITE_ICON.src}
          alt={StorageConst.FAVORITE_ICON.alt}
        />
        <Gap height={4} />
        <Description>
          Proin pretium metus mauris, ut vulputate sem suscipit et. Vivamus
          sodales egestas lectus vel tempor. Quisque laoreet, ipsum vitae
          volutpat pellentesque, felis sapien ullamcorper augue, vulputate
          sagittis lacus nisi id libero.
        </Description>
        <Gap height={4} />
        <Title>Submission</Title>
        <Gap height={2} />
        <Description>
          Curabitur velit ante, facilisis in sapien sed, tristique ultricies
          risus. Quisque dignissim odio a lorem varius porttitor. Pellentesque
          molestie ex ex.
        </Description>
        <Gap height={6} />
        <FullWidthBtn> Claim Reward </FullWidthBtn>
      </div>
      <div className='text-left'>
        <div className='border-b-2 p-6'>
          <Title>Reward</Title>
          <Gap height={4} />
          <HeaderBox>
            <Image
              width={40}
              height={40}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{quest?.recurrence}</PointText>
          </HeaderBox>
        </div>
      </div>
    </div>
  )
}
