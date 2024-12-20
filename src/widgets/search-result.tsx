import { FC, Fragment, ReactNode } from 'react'

import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { Horizontal, VerticalFullWidthCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { NormalText, Text2xl } from '@/widgets/text'

const StartVertical = tw(VerticalFullWidthCenter)`
  gap-3
`

const HorizotalStart = tw(Horizontal)`
  w-full
  gap-3
`

const SearchResult: FC<{
  query: string
  data: any[]
  loading?: boolean
  renderResult: ReactNode
  children: ReactNode
}> = ({ query, data, loading = false, renderResult, children }) => {
  if (loading) {
    return (
      <StartVertical>
        <HorizotalStart>
          <Text2xl>{'Results'}</Text2xl>
        </HorizotalStart>
        <SmallSpinner />
      </StartVertical>
    )
  }

  if (query !== '') {
    if (data.length === 0) {
      return (
        <StartVertical>
          <HorizotalStart>
            <Text2xl>{'Results'}</Text2xl>
          </HorizotalStart>
          <Image
            width={300}
            height={300}
            src={StorageConst.HUSKY.src}
            alt={StorageConst.HUSKY.alt}
          />
          <NormalText>{'No data found'}</NormalText>
        </StartVertical>
      )
    }

    return (
      <StartVertical>
        <HorizotalStart>
          <Text2xl>{'Results'}</Text2xl>
        </HorizotalStart>

        {renderResult}
      </StartVertical>
    )
  }

  return <Fragment>{children}</Fragment>
}

export default SearchResult
