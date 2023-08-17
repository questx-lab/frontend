import { FC, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { createNFTApi } from '@/api/nft'
import { NFTsTab } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { NftUpload } from '@/modules/nfts/upload-image'
import CommunityStore from '@/store/local/community'
import { CreateNFTReq } from '@/types/nft'
import { uploadFile } from '@/utils/file'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import MultipleInputBox from '@/widgets/input/multiple-input-box'
import { EndHorizontal, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3, MediumTextSm, PrimaryText, RequiredText } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`gap-2`

const Gap6Vertical = tw(VerticalFullWidth)`gap-6`

const Border = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  p-5
  rounded-lg
  gap-5
`

const AnnouncementBox = tw.div`
  border
  border-solid
  border-gray-200
  rounded-lg
  p-4
  bg-[ #0EA5E90D]
`

const FormNFT: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const setTab = CommunityStore.useStoreActions((actions) => actions.setNftTab)
  const nftImage = CommunityStore.useStoreState((state) => state.nftImage)

  const [loading, setLoading] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)

  const onCreateNFT = async () => {
    setLoading(true)
    try {
      if (nftImage) {
        const resp = await uploadFile([nftImage])
        if (resp.error) {
          toast.error(resp.error)
        } else {
          const payload: CreateNFTReq = {
            community_handle: community.handle,
            title: title,
            description: description,
            quantity: quantity,
            image_url: resp.value || '',
            chain: EnvVariables.CHAIN,
          }

          const { error } = await createNFTApi(payload)

          if (error) {
            toast.error(error)
          } else {
            toast.success('Create NFT successfully')
          }
        }
      } else {
        toast.error('Please upload image')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Gap6Vertical>
      <Border>
        <GapVertical>
          <AnnouncementBox>
            NFT is one of the reward methods for users when completing quests. You can create new
            NFTs here.
          </AnnouncementBox>
          <MediumTextSm>
            {'Title'} <RequiredText>{'*'}</RequiredText>
          </MediumTextSm>
          <InputBox value={title} onChange={(e) => setTitle(e.target.value)} />
        </GapVertical>
        <GapVertical>
          <MediumTextSm>
            {'Quantity'} <RequiredText>{'*'}</RequiredText>
          </MediumTextSm>
          <InputBox
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value || '0', 10))}
          />
        </GapVertical>
        <GapVertical>
          <HeaderText3>{'PROJECT IMAGE'}</HeaderText3>
          <Gap height={2} />
          <NftUpload imageSize={250} />
          <Gap height={2} />
          <PrimaryText size='sm'>{'*Max 2.0MB, Size 200x200px'}</PrimaryText>
          <Gap height={6} />
        </GapVertical>
        <GapVertical>
          <MediumTextSm>{'Description'}</MediumTextSm>
          <MultipleInputBox value={description} onChange={(e) => setDescription(e.target.value)} />
        </GapVertical>
      </Border>
      <EndHorizontal>
        <NegativeButton onClick={() => setTab(NFTsTab.ListNFT)}>{'Cancel'}</NegativeButton>
        <PositiveButton onClick={onCreateNFT} loading={loading}>
          {'Create'}
        </PositiveButton>
      </EndHorizontal>
    </Gap6Vertical>
  )
}

export default FormNFT
