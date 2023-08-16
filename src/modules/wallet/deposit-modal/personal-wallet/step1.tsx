import { FC } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import StorageConst from '@/constants/storage.const'
import walletController from '@/modules/wallet/services/wallet-controller'
import CommunityStore from '@/store/local/community'
import { NegativeButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { VerticalFullWidth, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXl } from '@/widgets/text'
import { CheckIcon } from '@heroicons/react/20/solid'

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

const Step1: FC = () => {
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
            <NegativeButton onClick={() => switchChain()}>
              <Image
                width={20}
                height={20}
                src={StorageConst.AVALANCHE.src}
                alt={StorageConst.AVALANCHE.alt}
              />
              SWITCH TO AVALANCHE
            </NegativeButton>
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

export default Step1
