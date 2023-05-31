import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Item } from '@/modules/communities-navigation/item'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/utils/type'
import { Vertical } from '@/widgets/orientation'

const Wrap = styled.div<{ isAsside: boolean }>(({ isAsside }) => {
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

  if (!isAsside) {
    style.push(tw`max-sm:hidden fixed `)
  }

  return style
})

const BoxContent = tw(Vertical)`
  rounded-lg
  items-center
  py-3
  gap-2
`

const CommunityItems: FunctionComponent<{
  collaboration: CollaboratorType[]
}> = ({ collaboration }) => {
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const selectedId = selectedCommunity === undefined ? undefined : selectedCommunity.handle

  return (
    <BoxContent>
      {collaboration.map((community) => (
        <Item
          key={community.community.handle}
          collaboration={community}
          active={community.community.handle === selectedId}
        />
      ))}
    </BoxContent>
  )
}

export const CommunitiesNavigation: FunctionComponent<{ isAsside?: boolean }> = ({
  isAsside = false,
}) => {
  const communitiesCollab: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesCollab
  )

  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <></>
  }

  return (
    <Wrap isAsside={isAsside}>
      <CommunityItems collaboration={communitiesCollab} />
    </Wrap>
  )
}
