import { FC } from 'react'

import { Layout } from 'react-grid-layout'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { QuestColor } from '@/constants/common.const'
import QuestCardDetails from '@/modules/quest/quest-card-details'
import ActiveQuestStore from '@/store/local/active-quest'
import { CategoryType, LayoutType } from '@/types'
import { QuestType } from '@/types/quest'
import { HorizontalCenter, HorizontalFullWidth } from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'

const CategoryFrame = tw(HorizontalFullWidth)`
  items-end
  h-full
`

const CreateQuest = tw(HorizontalCenter)`
  h-[220px]
  border
  border-gray-200
  border-solid
  rounded-lg
  cursor-pointer
`

const NewQuest: FC = () => {
  const navigate = useNavigate()
  const onNavigate = () => {
    navigate('./create-quest')
  }
  return (
    <CreateQuest onClick={onNavigate}>
      <PlusIcon className='w-8 h-8 text-gray-400' />
    </CreateQuest>
  )
}

const QuestList = ({
  layouts,
  isDragging,
}: {
  layouts: { [index: string]: any[] }
  isDragging: boolean
}) => {
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)
  const handleClick = (quest: QuestType) => {
    if (isDragging) {
      setActiveQuest(quest)
    }
  }

  if (!layouts['lg']) {
    return <></>
  }

  const renderList = layouts['lg'].map((layout: Layout) => {
    if (layout.type === LayoutType.CATEGORY) {
      return (
        <CategoryFrame key={(layout.data as CategoryType).id}>
          <TextXl>{(layout.data as CategoryType).name}</TextXl>
        </CategoryFrame>
      )
    }

    if (layout.type === LayoutType.NEW_QUEST) {
      return (
        <div key={layout.i}>
          <NewQuest />
        </div>
      )
    }

    let bgColor = QuestColor.EMERALD

    if (layout.y % 5 === 1) {
      bgColor = QuestColor.CYAN
    }

    if (layout.y % 5 === 2) {
      bgColor = QuestColor.INDIGO
    }

    if (layout.y % 5 === 3) {
      bgColor = QuestColor.ORANGE
    }

    if (layout.y % 5 === 4) {
      bgColor = QuestColor.PINK
    }

    return (
      <div key={(layout.data as QuestType).id}>
        <QuestCardDetails
          bgColor={bgColor}
          showCommunity={false}
          quest={layout.data as QuestType}
          isTemplate={false}
          onClick={() => handleClick(layout.data as QuestType)}
        />
      </div>
    )
  })

  return renderList
}

export default QuestList
