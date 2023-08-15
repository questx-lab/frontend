import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import QuestCardToTemplate from '@/modules/quest/quest-card-to-template'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/types/quest'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { Vertical } from '@/widgets/orientation'

const BackgroundAndBorder = tw(HorizontalFullWidthCenter)`
  px-6
  bg-gray-100
  py-6
  w-full
  rounded-lg
`

const FixedWidth = tw(Vertical)`
  w-[980px]
  max-sm:w-full
`

const Templates: FC<{ communityHandle: string }> = ({ communityHandle }) => {
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)

  if (templates === undefined || templates.length === 0) {
    return <></>
  }

  return (
    <BackgroundAndBorder>
      <FixedWidth>
        <CategoryBox title='🌟 Templates' onClick={() => {}} hasShowAll={false}>
          <CarouselList
            data={templates}
            renderItemFunc={(quest: QuestType) => {
              return (
                <QuestCardToTemplate
                  key={quest.id}
                  quest={quest}
                  communityHandle={communityHandle}
                />
              )
            }}
          />
        </CategoryBox>
      </FixedWidth>
    </BackgroundAndBorder>
  )
}

export default Templates
