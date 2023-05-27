import { FunctionComponent, ReactNode } from 'react'
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

export const SubmissionsList: FunctionComponent<{
  list: any[]
  itemView: (item: any, index: number) => ReactNode
}> = ({ list, itemView }) => {
  if (list.length === 0) {
    return <NothingBox>{'Nothing quest claimed'}</NothingBox>
  }

  return (
    <List height={600} itemCount={list.length} itemSize={120} width={'100%'}>
      {({ index }) => {
        return <>{itemView(list[index], index)}</>
      }}
    </List>
  )
}
