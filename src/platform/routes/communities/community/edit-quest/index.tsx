import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router'

import { communityRoute } from '@/constants/router.const'
import { CreateOrEditQuest } from '@/modules/create-quest'
import CommunityStore from '@/store/local/community'

const Index: FunctionComponent = () => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // hook
  const navigate = useNavigate()

  return (
    <CreateOrEditQuest
      onQuestCreated={() => {
        navigate(communityRoute(community.handle))
      }}
      isEdit={true}
    ></CreateOrEditQuest>
  )
}

export default Index
