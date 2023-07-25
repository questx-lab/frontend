import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getClaimRewardsApi } from '@/api/reward'
import StorageConst from '@/constants/storage.const'
import ClaimAction from '@/modules/header/claim-reward/claim-action'
import { ClaimableRewardType } from '@/types'
import { Image } from '@/widgets/image'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidthCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { MediumTextSm, TextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidthCenter)`gap-6 p-6`

const FixedWidth = tw(VerticalFullWidthCenter)`
  h-[100px]
  gap-2
  py-4
  px-2
  border
  border-solid
  border-gray-200
  rounded-lg
`

const GapHorizontal = tw(HorizontalBetweenCenterFullWidth)`gap-2`

const ClaimReward: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [claimRewards, setClaimRewards] = useState<ClaimableRewardType>()

  const onOpenModal = () => {
    setOpenModal(true)
  }

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const getClaimRewards = async () => {
    try {
      const { data, error } = await getClaimRewardsApi()
      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setClaimRewards(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getClaimRewards()
  }, [])

  if (loading) {
    return <SmallSpinner />
  }

  const usdtAmount = claimRewards?.total_claimable_tokens.find(
    (result) => result.token_symbol === 'USDT'
  )

  return (
    <>
      <GapHorizontal>
        <FixedWidth onClick={onOpenModal}>
          <Image height={24} width={24} src={StorageConst.USDT.src} alt='' />
          <MediumTextSm>{usdtAmount?.amount || 0}</MediumTextSm>
        </FixedWidth>
      </GapHorizontal>
      <BasicModal styled='!w-[480px]' title='Claim USDT' isOpen={openModal} onClose={onCloseModal}>
        <Frame>
          <TextSm>
            {`You currently have ${usdtAmount?.amount || 0} USDT. \n\
              Would you like to claim it?`}
          </TextSm>
          <ClaimAction claimRewards={claimRewards} />
        </Frame>
      </BasicModal>
    </>
  )
}

export default ClaimReward
