import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const TypeButtonFrame = tw.div`
  flex
  flex-wrap
  justify-start
  items-center
  w-full
`

const TypeButton = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      py-2
      px-3
      bg-primary-100
      border-solid
      border-[1px]
      border-primary-100
      rounded-lg
      cursor-pointer
      mr-2
      mt-2
      text-sm
      text-primary-500
      font-medium
    `
  }

  return tw`
    py-2
    px-3
    border-solid
    border-[1px]
    border-gray-200
    rounded-lg
    bg-white
    cursor-pointer
    mr-2
    mt-2
    text-sm
    text-black
    font-medium
  `
})

const TypesSelection: FunctionComponent<{
  list: any[]
  onClick: (item: any, index: number) => void
  itemView: (item: any, index?: number) => ReactNode
  activeFunc: (item: any, index: number) => boolean
}> = ({ list, onClick, itemView, activeFunc }) => {
  return (
    <TypeButtonFrame>
      {list.map((item, index) => {
        return (
          <TypeButton
            active={activeFunc(item, index)}
            key={index}
            onClick={() => {
              onClick(item, index)
            }}
          >
            {itemView(item, index)}
          </TypeButton>
        )
      })}
    </TypeButtonFrame>
  )
}

export default TypesSelection
