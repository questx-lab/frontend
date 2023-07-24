import styled from 'styled-components'
import tw from 'twin.macro'

export const Tab = styled.div<{ active?: boolean }>(({ active = false }) => {
  const styles = [
    tw`
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
    text-sm
    font-medium
    gap-2
  `,
  ]

  if (active) {
    styles.push(tw`
    bg-primary-100
    text-primary-500
  `)
  } else {
    styles.push(tw`
    bg-white
    text-gray-700
    `)
  }

  return styles
})
