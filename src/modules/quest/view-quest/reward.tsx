import { FC } from 'react'

import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { BorderBox, RewardRow } from '@/modules/quest/view-quest/mini-widget'
import SubmitClaim from '@/modules/quest/view-quest/submit-claim'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { Vertical } from '@/widgets/orientation'
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

const QuestReward: FC<{
  quest: QuestType
}> = ({ quest }) => {
  const getRoleReward = () => {
    if (!quest.rewards) return null
    const discordRoles = quest.rewards.filter((reward) => reward.type === 'discord_role')
    if (discordRoles.length > 0) return discordRoles[0]
    return null
  }

  const discordRole = getRoleReward()
  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <RewardRow>
          <Image width={40} height={40} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>{`${quest.points} Points`}</RewardText>
        </RewardRow>
        {discordRole && (
          <RewardRow>
            <Image
              width={40}
              height={40}
              src={StorageConst.DISCORD_DIR.src}
              alt={StorageConst.DISCORD_DIR.alt}
            />
            <RewardDiscordRole>{` ${discordRole.data.role} Role`}</RewardDiscordRole>
          </RewardRow>
        )}
      </BorderBox>
      <SubmitClaim quest={quest} />
    </FrameShape>
  )
}

export default QuestReward
