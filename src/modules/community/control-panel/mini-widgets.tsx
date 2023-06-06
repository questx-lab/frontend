import styled from 'styled-components'
import tw from 'twin.macro'

export const Tab = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      bg-gray-200
      px-3
      py-2
      flex
      flex-row
      justify-start
      items-center
      rounded-lg
      hover:bg-gray-200
      cursor-pointer
      my-2
      text-sm
      font-medium
      text-primary-500
    `
  }

  return tw`
        px-3
        py-2
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-gray-200
        cursor-pointer
        my-2
        text-sm
        font-medium
        text-gray-700
      `
})
