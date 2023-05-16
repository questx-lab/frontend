'use client'

import { useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import ErrorPage from 'next/error'
import { MoonLoader } from 'react-spinners'

import { Layout } from '@/components/layout'
import UserSetting from '@/modules/users/setting'
import { GlobalStoreModel } from '@/store/store'
import { FullScreen } from '@/styles/common.style'
import { UserType } from '@/types/account.type'

export default function Setting({ params }: { params: { userId: string } }) {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (user && user.id) {
      // Check user permisison
      if (user.id !== params.userId) {
        setError(true)
      } else {
        setError(false)
      }
      setLoading(false)
    } else {
      setError(true)
    }
  }, [user])

  if (loading) {
    // If not permisison => return error page
    if (error) {
      return (
        <Layout>
          <header>
            <title>{'Page Not Found'}</title>
          </header>
          <ErrorPage statusCode={404} />
        </Layout>
      )
    }

    // Loading page
    return (
      <Layout>
        <header>
          <title>{'Profile'}</title>
        </header>
        <FullScreen>
          <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
        </FullScreen>
      </Layout>
    )
  }

  return (
    <Layout>
      <header>
        <title>{'Profile'}</title>
      </header>
      <UserSetting />
    </Layout>
  )
}
