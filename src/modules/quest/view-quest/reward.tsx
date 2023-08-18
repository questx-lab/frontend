import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { getNFTsApi } from '@/api/nft'
import { ErrorCodes } from '@/constants/code.const'
import StorageConst from '@/constants/storage.const'
import { BorderBox, RewardRow } from '@/modules/quest/view-quest/mini-widget'
import SubmitClaim from '@/modules/quest/view-quest/submit-claim'
import { NftType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label, RewardText } from '@/widgets/text'

const FrameShape = tw(Vertical)`
  w-[240px]
  h-full
  justify-start
  items-end
  max-md:w-full
  max-md:px-0
  gap-3
`
export const RewardDiscordRole = tw.span`
  text-[#565ADD]
  text-lg
  font-medium
`

export const RewardNftReward = tw.span`
  text-info-500
  text-lg
  font-medium
`

const QuestReward: FC<{
  quest: QuestType
}> = ({ quest }) => {
  const [nfts, setNfts] = useState<NftType[]>([])

  const getRoleReward = () => {
    if (!quest.rewards) return null
    const discordRoles = quest.rewards.filter((reward) => reward.type === 'discord_role')
    if (discordRoles.length > 0) return discordRoles
    return null
  }

  const getNftReward = () => {
    if (!quest.rewards) return null
    const nftRewards = quest.rewards.filter((reward) => reward.type === 'nft')
    if (nftRewards.length > 0) return nftRewards
    return null
  }

  const discordRoles = getRoleReward()
  const nftRewards = getNftReward()

  const fetchNft = async () => {
    if (nftRewards) {
      const nftIds = nftRewards.map((nft) => nft.data.token_id) as bigint[]
      const resp = await getNFTsApi(nftIds)

      if (resp.code === ErrorCodes.NOT_ERROR && resp.data) setNfts(resp.data.nfts)
    }
  }

  useEffect(() => {
    if (nftRewards) {
      fetchNft()
    }
  }, [])

  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <RewardRow>
          <Image width={24} height={24} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>{`${quest.points} Points`}</RewardText>
        </RewardRow>
        {discordRoles &&
          discordRoles.map((role) => (
            <RewardRow>
              <Image
                width={40}
                height={40}
                src={StorageConst.DISCORD_DIR.src}
                alt={StorageConst.DISCORD_DIR.alt}
              />
              <RewardDiscordRole>{` ${role.data.role} Role`}</RewardDiscordRole>
            </RewardRow>
          ))}
        {nfts &&
          nfts.map((nft) => (
            <RewardRow>
              <Image width={40} height={40} src={nft.image_url} alt={''} />
              <Gap width={2} />
              <RewardNftReward> {`${nft.title} NFT`} </RewardNftReward>
            </RewardRow>
          ))}
      </BorderBox>
      <SubmitClaim quest={quest} />
    </FrameShape>
  )
}

export default QuestReward
