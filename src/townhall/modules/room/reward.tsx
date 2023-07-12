import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import { HorizontalBetweenCenter, HorizontalCenter } from '@/widgets/orientation'

const Frame = tw(HorizontalBetweenCenter)`
  fixed
  top-5
  left-5
  bg-white
  rounded-lg
  w-[206px]
  h-[56px]
  p-3
`

const GapHorizontal = tw(HorizontalCenter)`
  gap-2
`

const RewardBox = tw.div`
  p-1
  rounded-lg
  bg-[#FFF0DE]
  text-sm
  font-medium
`

const Reward: FC = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Frame>
      <CircularImage
        width={32}
        height={32}
        src={user.avatar_url || StorageConst.USER_DEFAULT.src}
        alt=''
      />
      <GapHorizontal>
        <RewardBox>{'🎉'}</RewardBox>
        {'32000'}
      </GapHorizontal>
      <GapHorizontal>
        <CircularImage width={24} height={24} src={StorageConst.USDT.src} alt='' />
        {'52'}
      </GapHorizontal>
    </Frame>
  )
}

export default Reward
