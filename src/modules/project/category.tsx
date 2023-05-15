import { FunctionComponent, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { createCategoryApi, getCategoriesApi } from '@/app/api/client/project'
import { CommunityStore } from '@/store/local/community.store'
import { Menu } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

// Css in js
const Main = tw.div`
  w-full
  flex
  flex-wrap
  gap-2
  pt-3
  pb-6
`

const Box = tw.div`
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

const MenuItem = styled(Menu.Items)<{ isshow: boolean }>(({ isshow }) => [
  isshow
    ? tw`
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
`
    : tw`hidden`,
])

const ListBox = tw.div`
  p-2
  w-full
  flex
  flex-row
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

const AddBtn = styled.button<{ block?: boolean }>(({ block = true }) => [
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
  const project = CommunityStore.useStoreState((state) => state.project)
  const categories = CommunityStore.useStoreState((state) => state.categories)

  // action
  const setCategories = CommunityStore.useStoreActions(
    (action) => action.setCategories
  )

  // hook
  const [name, setName] = useState<string>('')
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    fetchCategory()
  }, [])

  // handler
  const listCategory =
    categories && categories.map((e) => <Box key={e.id}>{e.name}</Box>)

  const addCategory = async () => {
    try {
      const rs = await createCategoryApi(project.id, name)
      if (rs.error) {
        toast.error(rs.error)
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
      const rs = await getCategoriesApi(project.id)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        if (rs.data?.categories) {
          setCategories(rs.data?.categories)
        }
      }
    } catch (error) {}
  }

  return (
    <Main>
      {listCategory}
      <Menu as='div' className='relative inline-block bg-gray-100 rounded-lg'>
        <MenuButton onClick={() => setShowMenu(true)}>
          <PlusIcon className='w-5 h-5' />
        </MenuButton>
        <MenuItem isshow={showMenu}>
          <ListBox>
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
            <AddBtn
              disabled={name === ''}
              block={name === ''}
              onClick={addCategory}
            >
              {'Add'}
            </AddBtn>
          </ListBox>
        </MenuItem>
      </Menu>
    </Main>
  )
}

export default Category
