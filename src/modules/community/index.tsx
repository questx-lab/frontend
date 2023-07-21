import { FC, useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import tw from 'twin.macro'

import CommunityGuestOrAnonymous from '@/modules/community/community-view/guest-or-anonymous'
import MyCommunities from '@/modules/community/community-view/my-communities'
import InviteModal from '@/modules/community/invite-modal'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { Horizontal } from '@/widgets/orientation'

const OuterBoxPadding = tw(Horizontal)`
  w-full
  justify-center
  max-sm:px-2
`

const CommunityContent: FC = () => {
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  if (canEdit) {
    return <MyCommunities />
  }

  return <CommunityGuestOrAnonymous />
}

const Index: FC = () => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const location = useLocation()

  // action
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )
  const query = new URLSearchParams(location.search)

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.QUESTS)
  }, [setActiveControlPanelTab])

  if (!community) {
    return <></>
  }

  return (
    <OuterBoxPadding>
      <CommunityContent />
      <InviteModal community={community} inviteCode={query.get('invitation') || ''} />
    </OuterBoxPadding>
  )
}

export default Index
