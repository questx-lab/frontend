import { getCommunityApi } from '@/app/api/client/communitiy'
import { ControlPanel } from '@/modules/community/control-panel'
import { CommunityType } from '@/utils/type'
import { json, Params, useLoaderData } from 'react-router-dom'

export const Loader = async (args: { params: Params }) => {
  const communityResult = await getCommunityApi(args.params['communityId'] || '')
  if (communityResult.code === 0) {
    return json(
      {
        community: communityResult.data?.community,
      },
      { status: 200 }
    )
  }

  return {}
}

export const Community = () => {
  let data = useLoaderData() as {
    community: CommunityType
  }
  console.log('community = ', data.community)

  if (!data.community) {
    return <>Failed to load community data</>
  }

  return (
    <>
      <ControlPanel communityId={data.community.id} />
    </>
  )
}
