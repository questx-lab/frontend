'use client'

import { FunctionComponent, useState } from 'react'

import parse from 'html-react-parser'

import { QuestCard } from '@/modules/project/quest-card'
import { QuestDetail } from '@/modules/quests/quest-detail'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { MDHead, ModalBox, ModalContent } from '@/styles/quest-review.style'
import { DesQ } from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'
import { BaseModal } from '@/widgets/modal'
import { XMarkIcon } from '@heroicons/react/20/solid'

const DescriptionBox: FunctionComponent<{ des?: string }> = ({ des }) => {
  if (!des || des === '') {
    return <></>
  }
  return <DesQ>{parse(des)}</DesQ>
}

export const QuestView: FunctionComponent<{
  quest: QuestType
}> = ({ quest }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const setQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  const onOpenModal = () => {
    setQuest(quest)
    setOpen(true)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <QuestCard
        quest={quest}
        isTemplate={false}
        manage={true}
        key={quest.id}
        onClick={onOpenModal}
      />

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <ModalContent className='w-2/3'>
            <MDHead>
              {`🎉 ${quest.title}`}
              <XMarkIcon
                className='w-7 h-7 cursor-pointer'
                onClick={onCloseModal}
              />
            </MDHead>
            <QuestDetail quest={quest} onClose={onCloseModal} />
          </ModalContent>
        </ModalBox>
      </BaseModal>
    </>
  )
}
