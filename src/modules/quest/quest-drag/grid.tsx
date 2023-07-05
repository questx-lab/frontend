import { FC } from 'react'

import { isMobile, isTablet } from 'react-device-detect'
import { GridDropZone, GridItem } from 'react-grid-dnd'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { QuestColor } from '@/constants/common.const'
import QuestCardDetails from '@/modules/quest/quest-card-details'
import ActiveQuestStore from '@/store/local/active-quest'
import { RenderCategoryType } from '@/types'
import { QuestType } from '@/types/quest'
import { HorizontalCenter } from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'

const Frame = tw.div`
  w-full
  h-full
`

const CreateQuest = tw(HorizontalCenter)`
  h-[220px]
  border
  border-gray-200
  border-solid
  rounded-lg
  cursor-pointer
  mr-5
  hover:shadow-lg
`

const CategoryFrame = tw.div`
  flex
  flex-col
  gap-3
`

const Padding = tw.div`
  pr-5
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

const GridLayout: FC<{
  renderCategories: RenderCategoryType[]
  isDragging: boolean
  onDragable: (value: boolean) => void
}> = ({ renderCategories, isDragging, onDragable }) => {
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)
  if (!renderCategories) {
    return <></>
  }

  const renderGrid = renderCategories.map((item, index) => {
    let bgColor = QuestColor.EMERALD

    let numCols = 3

    if (isMobile) {
      numCols = 1
    }

    if (isTablet) {
      numCols = 2
    }

    if (index % 5 === 1) {
      bgColor = QuestColor.CYAN
    }

    if (index % 5 === 2) {
      bgColor = QuestColor.INDIGO
    }

    if (index % 5 === 3) {
      bgColor = QuestColor.ORANGE
    }

    if (index % 5 === 4) {
      bgColor = QuestColor.PINK
    }

    const height = Math.ceil((item.quests.length + 1) / numCols) * 240 + 20

    const handleClick = (quest: QuestType) => {
      if (isDragging) {
        onDragable(false)
      } else {
        setActiveQuest(quest)
      }
    }

    if (!item.quests) {
      return <></>
    }

    return (
      <CategoryFrame>
        <TextXl>{item.name}</TextXl>
        <GridDropZone
          key={item.id}
          id={item.id}
          boxesPerRow={numCols}
          rowHeight={240}
          style={{ height: height }}
          onDrag={() => {
            console.log('drag')
          }}
        >
          {item.quests.map((quest) => {
            return (
              <GridItem key={quest.id}>
                <Padding>
                  <QuestCardDetails
                    bgColor={bgColor}
                    showCommunity={false}
                    quest={quest}
                    isTemplate={false}
                    onClick={() => handleClick(quest)}
                  />
                </Padding>
              </GridItem>
            )
          })}
          <GridItem draggable={false} key={`new-${item.id}`}>
            <NewQuest />
          </GridItem>
        </GridDropZone>
      </CategoryFrame>
    )
  })

  return <Frame>{renderGrid}</Frame>
}

export default GridLayout
