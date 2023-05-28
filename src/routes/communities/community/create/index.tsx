import { RouterConst } from '@/constants/router.const'
import { CreateQuest } from '@/modules/create-quest'
import { CommunityStore } from '@/store/local/community'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

export const Index: FunctionComponent = () => {
  const navigate = useNavigate()
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  if (!selectedCommunity) {
    navigate(RouterConst.COMMUNITIES)
    return <></>
  }

  return (
    <CreateQuest communityId={selectedCommunity.id} community={selectedCommunity}></CreateQuest>
  )
}