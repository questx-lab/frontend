import { FC, useEffect } from 'react'

import { json, Outlet, useLoaderData } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { getReferralApi } from '@/api/communitiy'
import AdminPortalStore from '@/store/admin/portal'
import AdminReferralStore from '@/store/admin/referral'
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

const OutletView: FC<{ referrals: ReferralType[] }> = ({ referrals }) => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)
  const setReferrals = AdminReferralStore.useStoreActions((action) => action.setReferrals)

  useEffect(() => {
    setTab(ControlPanelTab.REFERRALS)
    if (referrals) {
      setReferrals(referrals)
    }
  }, [referrals])

  return <Outlet />
}

const Referrals: FC = () => {
  let data = useLoaderData() as {
    referrals: ReferralType[]
  }

  return (
    <AdminReferralStore.Provider>
      <OutletView referrals={data.referrals} />
    </AdminReferralStore.Provider>
  )
}

export default Referrals
