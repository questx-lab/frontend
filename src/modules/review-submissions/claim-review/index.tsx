import { FC } from 'react'

import parseHtml from 'html-react-parser'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { BorderBox, RewardRow } from '@/modules/quest/view-quest/mini-widget'
import ClaimInfo from '@/modules/review-submissions/claim-review/claim-info'
import ClaimReviewStore from '@/store/local/claim-review'
import { QuestType } from '@/types/quest'
import { Image } from '@/widgets/image'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label, RewardText } from '@/widgets/text'

const OuterFrame = tw(Horizontal)`
  w-full
  h-full
  max-h-[calc(100vh_-_160px)]
  overflow-y-scroll
  max-sm:flex-col
`

const ClaimColumn = tw(Vertical)`
  w-2/3
  h-full
  pt-8
  px-8
  gap-4
  overflow-y-scroll
  max-sm:w-full
`

const QuestColumn = tw(Vertical)`
  w-1/3
  h-full
  pt-8
  pr-8
  pl-2
  gap-4
  max-sm:w-full
`

const OverscrollY = tw(VerticalFullWidth)`
  max-h-[360px]
  overflow-y-scroll
`

export const QuestDetail: FC<{ quest: QuestType }> = ({ quest }) => {
  return (
    <QuestColumn>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <RewardRow>
          <Image width={40} height={40} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>{`${quest.points} Points`}</RewardText>
        </RewardRow>
      </BorderBox>
      <BorderBox>
        <Label>{'MISSION'}</Label>
        <Gap />
        <OverscrollY>{parseHtml(quest.description ?? '')}</OverscrollY>
      </BorderBox>
    </QuestColumn>
  )
}

const ClaimReview: FC = () => {
  const claimQuestActive = ClaimReviewStore.useStoreState((state) => state.claimQuestActive)

  return (
    <OuterFrame>
      <ClaimColumn>
        <BorderBox>
          <ClaimInfo />
        </BorderBox>
      </ClaimColumn>
      <QuestDetail quest={claimQuestActive.quest} />
    </OuterFrame>
  )
}

export default ClaimReview
