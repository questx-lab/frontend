import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import walletController from '@/modules/wallet/services/wallet-controller'
import { PositiveButton } from '@/widgets/buttons'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXl } from '@/widgets/text'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckIcon } from '@heroicons/react/20/solid'

const Step2: FC = () => {
  const [switched, setSwitched] = useState<boolean>(false)
  const switchChain = async () => {
    try {
      await walletController.changeChain()
      setSwitched(true)
    } catch (error) {
      toast.error('Can not switch chain to AVAXC')
    }
  }
  return (
    <VerticalFullWidth>
      {!switched && (
        <div>
          <HorizontalFullWidthCenter>
            <TextSm>
              Click the button, and the platform will automatically switch your chain to the AVAX
              C-Chain.
            </TextSm>
          </HorizontalFullWidthCenter>
          <Gap height={3} />
          <HorizontalFullWidthCenter>
            <PositiveButton onClick={() => switchChain()}> SWITCH CHAIN</PositiveButton>
          </HorizontalFullWidthCenter>
        </div>
      )}
      {switched && (
        <HorizontalFullWidthCenter>
          <CheckIcon className='w-7 h-7 text-success' />
          <TextXl> Switch chain successful </TextXl>
        </HorizontalFullWidthCenter>
      )}
    </VerticalFullWidth>
  )
}

export default Step2
