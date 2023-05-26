import ErrorPage from 'next/error'

import { Layout } from '@/components/layout'

export default function ErrorP() {
  return (
    <Layout>
      <header>
        <title>{'Page Not Found'}</title>
      </header>
      <ErrorPage statusCode={404} />
    </Layout>
  )
}
