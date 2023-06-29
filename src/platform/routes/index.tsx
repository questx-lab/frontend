import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import ViewQuest from '@/modules/quest/view-quest'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { emptyQuest } from '@/types/quest'
import BasicModal from '@/widgets/modal/basic'

const ActiveQuestModal: FC = () => {
  // data
  const activeQuest = ActiveQuestStore.useStoreState((state) => state.quest)

  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  if (activeQuest.id === '') {
    return <></>
  }

  const onCloseModal = () => {
    console.log('test')

    setActiveQuest(emptyQuest())
  }

  return (
    <BasicModal
      title={`${activeQuest.title}`}
      isOpen={activeQuest.id !== ''}
      onClose={onCloseModal}
    >
      <ViewQuest quest={activeQuest} />
    </BasicModal>
  )
}

export const HomePage: FC = () => {
  return (
    <CommunityStore.Provider>
      <NewQuestStore.Provider>
        <ActiveQuestStore.Provider>
          <Outlet />
          <ActiveQuestModal />
        </ActiveQuestStore.Provider>
      </NewQuestStore.Provider>
    </CommunityStore.Provider>
  )
}
