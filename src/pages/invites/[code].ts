import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getInviteApi } from '@/app/api/client/community'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params || {}
  const code = params.code
  try {
    const resp = await getInviteApi(code as string)

    if (resp.error) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const communityId = resp.data?.community.id
    const userId = resp.data?.user.id
    return {
      redirect: {
        permanent: false,
        destination: `/communities/projects/${communityId}?invited_by=${userId}`,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return repo.stargazers_count
}
