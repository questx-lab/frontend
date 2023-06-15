import Community from '@/admin-portal/modules/communities'
import AdminCommunityStore from '@/store/local/admin-community'

export default function Index() {
  return (
    <AdminCommunityStore.Provider>
      <Community />
    </AdminCommunityStore.Provider>
  )
}
