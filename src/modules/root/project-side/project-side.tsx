import { Item } from '@/modules/root/project-side/item'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/utils/type'
import { Vertical } from '@/widgets/orientation'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

const Wrap = tw.div`
  w-20
  fixed
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  bg-gray-100
  h-screen
  divide-y
  divide-gray-300
  max-sm:hidden
`

const BoxContent = tw(Vertical)`
  rounded-lg
  items-center
  py-3
  gap-2
`

const CommunityItems: FunctionComponent<{
  collaborator: CollaboratorType[]
}> = ({ collaborator }) => {
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const selectedId = selectedCommunity === undefined ? undefined : selectedCommunity.id

  return (
    <BoxContent>
      {collaborator.map((community) => (
        <Item
          key={community.community_id}
          community={community}
          active={community.community_id === selectedId}
        />
      ))}
    </BoxContent>
  )
}

export const ProjectSide: FunctionComponent = () => {
  const projectCollab: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )

  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  console.log('projectCollab = ', projectCollab)

  if (!user) {
    return <></>
  }

  return (
    <Wrap>
      <CommunityItems collaborator={projectCollab} />
    </Wrap>
  )
}
