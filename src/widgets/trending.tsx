import { Fragment, FunctionComponent, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { MainContent } from '@/widgets/layout/layout-with-left-panel'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'

import { SmallSpinner } from './spinner'

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

const ListItems: FunctionComponent<{ loading: boolean; children: ReactNode }> = ({
  loading,
  children,
}) => {
  if (loading) {
    return <SmallSpinner />
  }

  return <Fragment>{children}</Fragment>
}

const Trending: FunctionComponent<{
  title: string
  loading: boolean
  children: ReactNode
}> = ({ title, loading, children }) => {
  return (
    <Content>
      <TopLabel title={title} />
      <ListItems loading={loading}>{children}</ListItems>
    </Content>
  )
}

export default Trending