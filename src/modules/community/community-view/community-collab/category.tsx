import { FC } from 'react'

import tw from 'twin.macro'

import { CommunityRoleEnum } from '@/constants/common.const'
import AddCategory from '@/modules/create-quest/select-category/add-category'
import CommunityStore from '@/store/local/community'

const Content = tw.div`
  w-full
  flex
  flex-wrap
  gap-2
`

const CategoryBox = tw.div`
  p-2
  text-sm
  font-medium
  text-black
  bg-gray-100
  rounded-lg
  cursor-pointer
`

const Category: FC = () => {
  // data
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const role = CommunityStore.useStoreState((state) => state.role)

  // handler
  const listCategory =
    categories &&
    categories.map((category) => <CategoryBox key={category.id}>{category.name}</CategoryBox>)

  if (!role) {
    return <></>
  }

  if (
    !role ||
    (role &&
      role !== CommunityRoleEnum.OWNER &&
      role !== CommunityRoleEnum.REVIEWER &&
      role !== CommunityRoleEnum.EDITOR)
  ) {
    return <></>
  }

  return (
    <Content>
      {listCategory}
      <AddCategory />
    </Content>
  )
}

export default Category
