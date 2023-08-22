import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { getNFTsByCommunityApi } from '@/api/nft'
import { ErrorCodes } from '@/constants/code.const'
import CommunityStore from '@/store/local/community'
import { NftType } from '@/types/community'
import { Image } from '@/widgets/image'
import { HorizontalFullWidth, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3, TextSm, TextXl } from '@/widgets/text'

const Gap6Vertical = tw(VerticalFullWidth)`gap-6`

const ListBox = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  rounded-lg
  flex
  divide-y
`

const NftBox = tw(VerticalFullWidth)`
  pl-6
  pb-6
  pr-6
  pt-3
`

const ItemBox = tw(HorizontalFullWidth)`
  pt-3
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
    const resp = await getNFTsByCommunityApi(community.handle)
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
          <NftBox>
            <HeaderText3>{nft.content.name}</HeaderText3>
            <TextSm>{nft.content.description}</TextSm>
            <ItemBox>
              <ImageBox width={256} height={256} src={nft.content.image} alt='' />
              <InfoBox>
                <TextXl className='text-bold'> {nft.title} </TextXl>
                <Gap height={2} />
                <TextSm>{nft.description}</TextSm>
                <Gap height={2} />
                <HorizontalFullWidth>
                  <Vertical className='w-1/2'>
                    <TextSm>Total balance: </TextSm>
                    <TextSm>Current balance: </TextSm>
                    <TextSm>Number of claimed: </TextSm>
                  </Vertical>
                  <Vertical>
                    <TextSm className='text-info-500'>{nft.total_balance}</TextSm>
                    <TextSm className='text-success-500'>
                      {nft.total_balance - nft.number_of_claimed}
                    </TextSm>
                    <TextSm className='text-danger-500'>{nft.number_of_claimed}</TextSm>
                  </Vertical>
                </HorizontalFullWidth>
              </InfoBox>
            </ItemBox>
          </NftBox>
        ))}
      </ListBox>
    </Gap6Vertical>
  )
}

export default ListNFT
