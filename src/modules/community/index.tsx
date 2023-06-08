import { FunctionComponent, useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import tw from 'twin.macro'

import CommunityCollab from '@/modules/community/community-view/community-collab'
import CommunityGuestOrAnonymous from '@/modules/community/community-view/guest-or-anonymous'
import InviteModal from '@/modules/community/invitte-modal'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { Horizontal } from '@/widgets/orientation'

const OuterBoxPadding = tw(Horizontal)`
  w-full
  justify-center
  px-8
`

const CommunityContent: FunctionComponent = () => {
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  if (canEdit) {
    return <CommunityCollab />
  }

  return <CommunityGuestOrAnonymous />
}

export const Index: FunctionComponent = () => {
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
      <InviteModal inviteCode={query.get('invitation') || ''} />
    </OuterBoxPadding>
  )
}
