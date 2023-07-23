import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { claimLotteryWinnerApi } from '@/api/loterry'
import StorageConst from '@/constants/storage.const'
import { Frame } from '@/modules/lottery/guest/mini-widget'
import ViewLotteryStore from '@/store/local/view-lottery'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { BuyLotteryTicketsType } from '@/types/lottery'
import { PositiveButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { TextSm, TextXl } from '@/widgets/text'

const SuccessTextSm = tw(TextSm)`text-success`
const FrameResult = tw(VerticalFullWidth)`
  max-h-[200px]
  w-full
  overflow-y-scroll
  gap-3
`

const ResultItem: FC<{ result: BuyLotteryTicketsType }> = ({ result }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  if (!result.prize.rewards || (result.prize.rewards && result.prize.rewards.length === 0)) {
    return <></>
  }

  const onClaim = async () => {
    setLoading(true)
    try {
      if (user) {
        if (!user.wallet_address) {
          toast.error('You must have a wallet address')
          return
        }

        const { error } = await claimLotteryWinnerApi(result.id, user.wallet_address)
        if (error) {
          toast.error(error)
          return
        }

        toast.success('Claim lottery successfully')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <HorizontalBetweenCenterFullWidth onClick={onClaim}>
      {/* TODO: Currently only support coin usdt */}
      <SuccessTextSm>{result.prize.rewards[0].data.amount} USDT</SuccessTextSm>
      <PositiveButton loading={loading}>{'Claim'}</PositiveButton>
    </HorizontalBetweenCenterFullWidth>
  )
}

const RenderResults: FC = () => {
  const lotteryResults = ViewLotteryStore.useStoreState((state) => state.lotteryResults)

  if (!lotteryResults) {
    return <></>
  }

  const render = lotteryResults.map((result, index) => <ResultItem key={index} result={result} />)

  return <FrameResult>{render}</FrameResult>
}

const Result: FC = () => {
  return (
    <Frame>
      <Image
        height={192}
        width={192}
        src={StorageConst.CONGRAT.src}
        alt={StorageConst.CONGRAT.alt}
      />
      <TextXl>{'Congratulations!'}</TextXl>
      <TextSm>{'Your lottery results'}</TextSm>
      <RenderResults />
    </Frame>
  )
}

export default Result
