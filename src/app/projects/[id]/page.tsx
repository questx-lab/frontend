'use client'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import Project from '@/modules/project'

export default function ProjectPage(props: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useSearchParams()
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      {!loading && <Project />}
      {loading && <Spinner />}
    </Layout>
  )
}
