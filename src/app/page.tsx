'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Layout } from '@/components/layout'
import { RouterConst } from '@/constants/router.const'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push(RouterConst.COMMUNITIES)
  }, [])

  return (
    <Layout>
      <header>
        <title>{'Home Page'}</title>
      </header>
      {/* {!loading && <Project />} */}
    </Layout>
  )
}
