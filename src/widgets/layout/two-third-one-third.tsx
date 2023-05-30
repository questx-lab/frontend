import { HorizontalFullWidth } from '@/widgets/orientation'
import { FunctionComponent, ReactNode } from 'react'
import tw from 'twin.macro'

const LeftChild = tw.div`
  w-2/3
`

const RightChild = tw.div`
  w-1/3
`

/**
 * This layout divides current view into 2 column, one takes 2/3 width and the other takes 1/3 width
 */
const TwoThirdOneThirdLayout: FunctionComponent<{
  leftChild: ReactNode
  rightChild: ReactNode
}> = ({ leftChild, rightChild }) => {
  return (
    <HorizontalFullWidth>
      <LeftChild>{leftChild}</LeftChild>
      <RightChild>{rightChild}</RightChild>
    </HorizontalFullWidth>
  )
}

export default TwoThirdOneThirdLayout
