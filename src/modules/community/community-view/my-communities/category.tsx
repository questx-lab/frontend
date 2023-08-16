import { FC, useEffect } from 'react'

import { isMobile } from 'react-device-detect'
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { deleteCategoryApi, updateCategoryApi } from '@/api/communitiy'
import { CommunityRoleEnum } from '@/constants/common.const'
import AddCategory from '@/modules/create-quest/select-category/add-category'
import CommunityStore from '@/store/local/community'
import { CategoryType } from '@/types'
import { HorizontalCenter } from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Content = tw.div`
  w-full
  gap-2
`

const CategoryBox = tw(HorizontalCenter)`
  p-2
  bg-gray-100
  rounded-lg
  cursor-pointer
  mr-2
  select-none
  gap-1
`

const CategoryText = tw(MediumTextSm)`
  w-full
  overflow-hidden
  text-ellipsis
  line-clamp-1
  max-h-[32px]
`

const Category: FC = () => {
  // data
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const role = CommunityStore.useStoreState((state) => state.role)

  const setCategories = CommunityStore.useStoreActions((action) => action.setCategories)

  useEffect(() => {
    if (categories) {
      categories.sort((a, b) => a.position - b.position)
    }
  }, [])

  if (!categories) {
    return <></>
  }

  const onDelete = async (category: CategoryType) => {
    try {
      const { error } = await deleteCategoryApi(category.id)
      if (error) {
        toast.error(error)
        return
      }
      setCategories([...categories.filter((cat) => cat.id !== category.id)])
      toast.success('Remove category successfully')
    } catch (error) {}
  }

  // handler
  const listCategory = categories.map((category) => (
    <GridItem key={category.id}>
      <Tooltip content={category.name}>
        <CategoryBox>
          <CategoryText>{category.name}</CategoryText>
          <XMarkIcon onClick={() => onDelete(category)} className='w-5 h-5 text-gray-900' />
        </CategoryBox>
      </Tooltip>
    </GridItem>
  ))

  if (
    !role ||
    (role &&
      role !== CommunityRoleEnum.OWNER &&
      role !== CommunityRoleEnum.REVIEWER &&
      role !== CommunityRoleEnum.EDITOR)
  ) {
    return <></>
  }

  let numBox = 6

  if (isMobile) {
    numBox = 4
  }

  const rowHeight = 44

  const height = Math.ceil((categories.length + 1) / numBox) * rowHeight

  // target id will only be set if dragging from one dropzone to another.
  const onChange = async (sourceId: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(categories, sourceIndex, targetIndex)

    try {
      const { error } = await updateCategoryApi({
        id: categories[sourceIndex].id,
        name: categories[sourceIndex].name,
        position: targetIndex,
      })
      if (error) {
        toast.error(error)
        return
      }
      setCategories(nextState)
    } catch (error) {}
  }

  return (
    <Content>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id='items'
          boxesPerRow={numBox}
          rowHeight={rowHeight}
          style={{ height: height }}
        >
          {listCategory}
          <GridItem draggable={false} key={'add new'}>
            <AddCategory />
          </GridItem>
        </GridDropZone>
      </GridContextProvider>
    </Content>
  )
}

export default Category
