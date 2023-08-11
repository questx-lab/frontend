import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import walletController from '@/modules/wallet/services/wallet-controller'
import { PositiveButton } from '@/widgets/buttons'
import { VerticalFullWidth, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXl } from '@/widgets/text'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { CheckIcon } from '@heroicons/react/20/solid'
import CommunityStore from '@/store/local/community'
import tw from 'twin.macro'

const SuccessIcon = tw.div`
  flex
  items-center
  justify-center 
  w-10
  h-10 
  rounded-full 
  lg:h-12
  lg:w-12 
  shrink-0
  bg-success-500
  text-white
`

const Step2: FC = () => {
  const switchedChain = CommunityStore.useStoreState((state) => state.switchedChain)
  const setSwitchedChain = CommunityStore.useStoreActions((action) => action.setSwitchedChain)
  const switchChain = async () => {
    try {
      await walletController.changeChain()
      setSwitchedChain(true)
    } catch (error) {
      toast.error('Can not switch chain to AVAXC')
    }
  }
  return (
    <VerticalFullWidth>
      {!switchedChain && (
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
      {switchedChain && (
        <VerticalFullWidthCenter>
          <SuccessIcon>
            <CheckIcon className='w-7 h-7 text-while' />
          </SuccessIcon>
          <Gap height={3} />
          <TextXl> Switch chain successful </TextXl>
        </VerticalFullWidthCenter>
      )}
    </VerticalFullWidth>
  )
}

export default Step2
