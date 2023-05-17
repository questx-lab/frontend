'use client'

import { Layout } from '@/components/layout'
import UserProfile from '@/modules/users/profile'
import { Wrap } from '@/styles/user.style'

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
