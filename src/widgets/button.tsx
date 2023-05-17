import { FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

const NegativeButtonStyle = styled.button<{
  isFull?: boolean
}>(({ isFull = false }) => [
  tw`
  bg-white
  hover:bg-gray-100
  text-sm
  text-black
  font-medium
  py-3
  px-6
  rounded-lg
  max-lg:hidden
  border
  border-gray-300
  border-solid
  flex
  flex-row
  justify-center
  items-center
  gap-2
`,
  isFull && tw`w-full`,
])

const PositiveButtonStyle = styled.button<{
  block?: boolean
  isFull?: boolean
}>(({ block = false, isFull = false }) => [
  !block &&
    tw`
      bg-primary
      hover:bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
      flex
      justify-center
      items-center
    `,
  block &&
    tw`
      bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
      flex
      justify-center
      items-center
    `,
  isFull && tw`w-full`,
])

export const PositiveButton: FunctionComponent<{
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  block?: boolean
  isFull?: boolean
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
}) => {
  if (loading) {
    return (
      <PositiveButtonStyle isFull={isFull}>
        <MoonLoader
          color='hsla(168, 0%, 100%, 1)'
          loading
          speedMultiplier={0.8}
          size={20}
        />
      </PositiveButtonStyle>
    )
  }

  return (
    <PositiveButtonStyle
      isFull={isFull}
      disabled={block}
      block={block}
      onClick={onClick}
    >
      {children}
    </PositiveButtonStyle>
  )
}

export const NegativeButton: FunctionComponent<{
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  block?: boolean
  isFull?: boolean
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
}) => {
  if (loading) {
    return (
      <NegativeButtonStyle isFull={isFull}>
        <MoonLoader color='#000' loading speedMultiplier={0.8} size={20} />
      </NegativeButtonStyle>
    )
  }

  return (
    <NegativeButtonStyle isFull={isFull} disabled={block} onClick={onClick}>
      {children}
    </NegativeButtonStyle>
  )
}
