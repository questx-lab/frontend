import { FunctionComponent, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import SearchResult from '@/widgets/search-result'
import { Large3xlText } from '@/widgets/text'

const TitleBox = tw(HorizontalStartCenter)`
  py-6
  w-full
  gap-3
`

const Content = tw(MainContent)`
  gap-6
  flex
  flex-col
  py-6
`

const TopLabel: FunctionComponent<{ title: string }> = ({ title }) => {
  const navigate = useNavigate()

  return (
    <>
      <TitleBox>
        <Image
          className='cursor-pointer'
          onClick={() => navigate('../')}
          width={35}
          height={35}
          src={StorageConst.ARROW_BACK_ICON.src}
          alt={StorageConst.ARROW_BACK_ICON.alt}
        />
        <Large3xlText>{title}</Large3xlText>
      </TitleBox>
    </>
  )
}

const Trending: FunctionComponent<{
  title: string
  hint: string
  onChange: (query: string) => void
  data: any[]
  query: string
  result: ReactNode
  loading: boolean
  children: ReactNode
}> = ({ title, hint, onChange, data, query, result, loading, children }) => {
  return (
    <Content>
      <TopLabel title={title} />
      <SearchInput hint={hint} onChanged={onChange} />
      <SearchResult loading={loading} query={query} data={data} renderResult={result}>
        {children}
      </SearchResult>
    </Content>
  )
}

export default Trending
