import { FunctionComponent } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import CommunityBox from '@/modules/community/community-box'
import { CommunityType } from '@/utils/type'
import { VerticalFullWidthCenter } from '@/widgets/orientation'

const CommunitiesGrid = tw.div`
  grid
  gap-4
  xl:grid-cols-3
  sm:grid-cols-2
  max-sm:grid-cols-1
  w-full
`

export const List: FunctionComponent<{ communities: CommunityType[]; loading: boolean }> = ({
  communities,
  loading,
}) => {
  if (loading) {
    return (
      <VerticalFullWidthCenter>
        <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
      </VerticalFullWidthCenter>
    )
  }

  if (communities.length === 0) {
    return <></>
  }

  return (
    <CommunitiesGrid>
      {communities.map((community) => {
        return <CommunityBox key={community.handle} community={community} />
      })}
    </CommunitiesGrid>
  )
}
