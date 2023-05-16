'use client'

import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import UserProfile from '@/modules/users/profile'
import { Wrap } from '@/styles/user.style'

const ContentProjectBox = tw.div`
  flex
  flex-col
  justify-between
`

const ProjectBoxWrap = tw.div`
  cursor-pointer
  p-5
  border
  rounded-lg
  border
  border-solid
  border-gray-300
  flex
  flex-col
  justify-between
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
  h-[350px]
  hover:shadow-lg
`

const TitleProjectBox = tw.p`
  mt-3
  text-black
  font-medium
  text-lg
  max-lg:text-lg
`

const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

export default function User({ params }: { params: { userId: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Profile'}</title>
      </header>
      <Wrap className='w-full'>
        <UserProfile userId={params.userId} />
      </Wrap>
    </Layout>
  )
}
