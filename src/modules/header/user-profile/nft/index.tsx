import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { getNFTsByMeApi } from '@/api/nft'
import { ErrorCodes } from '@/constants/code.const'
import { FullWidth } from '@/modules/review-submissions/mini-widget'
import { NftType } from '@/types/community'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label } from '@/widgets/text'

const ItemListBox = tw(FullWidth)`
  grid
  grid-cols-4
  gap-2

`

const ItemBox = tw(Vertical)`
  border
  border-2
  rounded-lg
  justify-center
  items-center
  flex
  px-5
  py-3
`

const NFT: FC = () => {
  const [nfts, setNfts] = useState<NftType[]>([])

  const fetchNfts = async () => {
    const resp = await getNFTsByMeApi()
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data) setNfts(resp.data.nfts)
  }

  useEffect(() => {
    fetchNfts()
  }, [])
  return (
    <ItemListBox>
      {nfts.map((nft) => (
        <ItemBox>
          <Image width={100} height={100} src={nft.content.image} />
          <Gap height={1} />
          <Label> {nft.title}</Label>
        </ItemBox>
      ))}
    </ItemListBox>
  )
}

export default NFT
