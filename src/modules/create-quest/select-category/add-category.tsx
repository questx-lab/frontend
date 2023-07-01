import { FC, useState } from 'react'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { createCategoryApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { InputBox } from '@/widgets/form'
import { Horizontal } from '@/widgets/orientation'
import { Menu } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

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
    origin-top-left
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

const Input = tw(InputBox)`
  !p-[6px]
`

const GapHorizontal = tw(Horizontal)`
  p-2
  w-full
  gap-3
`

const AddCategoryButton = styled.button<{ block?: boolean }>(({ block = true }) => {
  const styles = [
    tw`
      py-2
      px-4
      text-sm
      font-medium
      rounded-lg
      text-white
    `,
  ]
  if (block) {
    styles.push(tw`
      bg-primary-300
    `)
  } else {
    styles.push(tw`
      bg-primary
    `)
  }

  return styles
})

const AddCategory: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  // data
  const categories = CommunityStore.useStoreState((state) => state.categories)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setCategories = CommunityStore.useStoreActions((action) => action.setCategories)

  const addCategory = async () => {
    try {
      const result = await createCategoryApi(selectedCommunity.handle, name)

      if (result.error) {
        toast.error(result.error)
      }
      if (result.data && result.data.category) {
        setCategories([...categories, result.data.category])
      }

      setShowMenu(false)
    } catch (error) {
      toast.error('Server error')
    }
  }

  return (
    <Menu as='div' className='relative inline-block bg-gray-100 rounded-lg z-10'>
      <Tooltip content={'New category'} placement='top'>
        <MenuButton
          onClick={() => {
            setShowMenu(true)
            setName('')
          }}
        >
          <PlusIcon className='w-5 h-5' />
        </MenuButton>
      </Tooltip>

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
  )
}

export default AddCategory
