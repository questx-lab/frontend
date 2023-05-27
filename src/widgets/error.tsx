import NextError from 'next/error'

import { Layout } from '@/components/layout'

export default function ErrorPage() {
  return (
    <Layout>
      <header>
        <title>{'Page Not Found'}</title>
      </header>
      <NextError statusCode={404} />
    </Layout>
  )
}
