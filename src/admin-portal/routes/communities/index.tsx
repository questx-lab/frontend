import { FC } from 'react'
import Community from '@/admin-portal/modules/communities'
import AdminCommunityStore from '@/store/local/admin-community'

const Index: FC = () => {
  return (
    <AdminCommunityStore.Provider>
      <Community />
    </AdminCommunityStore.Provider>
  )
}

export default Index
