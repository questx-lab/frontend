import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { CommunityRoleEnum } from '@/constants/common.const'
import FollowItem, { Item } from '@/modules/community/communities-navigation/item'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { Vertical } from '@/widgets/orientation'

const Wrap = styled.div<{ isDrawer: boolean; hasEvent: boolean }>(({ isDrawer, hasEvent }) => {
  const style = [
    tw`
    w-20
    flex
    flex-col
    justify-start
    items-center
    bg-gray-100
    divide-y
    divide-gray-300
    h-full
  `,
  ]

  if (!isDrawer) {
    style.push(tw`max-sm:hidden fixed `)
  }

  if (hasEvent) {
    style.push(tw`mt-[48px]`)
  }

  return style
})

const BoxContent = tw(Vertical)`
  rounded-lg
  items-center
  py-3
  gap-3
`

const CommunityItems: FC<{
  communities: CommunityType[]
}> = ({ communities }) => {
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const selectedId = selectedCommunity === undefined ? undefined : selectedCommunity.handle

  return (
    <BoxContent>
      {communities.map((community) => (
        <Item
          key={community.handle}
          community={community}
          active={community.handle === selectedId}
        />
      ))}
    </BoxContent>
  )
}

const CommunityFollowItems: FC<{
  followCommunities: FollowCommunityType[]
}> = ({ followCommunities }) => {
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const selectedId = selectedCommunity === undefined ? undefined : selectedCommunity.handle

  return (
    <BoxContent>
      {followCommunities
        // Get communities wasn't owner role
        .filter((follow) => !follow.role.some((element) => element.id === CommunityRoleEnum.OWNER))
        .map((follow, idx) => (
          <FollowItem
            key={idx}
            community={follow.community}
            active={follow.community.handle === selectedId}
          />
        ))}
    </BoxContent>
  )
}

const CommunitiesNavigation: FC<{ isDrawer?: boolean }> = ({ isDrawer = false }) => {
  const hasEvent = useStoreState<GlobalStoreModel>((state) => state.hasEvent)
  const myCommunities: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.myCommunities
  )

  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )

  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <></>
  }

  return (
    <Wrap isDrawer={isDrawer} hasEvent={hasEvent}>
      <CommunityItems communities={myCommunities} />
      <CommunityFollowItems followCommunities={communitiesFollowing} />
    </Wrap>
  )
}

export default CommunitiesNavigation
