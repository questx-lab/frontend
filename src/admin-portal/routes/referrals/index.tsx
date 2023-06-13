import Referral from '@/admin-portal/modules/referrals'
import AdminReferralStore from '@/store/local/admin-referral'

export default function Index() {
  return (
    <AdminReferralStore.Provider>
      <Referral />
    </AdminReferralStore.Provider>
  )
}
