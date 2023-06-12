import { FunctionComponent, ReactNode } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { SizeEnum } from '@/constants/common.const'
import { GlobalStoreModel } from '@/store/store'

export enum ButtonTypeEnum {
  NEGATIVE,
  POSITVE,
  DANGEROUS,
  DANGEROUS_BORDER,
  WARNING,
  SUCCESS,
  SUCCESS_BORDER,
}

const BaseStyle = styled.button<{
  isFull?: boolean
  width?: number
  block?: boolean
  buttonType?: ButtonTypeEnum
}>(({ isFull = false, width, block = false, buttonType = ButtonTypeEnum.NEGATIVE }) => {
  const style = [
    tw`
      text-sm
      text-white
      font-medium
      py-2
      px-6
      rounded-lg
      flex
      justify-center
      items-center
      outline-0
      gap-2
    `,
  ]

  if (isFull) {
    style.push(tw`w-full`)
  }

  if (block) {
    // disabled
    switch (buttonType) {
      case ButtonTypeEnum.NEGATIVE:
        style.push(
          tw`hover:cursor-not-allowed  hover:bg-gray-50 bg-gray-50 border-gray-200 text-gray-300`
        )
        break
      case ButtonTypeEnum.POSITVE:
        style.push(tw`
          bg-primary-300
          hover:cursor-not-allowed
        `)
        break
      case ButtonTypeEnum.DANGEROUS:
        style.push(tw`
          bg-danger-300
          hover:cursor-not-allowed
        `)
        break
      case ButtonTypeEnum.WARNING:
        style.push(tw`
            bg-warning-50
            hover:cursor-not-allowed
          `)
        break
    }
  } else {
    // enabled
    switch (buttonType) {
      case ButtonTypeEnum.NEGATIVE:
        style.push(tw`
        text-gray-900
        border
        border-gray-300
        hover:bg-gray-50
      `)
        break
      case ButtonTypeEnum.POSITVE:
        style.push(tw`
          bg-primary
          hover:bg-primary-300
        `)
        break
      case ButtonTypeEnum.DANGEROUS:
        style.push(tw`
          bg-danger-700
          hover:bg-danger-500
        `)
        break
      case ButtonTypeEnum.WARNING:
        style.push(tw`
            bg-warning-50
            hover:bg-warning-100
            text-warning
          `)
        break
      case ButtonTypeEnum.SUCCESS_BORDER:
        style.push(tw`
              bg-success-50
              hover:bg-success-100
              text-success
              border
              border-solid
              border-success
            `)
        break
      case ButtonTypeEnum.DANGEROUS_BORDER:
        style.push(tw`
                bg-danger-50
                hover:bg-danger-100
                text-danger
                border
                border-solid
                border-danger
              `)
        break
    }
  }

  switch (width) {
    case SizeEnum.x32:
      style.push(tw`w-32`)
      break
    case SizeEnum.x48:
      style.push(tw`w-48`)
      break
    case SizeEnum.x64:
      style.push(tw`w-64`)
      break
    case SizeEnum.x96:
      style.push(tw`w-96`)
      break
  }

  return style
})

export const Button: FunctionComponent<{
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  block?: boolean
  isFull?: boolean
  width?: number
  requireLogin?: boolean
  type: ButtonTypeEnum
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
  width,
  requireLogin = false,
  type,
}) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const setShowLoginModel = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  if (requireLogin && user === undefined) {
    return (
      <BaseStyle
        isFull={isFull}
        disabled={block}
        block={block}
        onClick={() => setShowLoginModel(true)}
        width={width}
        buttonType={type}
      >
        {children}
      </BaseStyle>
    )
  }

  if (loading) {
    return (
      <BaseStyle isFull={isFull} width={width} buttonType={type}>
        <MoonLoader color='hsla(168, 0%, 100%, 1)' loading speedMultiplier={0.8} size={20} />
      </BaseStyle>
    )
  }

  return (
    <BaseStyle
      block={block || undefined}
      width={width}
      isFull={isFull || undefined}
      disabled={block}
      onClick={onClick}
      buttonType={type}
    >
      {children}
    </BaseStyle>
  )
}

export const PositiveButton: FunctionComponent<{
  loading?: boolean
  children: ReactNode | ReactNode[]
  onClick?: () => void
  block?: boolean
  isFull?: boolean
  width?: number
  requireLogin?: boolean
  type?: number
}> = ({
  loading = false,
  children,
  onClick = () => {},
  block = false,
  isFull = false,
  width,
  requireLogin = false,
  type = ButtonTypeEnum.POSITVE,
}) => {
  return (
    <Button
      block={block}
      width={width}
      isFull={isFull || undefined}
      onClick={onClick}
      requireLogin={requireLogin}
      loading={loading}
      type={type}
    >
      {children}
    </Button>
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
  return (
    <Button
      block={block}
      width={width}
      isFull={isFull || undefined}
      onClick={onClick}
      requireLogin={requireLogin}
      loading={loading}
      type={ButtonTypeEnum.NEGATIVE}
    >
      {children}
    </Button>
  )
}

export const DangerButton: FunctionComponent<{
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
  return (
    <Button
      block={block}
      width={width}
      isFull={isFull || undefined}
      onClick={onClick}
      requireLogin={requireLogin}
      loading={loading}
      type={ButtonTypeEnum.DANGEROUS}
    >
      {children}
    </Button>
  )
}
