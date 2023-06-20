import { FC, useState } from 'react'

import tw from 'twin.macro'

import QuestCardDetails from '@/modules/quest/quest-card-details'
import NewQuestStore from '@/store/local/new-quest'
import { emptyQuest, QuestType } from '@/types/quest'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase } from '@/widgets/text'

const WidthFullPaddingY = tw(Vertical)`
  w-full
  py-4
`

const ConfirmationModalFrame = tw(VerticalFullWidthCenter)`
  h-full
  gap-4
  px-5
`

const GapButton = tw(HorizontalBetweenCenterFullWidth)`gap-4`

const TextCenter = tw(TextBase)`text-center`

const TemplateGroup: FC<{
  quests: QuestType[]
  onItemClicked: (e: QuestType) => void
}> = ({ quests, onItemClicked: onClickItem }) => {
  // action
  const setQuest = NewQuestStore.useStoreActions((action) => action.setQuest)

  // local state
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedQuest, setSelectedQuest] = useState<QuestType>(emptyQuest())

  if (!quests || quests.length === 0) {
    return <></>
  }

  const questListView = quests.map((quest) => (
    <VerticalFullWidth key={quest.id}>
      <QuestCardDetails
        quest={quest}
        isTemplate
        onClick={(quest) => {
          setSelectedQuest(quest)
          setOpenModal(true)
        }}
      />
      <Gap height={6} />
    </VerticalFullWidth>
  ))

  return (
    <>
      <WidthFullPaddingY>{questListView}</WidthFullPaddingY>
      <BasicModal
        isOpen={openModal}
        hasHeader={false}
        onClose={() => setOpenModal(false)}
        styled='!h-[150px] !w-[400px]'
      >
        <ConfirmationModalFrame>
          <TextCenter>{'Do you want to replace this quest by the new template?'}</TextCenter>
          <GapButton>
            <PositiveButton
              type={ButtonTypeEnum.NEGATIVE}
              isFull
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Cancel
            </PositiveButton>
            <PositiveButton
              onClick={() => {
                setQuest(selectedQuest)
                setOpenModal(false)
              }}
              isFull
            >
              Use Template
            </PositiveButton>
          </GapButton>
        </ConfirmationModalFrame>
      </BasicModal>
    </>
  )
}

export default TemplateGroup
