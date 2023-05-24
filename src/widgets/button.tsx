import { FunctionComponent, ReactNode } from 'react'

import { useStoreActions } from 'easy-peasy'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { SizeEnum } from '@/constants/common.const'
import { GlobalStoreModel } from '@/store/store'

const NegativeButtonStyle = styled.button<{
  isFull?: boolean
  width?: number
  block?: boolean
}>(({ isFull = false, width, block = false }) => [
  tw`
  bg-white
  hover:bg-gray-100
  text-lg
  text-gray-700
  font-medium
  py-3
  px-6
  rounded-lg
  border
  border-gray-300
  border-solid
  flex
  flex-row
  justify-center
  items-center
  gap-2
  3xl:text-3xl
  3xl:rounded-xl
  3xl:py-4
  3xl:px-12
  outline-0
`,
  block &&
    tw`hover:cursor-not-allowed  hover:bg-gray-50 bg-gray-50 border-gray-200 text-gray-300`,
  isFull && tw`w-full`,
  width === SizeEnum.x32 && tw`w-32`,
  width === SizeEnum.x48 && tw`w-48`,
  width === SizeEnum.x64 && tw`w-64`,
  width === SizeEnum.x96 && tw`w-96`,
])

const PositiveButtonStyle = styled.button<{
  block?: boolean
  isFull?: boolean
  width?: number
}>(({ block = false, isFull = false, width }) => [
  tw`
      text-lg
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      flex
      justify-center
      items-center
      outline-0
  `,
  width === SizeEnum.x32 && tw`w-32`,
  width === SizeEnum.x48 && tw`w-48`,
  width === SizeEnum.x64 && tw`w-64`,
  width === SizeEnum.x96 && tw`w-96`,
  !block &&
    tw`
      bg-primary
      hover:bg-primary-300
    `,
  block &&
    tw`
      bg-primary-300
      hover:cursor-not-allowed
    `,
  isFull && tw`w-full`,
])

export const PositiveButton: FunctionComponent<{
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  block?: boolean
  isFull?: boolean
  width?: number
  requireLogin?: boolean
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
  width,
  requireLogin = false,
}) => {
  const setShowLoginModel = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowLoginModal
  )

  if (requireLogin) {
    return (
      <PositiveButtonStyle
        isFull={isFull}
        disabled={block}
        block={block}
        onClick={() => setShowLoginModel(true)}
        width={width}
      >
        {children}
      </PositiveButtonStyle>
    )
  }

  if (loading) {
    return (
      <PositiveButtonStyle isFull={isFull} width={width}>
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
      width={width}
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
  width?: number
  requireLogin?: boolean
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
  width,
  requireLogin = false,
}) => {
  const setShowLoginModel = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowLoginModal
  )

  if (loading) {
    return (
      <NegativeButtonStyle block={block} width={width} isFull={isFull}>
        <MoonLoader color='#000' loading speedMultiplier={0.8} size={20} />
      </NegativeButtonStyle>
    )
  }

  if (requireLogin) {
    return (
      <NegativeButtonStyle
        block={block}
        width={width}
        isFull={isFull}
        disabled={block}
        onClick={() => setShowLoginModel(true)}
      >
        {children}
      </NegativeButtonStyle>
    )
  }

  return (
    <NegativeButtonStyle
      block={block}
      width={width}
      isFull={isFull}
      disabled={block}
      onClick={onClick}
    >
      {children}
    </NegativeButtonStyle>
  )
}
