'use client'

import { FunctionComponent, useState } from 'react'

import parse from 'html-react-parser'
import Image from 'next/image'

import { StorageConst } from '@/constants/storage.const'
import { QuestDetail } from '@/modules/quests/quest-detail'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { MDHead, ModalBox, ModalContent } from '@/styles/quest-review.style'
import {
  Card,
  CardBox,
  DesQ,
  EndBoarding,
  HeaderBox,
  PointText,
  QuestboardBox,
  StartBoarding,
  TitleQuestBox,
} from '@/styles/questboard.style'
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
  const setQuestActive = NewQuestStore.useStoreActions(
    (action) => action.setQuestActive
  )

  const onOpenModal = () => {
    setOpen(true)
    setQuestActive(quest)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <QuestboardBox key={quest.id} onClick={onOpenModal}>
        <StartBoarding>
          <Gap height={4} />
          <TitleQuestBox>{`🎉 ${quest.title}`}</TitleQuestBox>
          <Gap height={4} />
          <DescriptionBox des={quest.description} />
        </StartBoarding>
        <EndBoarding>
          <HeaderBox>
            <Image
              width={25}
              height={25}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{`300 Gems`}</PointText>
          </HeaderBox>
          {quest.recurrence && (
            <CardBox>
              <Card>{quest.recurrence.toUpperCase()}</Card>
              <Gap width={2} />
            </CardBox>
          )}
        </EndBoarding>
      </QuestboardBox>

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
            <QuestDetail onClose={onCloseModal} />
          </ModalContent>
        </ModalBox>
      </BaseModal>
    </>
  )
}
