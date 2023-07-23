import { FC, useState } from 'react'

import toast from 'react-hot-toast'

import { buyLotteryTicketsApi } from '@/api/loterry'
import { LotteryViewEnum } from '@/constants/common.const'
import { Frame, GapHorizontal } from '@/modules/lottery/guest/mini-widget'
import CommunityStore from '@/store/local/community'
import ViewLotteryStore from '@/store/local/view-lottery'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { TextBase } from '@/widgets/text'

const BuyTicket: FC = () => {
  enum TypesButton {
    SPIN,
    SPINS,
  }
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const ticketConvert = ViewLotteryStore.useStoreState((state) => state.ticketConvert)

  const setView = ViewLotteryStore.useStoreActions((action) => action.setView)
  const setLotteryResults = ViewLotteryStore.useStoreActions((action) => action.setLotteryResults)

  const [loading, setLoading] = useState<boolean[]>([false, false])

  const onClicked = (type: TypesButton) => {
    if (type === TypesButton.SPIN) {
      buyLotteryTickets(1)
      setLoading([true, false])
    } else {
      buyLotteryTickets(ticketConvert)
      setLoading([false, true])
    }
  }

  const buyLotteryTickets = async (amount: number) => {
    try {
      const { data, error } = await buyLotteryTicketsApi(community.handle, amount)
      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setLotteryResults(data.results)
      }
      setView(LotteryViewEnum.RESULT)
    } catch (error) {
    } finally {
      setLoading([false, false])
    }
  }

  return (
    <Frame>
      <TextBase>{`You currently have ${ticketConvert} ticket.`}</TextBase>
      <GapHorizontal>
        <PositiveButton
          loading={loading[0]}
          onClick={() => onClicked(TypesButton.SPIN)}
          isFull
          type={ButtonTypeEnum.WARNING}
        >
          {'Spin'}
        </PositiveButton>
        <PositiveButton loading={loading[1]} onClick={() => onClicked(TypesButton.SPINS)} isFull>
          {`Spin ${ticketConvert} times`}
        </PositiveButton>
      </GapHorizontal>
    </Frame>
  )
}

export default BuyTicket
