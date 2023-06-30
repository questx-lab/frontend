import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { XMarkIcon } from '@heroicons/react/24/outline'

export const Image: FC<{
  height?: number
  width?: number
  src?: string
  alt?: string
  className?: string
  onClick?: (e: any) => void
}> = ({ width, height, src, alt, className, onClick }) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onClick={onClick}
    />
  )
}

export const CloseIcon = styled(XMarkIcon)(
  () => tw`
  w-6
  h-6
  cursor-pointer
`
)
