import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { useEffect, useState } from 'react'

import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import tw from 'twin.macro'

import QuestList from '@/modules/quest/quest-drag/quest-list'
import CommunityStore from '@/store/local/community'
import { CategoryType, LayoutType } from '@/types'
import { QuestType } from '@/types/quest'

const ResponsiveGridLayout = WidthProvider(Responsive)

const Root = tw.div`
  w-full
  h-full
`
declare global {
  namespace ReactGridLayout {
    interface Layout {
      type?: LayoutType
      data?: QuestType | CategoryType
    }
  }
}

// styled-components definition removed for brevity...
const GridDrag = () => {
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const quests = CommunityStore.useStoreState((state) => state.quests)

  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({})
  const [isDragging, setIsDragging] = useState<boolean>(false)

  useEffect(() => {
    const layout: Layout[] = []
    const categoriesShadows = Array.from(categories)
    if (quests.length && categoriesShadows.length) {
      const questsNoCategory = quests.filter((quest) => quest.category.id === '')

      if (questsNoCategory.length !== 0) {
        const emptyCategory: CategoryType = {
          id: 'empty',
          name: 'Other Quests',
        }
        categoriesShadows.push(emptyCategory)
      }

      categoriesShadows.forEach((category, index) => {
        layout.push({
          i: category.id,
          x: 0,
          y: index * 2,
          w: 3,
          h: 2,
          static: false,
          isDraggable: false,
          type: LayoutType.CATEGORY,
          data: category,
          minH: 0,
          moved: true,
          isBounded: true,
        })

        layout.push({
          i: index.toString(),
          x: 0,
          y: index * 2 + 1,
          w: 1,
          h: 7,
          isDraggable: false,
          type: LayoutType.NEW_QUEST,
        })

        let count = 1
        quests.forEach((quest, i) => {
          if (quest.category.id === category.id) {
            layout.push({
              i: quest.id,
              x: count,
              y: index * 2 + 1,
              w: 1,
              h: 7,
              isDraggable: true,
              type: LayoutType.QUEST,
              data: quest,
            })
            count = (count + 1) % 3
          }
        })
        if (category.id === 'empty') {
          questsNoCategory.forEach((quest) => {
            layout.push({
              i: quest.id,
              x: count,
              y: index * 2 + 1,
              w: 1,
              h: 7,
              isDraggable: true,
              type: LayoutType.QUEST,
              data: quest,
            })
            count = (count + 1) % 3
          })
        }
      })
    }

    setLayouts({ lg: layout })
  }, [quests, categories])

  const onLayoutChange = (layout: any, layouts: any) => {
    // setLayouts(layouts)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragStop = () => {
    setIsDragging(false)
  }

  const render = QuestList({ layouts, isDragging })

  return (
    <Root>
      <ResponsiveGridLayout
        layouts={layouts}
        useCSSTransforms={false}
        rowHeight={23}
        width={360}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onLayoutChange={onLayoutChange}
        cols={{ lg: 3, md: 3, sm: 3, xs: 2, xxs: 1 }}
        containerPadding={[0, 0]}
        transformScale={1}
        isResizable={false}
        preventCollision={false}
      >
        {render}
      </ResponsiveGridLayout>
    </Root>
  )
}

export default GridDrag
