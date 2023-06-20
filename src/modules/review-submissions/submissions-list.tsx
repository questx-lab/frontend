import { FC, ReactNode } from 'react'

import { FixedSizeList as List } from 'react-window'
import tw from 'twin.macro'

const NothingBox = tw.div`
  flex
  justify-center
  items-center
  w-full
  h-full
  min-h-[270px]
`

export const SubmissionsList: FC<{
  list: any[]
  itemView: (item: any, index: number) => ReactNode
}> = ({ list, itemView }) => {
  if (list.length === 0) {
    return <NothingBox>{'No item found'}</NothingBox>
  }

  return (
    <List height={700} itemCount={list.length} itemSize={120} width={'100%'}>
      {({ index }) => {
        return <>{itemView(list[index], index)}</>
      }}
    </List>
  )
}
