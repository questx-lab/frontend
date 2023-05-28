import { NewQuestStore } from '@/store/local/new-quest.store'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

export const CreateQuest: FunctionComponent = () => {
  return (
    <NewQuestStore.Provider>
      <Outlet />
    </NewQuestStore.Provider>
  )
}
