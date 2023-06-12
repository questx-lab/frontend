import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import AddCategory from '@/modules/create-quest/select-category/add-category'
import CommunityStore from '@/store/local/community'

const Content = tw.div`
  py-3
  w-full
  flex
  flex-wrap
  gap-2
`

const CategoryBox = tw.div`
  p-3
  text-sm
  font-medium
  text-black
  bg-gray-100
  rounded-lg
  cursor-pointer
`

const Category: FunctionComponent = () => {
  // data
  const categories = CommunityStore.useStoreState((state) => state.categories)

  // handler
  const listCategory =
    categories &&
    categories.map((category) => <CategoryBox key={category.id}>{category.name}</CategoryBox>)

  return (
    <Content>
      {listCategory}
      <AddCategory />
    </Content>
  )
}

export default Category