import { FC } from 'react'

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
