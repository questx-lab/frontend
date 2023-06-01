import { Quest } from '@/modules/quest/quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/utils/type'
import { GrayBorderBox } from '@/widgets/box'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/category-box'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const BackgroundAndBorder = tw(GrayBorderBox)`
  px-16
  bg-gray-100
  py-6
`

const Templates: FunctionComponent = () => {
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)

  if (templates === undefined || templates.length === 0) {
    return <></>
  }

  return (
    <BackgroundAndBorder>
      <CategoryBox title='🌟 Templates' onClick={() => {}} hasShowAll={false}>
        <CarouselList
          data={templates}
          renderItemFunc={(quest: QuestType) => {
            return <Quest quest={quest} isTemplate />
          }}
        />
      </CategoryBox>
    </BackgroundAndBorder>
  )
}

export default Templates
