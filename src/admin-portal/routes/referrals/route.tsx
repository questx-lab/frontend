import { FC, useEffect } from 'react'

import { json, Outlet, useLoaderData } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { getReferralApi } from '@/api/communitiy'
import AdminPortalStore from '@/store/local/admin-portal'
import { ReferralType } from '@/types/community'

export const Loader = async () => {
  const referralResult = await getReferralApi()
  if (referralResult.code === 0 && referralResult.data) {
    return json(
      {
        referrals: referralResult.data.referrals,
      },
      { status: 200 }
    )
  }
  return {}
}

const Referrals: FC = () => {
  let data = useLoaderData() as {
    referrals: ReferralType[]
  }

  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)
  const setReferrals = AdminPortalStore.useStoreActions((action) => action.setReferrals)

  useEffect(() => {
    setTab(ControlPanelTab.REFERRALS)
    console.log('referrals', data.referrals)
    if (data.referrals) {
      setReferrals(data.referrals)
    }
  }, [data.referrals])

  return <Outlet />
}

export default Referrals
