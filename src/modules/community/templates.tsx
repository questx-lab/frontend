import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import QuestCardToTemplate from '@/modules/quest/quest-card-to-template'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/types/quest'
import { GrayBorderBox } from '@/widgets/box'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Gap } from '@/widgets/separator'

const BackgroundAndBorder = tw(GrayBorderBox)`
  px-6
  bg-gray-100
  py-6
  w-full
  rounded-lg
`

const Templates: FC<{ communityHandle: string }> = ({ communityHandle }) => {
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
