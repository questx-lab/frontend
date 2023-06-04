import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { QuestCardToTemplate } from '@/modules/quest/quest-card-to-template'
import { GlobalStoreModel } from '@/store/store'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { GrayBorderBox } from '@/widgets/box'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'

const BackgroundAndBorder = tw(GrayBorderBox)`
  px-16
  bg-gray-100
  py-6
`

const Templates: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)

  if (templates === undefined || templates.length === 0) {
    return <></>
  }

  return (
    <BackgroundAndBorder>
      <CategoryBox title='🌟 Templates' onClick={() => {}} hasShowAll={false}>
        <Gap />
        <CarouselList
          data={templates}
          renderItemFunc={(quest: QuestType) => {
            return <QuestCardToTemplate quest={quest} communityHandle={communityHandle} />
          }}
        />
      </CategoryBox>
    </BackgroundAndBorder>
  )
}

export default Templates
