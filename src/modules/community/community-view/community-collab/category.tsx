import { FunctionComponent, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { createCategoryApi, getCategoriesApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { Horizontal } from '@/widgets/orientation'
import { Menu } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

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

const MenuButton = styled(Menu.Button)(tw`
  p-3
  text-sm
  font-medium
  text-black
  cursor-pointer
`)

const MenuItem = styled(Menu.Items)<{ isshow: boolean }>(({ isshow }) => {
  const styles = []
  if (isshow) {
    styles.push(tw`
    absolute
    left-0
    mt-2
    w-72
    origin-top-right
    divide-y
    divide-gray-100
    rounded-md
    bg-white
    shadow-lg
    ring-1
    ring-black
    ring-opacity-5
    focus:outline-none
  `)
  } else {
    styles.push(tw`hidden`)
  }

  return styles
})

const GapHorizontal = tw(Horizontal)`
  p-2
  w-full
  gap-3
`

const Input = tw.input`
  py-2
  px-4
  text-sm
  font-normal
  text-black
  border
  border-solid
  border-gray-200
  rounded-lg
  w-full
  outline-primary

`

const AddCategoryButton = styled.button<{ block?: boolean }>(({ block = true }) => [
  block
    ? tw`
  py-2
  px-4
  bg-primary-300
  text-sm
  font-medium
  text-white
  rounded-lg
`
    : tw`
  py-2
  px-4
  bg-primary
  text-sm
  font-medium
  text-white
  rounded-lg
`,
])

const Category: FunctionComponent = () => {
  // data
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const categories = CommunityStore.useStoreState((state) => state.categories)

  // action
  const setCategories = CommunityStore.useStoreActions((action) => action.setCategories)

  // hook
  const [name, setName] = useState<string>('')
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    fetchCategory()
  }, [selectedCommunity])

  // handler
  const listCategory =
    categories &&
    categories.map((category) => <CategoryBox key={category.id}>{category.name}</CategoryBox>)

  const addCategory = async () => {
    try {
      const result = await createCategoryApi(selectedCommunity.handle, name)
      if (result.error) {
        toast.error(result.error)
      } else {
        fetchCategory()
      }
      setShowMenu(false)
    } catch (error) {
      toast.error('Server error')
    }
  }

  const fetchCategory = async () => {
    try {
      const result = await getCategoriesApi(selectedCommunity.handle)
      if (result.error) {
        toast.error(result.error)
      }

      if (result.data && result.data?.categories) {
        setCategories(result.data?.categories)
      }
    } catch (error) {}
  }

  return (
    <Content>
      {listCategory}
      <Menu as='div' className='relative inline-block bg-gray-100 rounded-lg'>
        <MenuButton onClick={() => setShowMenu(true)}>
          <PlusIcon className='w-5 h-5' />
        </MenuButton>
        <MenuItem isshow={showMenu}>
          <GapHorizontal>
            <Input
              value={name}
              onKeyDown={(e) => {
                if (e.code === 'Space') {
                  e.preventDefault()
                  setName(name + ' ')
                }
              }}
              onChange={(e) => {
                setName(e.target.value)
              }}
              placeholder='Category name'
            />
            <AddCategoryButton disabled={name === ''} block={name === ''} onClick={addCategory}>
              {'Add'}
            </AddCategoryButton>
          </GapHorizontal>
        </MenuItem>
      </Menu>
    </Content>
  )
}

export default Category
