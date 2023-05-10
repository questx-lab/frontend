import { useState } from 'react'
import { ContentContainer } from '@/styles/quest-detail.style'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { GlobalStoreModel } from '@/store/store'
import { StorageConst } from '@/constants/storage.const'
import { ImageQuestBox } from '@/styles/questboard.style'
import { Gap } from '@/styles/common.style'
import { InfoText } from '@/styles/settings.style'
import Image from 'next/image'

export default function Setting({ userId }: { userId: string }) {
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)
  const [isPerson, setIsPerson] = useState<boolean>(false)
  const setLogin = useStoreActions<GlobalStoreModel>(
    (action) => action.setLogin
  )

  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)
  return (
    <div className='grid grid-cols-3'>
      <ContentContainer className='col-span-1 divide-y-2 p-0'>
        <div className='py-12'>
          <div className='flex justify-center'>
            <ImageQuestBox
              width={96}
              height={96}
              src={StorageConst.MANTA_LOGO.src}
              alt={StorageConst.MANTA_LOGO.alt}
            />
          </div>
          <Gap height={4} />
          <div className='flex gap-2 justify-center'>
            <div className='text-base	text-gray-900'> DotMan137 </div>
            <div className='bg-[#14B8A6] rounded-full px-3 py-1 text-xs text-white'>
              lvl.3
            </div>
          </div>
        </div>
        <div className='py-6 px-12'>
          <InfoText>
            <div> Gems </div>
            <div className='flex'>
              <Image
                width={24}
                height={24}
                src={StorageConst.POINT_ICON.src}
                alt={StorageConst.POINT_ICON.alt}
              />
              <Gap width={2} />
              <div className='text-[#FF7B05]'> 56.7K </div>
            </div>
          </InfoText>
          <Gap width={2} />
          <InfoText>
            <div> XP </div>
            <div className='flex'>
              <Image
                width={24}
                height={24}
                src={StorageConst.XP_ICON.src}
                alt={StorageConst.XP_ICON.alt}
              />
              <Gap width={2} />
              <div className='text-[#10B981]'> 3500 </div>
            </div>
          </InfoText>
          <Gap width={2} />
          <InfoText>
            <div> Quest Completed </div>
            <div className='text-black'> 257 </div>
          </InfoText>
          <Gap width={2} />
          <InfoText>
            <div> Community Joined </div>
            <div className='text-black'> 36 </div>
          </InfoText>
        </div>
      </ContentContainer>
      <ContentContainer className='col-span-2 p-0'>
        <div className='divide-y-2'>
          <div className='py-6 px-12 flex'>
            <div> 🎉 Badge Achievements </div>
            <Gap width={2} />
            <div className='bg-[#F3F4F6] rounded-full px-2 py-1 text-xs text-gray-700'>
              12
            </div>
          </div>
          <div className='grid grid-cols-5'>
            {[...Array.from({ length: 20 }, (x: any, i: any) => i)].map(
              (idx) => (
                <ContentContainer key={`key-${idx}`}>
                  <Image
                    width={96}
                    height={96}
                    src={StorageConst.XP_ICON.src}
                    alt={StorageConst.XP_ICON.alt}
                  />
                </ContentContainer>
              )
            )}
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}
