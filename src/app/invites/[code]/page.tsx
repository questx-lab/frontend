import type { GetServerSideProps } from 'next'
import { getInviteApi } from '@/app/api/client/community'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context?.params?.code as string
  const resp = await getInviteApi(code)
  const communityId = resp.data?.community.id
  const userId = resp.data?.user.id
  return {
    redirect: {
      permanent: false,
      destination: `/communities/projects/${communityId}?invited_by=${userId}`,
    },
  }
}
