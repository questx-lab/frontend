import { FunctionComponent, useEffect } from 'react'

import tw from 'twin.macro'

import CommunityCollab from '@/modules/community/community-view/community-collab'
import CommunityGuestOrAnonymous from '@/modules/community/community-view/community-guest-or-anonymous'
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

  // action
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.QUESTS)
  }, [setActiveControlPanelTab])

  if (!community) {
    return <></>
  }

  return (
    <OuterBoxPadding>
      <CommunityContent />
    </OuterBoxPadding>
  )
}
