import styled from 'styled-components'
import tw from 'twin.macro'

export const Tab = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      bg-primary-100
      px-3
      py-2
      flex
      flex-row
      justify-start
      items-center
      rounded-lg
      hover:bg-primary-50
      cursor-pointer
      my-2
      text-xs
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
        hover:bg-primary-50
        cursor-pointer
        my-2
        text-xs
        font-medium
        text-gray-700
      `
})
