// import './styles.css'

import { FC, useEffect, useState } from 'react'

import { GridContextProvider, move, swap } from 'react-grid-dnd'

import { updateQuestCategoryApi, updateQuestPositionApi } from '@/api/quest'
import GridLayout from '@/modules/quest/quest-drag/grid'
import CommunityStore from '@/store/local/community'
import { RenderCategoryType } from '@/types'
import { QuestType } from '@/types/quest'

const GridDrag: FC = () => {
  const [items, setItems] = useState<RenderCategoryType[]>([])
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const categories = CommunityStore.useStoreState((state) => state.categories)
  const quests = CommunityStore.useStoreState((state) => state.quests)

  useEffect(() => {
    if (categories && quests && quests.length) {
      const rs = categories.map((category) => {
        const questFilter: QuestType[] = quests.filter((quest) => quest.category.id === category.id)

        // Sort Quest order by position
        questFilter.sort((a, b) => a.position - b.position)

        return {
          id: category.id,
          name: category.name,
          quests: questFilter,
        }
      })
      const questNoCategory: QuestType[] = quests.filter((quest) => quest.category.id === '')

      questNoCategory.sort((a, b) => a.position - b.position)

      const OtherQuest = {
        id: '',
        name: 'Other Quests',
        quests: questNoCategory,
      }

      setItems([...rs, OtherQuest])
    } else {
      setItems([
        {
          id: '',
          name: 'Other Quests',
          quests: [],
        },
      ])
    }
  }, [categories, quests])

  const onDragable = (dragable: boolean) => {
    setIsDragging(dragable)
  }

  const onChange = async (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string | undefined
  ) => {
    setIsDragging(true)
    // sourceId: CategoryId
    // targetId: CategoryId
    // sourceIndex: Quest position
    // targetIndex: Quest index

    const sourceOrder = items.findIndex((item) => item.id === sourceId)
    const targetOrder = items.findIndex((item) => item.id === targetId)

    if (!items[sourceOrder]) {
      return
    }

    if (sourceIndex === items[sourceOrder].quests.length) {
      return
    }

    if (targetIndex >= items[sourceOrder].quests.length) {
      return
    }

    if (targetId && items) {
      const result = move(
        items[sourceOrder].quests,
        items[targetOrder].quests,
        sourceIndex,
        targetIndex
      )
      const newData = items.map((item) => {
        if (item.id === sourceId) {
          return { ...item, quests: result[0] }
        }

        if (item.id === targetId) {
          return { ...item, quests: result[1] }
        }

        return item
      })

      // Update Quest to new category when Drag quest from source category to target category
      await updateQuestCategoryApi(items[sourceOrder].quests[sourceIndex].id, targetId)

      // Update new position of quest when drag quest to new category
      await updateQuestPositionApi(items[sourceOrder].quests[sourceIndex].id, targetIndex)

      setItems(newData)
      return
    }

    // Update new position of quest in same category
    await updateQuestPositionApi(items[sourceOrder].quests[sourceIndex].id, targetIndex)
    const result = swap(items[sourceOrder].quests, sourceIndex, targetIndex)

    const newData = items.map((item) => {
      if (item.id === sourceId) {
        return { ...item, quests: result }
      }

      return item
    })

    setItems(newData)
    return
  }

  const filteredItems = items.filter((item) => item.quests)

  return (
    <GridContextProvider onChange={onChange}>
      <GridLayout
        renderCategories={filteredItems}
        isDragging={isDragging}
        onDragable={onDragable}
      />
    </GridContextProvider>
  )
}

export default GridDrag
