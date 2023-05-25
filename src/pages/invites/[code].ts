import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getInviteApi } from '@/app/api/client/community'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context?.params?.code as string
  try {
    const resp = await getInviteApi(code)
    console.log(resp)

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
