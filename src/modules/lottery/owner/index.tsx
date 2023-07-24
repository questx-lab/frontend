import { FC } from 'react'

import tw from 'twin.macro'

import FormLottery from '@/modules/lottery/owner/form-lottery'
import CreateLotteryStore from '@/store/local/create-lottery'

const FixedWidth = tw.div`w-[840px]`

const OwnerLottery: FC = () => {
  return (
    <CreateLotteryStore.Provider>
      <FixedWidth>
        <FormLottery />
      </FixedWidth>
    </CreateLotteryStore.Provider>
  )
}
export default OwnerLottery
