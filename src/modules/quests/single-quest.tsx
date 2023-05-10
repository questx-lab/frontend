'use client'

import { FunctionComponent, useState } from 'react'

import { StorageConst } from '@/constants/storage.const'
import { QuestDetail } from '@/modules/project/quest-detail'
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
import Image from 'next/image'

export const QuestView: FunctionComponent<{
  quest: QuestType
  onQuestSelected?: (e: QuestType) => void
}> = ({ quest, onQuestSelected = undefined }) => {
  const [selectedQuest, setSelectedQuest] = useState<QuestType>()

  const onItemSelected = (quest: QuestType) => {
    if (onQuestSelected) {
      onQuestSelected(quest)
    } else {
      setSelectedQuest(quest)
    }
  }

  const onCloseModal = () => {
    setSelectedQuest(undefined)
  }

  return (
    <>
      <QuestboardBox key={quest.id} onClick={() => onItemSelected(quest)}>
        <StartBoarding>
          <Gap height={4} />
          <TitleQuestBox>{`🎉 ${quest.title}`}</TitleQuestBox>
          <Gap height={4} />
          <DesQ>
            {quest.description ?? 'Please visit Manta Network official website'}
          </DesQ>
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

      <BaseModal isOpen={selectedQuest != undefined}>
        <ModalBox>
          <ModalContent className='w-2/3'>
            <MDHead>
              {'Invite 2 fren to join our crew3 🤲'}
              <XMarkIcon
                className='w-7 h-7 cursor-pointer'
                onClick={onCloseModal}
              />
            </MDHead>
            <QuestDetail quest={selectedQuest} onClose={onCloseModal} />
          </ModalContent>
        </ModalBox>
      </BaseModal>
    </>
  )
}
