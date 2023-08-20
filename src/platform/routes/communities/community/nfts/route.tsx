import { FC, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'
import { Spinner } from '@/widgets/spinner'

const NFTs: FC = () => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  const navigate = useNavigate()
  useEffect(() => {
    if (!canEdit) {
      navigate(RouterConst.COMMUNITIES)
      return
    }

    setActiveControlPanelTab(ControlPanelTab.NFTS)
  }, [setActiveControlPanelTab, user, canEdit, navigate])

  if (!canEdit) {
    return <Spinner />
  }

  return <Outlet />
}

export default NFTs
