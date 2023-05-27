import { FunctionComponent } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Image } from '@/widgets/image'

const CircualrImageStyle = styled(Image)(tw`
  rounded-full
  cursor-pointer
`)

export const CircularImage: FunctionComponent<{
  width?: number
  height?: number
  src?: string
  alt?: string
  onClick?: (e: any) => void
}> = ({ width, height, src, alt, onClick }) => {
  return <CircualrImageStyle width={width} height={height} src={src} alt={alt} onClick={onClick} />
}
