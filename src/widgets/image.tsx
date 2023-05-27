import { FunctionComponent } from 'react'

export const Image: FunctionComponent<{
  height?: number
  width?: number
  src?: string
  alt?: string
  onClick?: (e: any) => void
}> = ({ width, height, src, alt, onClick }) => {
  return <img src={src} width={width} height={height} alt={alt} onClick={onClick} />
}
