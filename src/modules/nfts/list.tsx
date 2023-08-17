import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { getNFTsApi } from '@/api/nft'
import { ErrorCodes } from '@/constants/code.const'
import CommunityStore from '@/store/local/community'
import { NftType } from '@/types/community'
import { Image } from '@/widgets/image'
import { HorizontalFullWidth, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextSm, TextXl } from '@/widgets/text'

const Gap6Vertical = tw(VerticalFullWidth)`gap-6`

const ListBox = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  rounded-lg
  flex 
  divide-y
`

const ItemBox = tw(HorizontalFullWidth)`
  p-6
`

const ImageBox = tw(Image)`
  border
  border-solid
  border-gray-200
  rounded-lg
`

const InfoBox = tw(VerticalFullWidth)`
  px-5

`

const ListNFT: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const [nfts, setNfts] = useState<NftType[]>([])

  const fetchNfts = async () => {
    const resp = await getNFTsApi(community.handle)
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) {
      setNfts(resp.data.nfts)
    }
  }
  useEffect(() => {
    fetchNfts()
  }, [])

  return (
    <Gap6Vertical>
      <ListBox>
        {nfts.map((nft) => (
          <ItemBox>
            <ImageBox width={256} height={256} src={nft.image_url} alt='' />
            <InfoBox>
              <TextXl className='text-bold'> {nft.title} </TextXl>
              <Gap height={2} />
              <TextSm>{nft.description}</TextSm>
              <Gap height={2} />
              <HorizontalFullWidth>
                <Vertical className='w-1/2'>
                  <TextSm>Pending Amount: </TextSm>
                  <TextSm>Active Amount: </TextSm>
                  <TextSm>Failure Amount: </TextSm>
                </Vertical>
                <Vertical>
                  <TextSm className='text-info-500'>{nft.pending_amount}</TextSm>
                  <TextSm className='text-success-500'>{nft.active_amount}</TextSm>
                  <TextSm className='text-danger-500'>{nft.failure_amount}</TextSm>
                </Vertical>
              </HorizontalFullWidth>
            </InfoBox>
          </ItemBox>
        ))}
      </ListBox>
    </Gap6Vertical>
  )
}

export default ListNFT
