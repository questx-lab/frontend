import { FC } from 'react'

import parseHtml from 'html-react-parser'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { BorderBox, RewardRow } from '@/modules/quest/view-quest/mini-widget'
import ClaimInfo from '@/modules/review-submissions/claim-review/claim-info'
import ClaimReviewStore from '@/store/local/claim-review'
import { Image } from '@/widgets/image'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label, RewardText } from '@/widgets/text'

const OuterFrame = tw(Horizontal)`
  w-full
  h-full
`

const ClaimColumn = tw(Vertical)`
  w-2/3
  h-full
  pt-8
  px-8
  gap-4
`

const QuestColumn = tw(Vertical)`
  w-1/3
  h-full
  pt-8
  pr-8
  pl-2
  gap-4
`

const QuestDetail: FC = () => {
  const claimQuestActive = ClaimReviewStore.useStoreState((state) => state.claimQuestActive)
  return (
    <QuestColumn>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <RewardRow>
          <Image width={40} height={40} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>
            {`${
              claimQuestActive.quest.rewards?.length &&
              claimQuestActive.quest.rewards[0].data.points
            } Points`}
          </RewardText>
        </RewardRow>
      </BorderBox>
      <BorderBox>
        <Label>{'MISSION'}</Label>
        <Gap />
        <VerticalFullWidth>{parseHtml(claimQuestActive.quest.description ?? '')}</VerticalFullWidth>
      </BorderBox>
    </QuestColumn>
  )
}

const ClaimReview: FC = () => {
  return (
    <OuterFrame>
      <ClaimColumn>
        <BorderBox>
          <ClaimInfo />
        </BorderBox>
      </ClaimColumn>
      <QuestDetail />
    </OuterFrame>
  )
}

export default ClaimReview
