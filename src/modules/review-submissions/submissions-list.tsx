import { FC, ReactNode } from 'react'

import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import tw from 'twin.macro'

import { SmallSpinner } from '@/widgets/spinner'

const NothingBox = tw.div`
  flex
  justify-center
  items-center
  w-full
  h-full
  min-h-[270px]
`

const FixedHeight = tw.div`h-[calc(100vh_-_300px)]`
export const SubmissionsList: FC<{
  list: any[]
  itemView: (item: any, index: number) => ReactNode
  hasNextPage?: boolean
  isNextPageLoading?: boolean
  loadNextPage: (a: number, b: number) => void
}> = ({ list, itemView, hasNextPage, isNextPageLoading, loadNextPage }) => {
  if (list.length === 0) {
    return <NothingBox>{'No item found'}</NothingBox>
  }

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  const itemCount = hasNextPage ? list.length + 1 : list.length
  const isItemLoaded = (index: number) => !hasNextPage || index < list.length

  return (
    <FixedHeight>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                onItemsRendered={onItemsRendered}
                height={height}
                itemCount={itemCount}
                itemSize={300}
                width={width}
              >
                {({ index, style }) => {
                  if (!isItemLoaded(index)) {
                    return (
                      <div style={style}>
                        <SmallSpinner />
                      </div>
                    )
                  }
                  return <div style={style}>{itemView(list[index], index)}</div>
                }}
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </FixedHeight>
  )
}
