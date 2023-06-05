import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import { SizeEnum } from '@/constants/common.const'
import QuestCardDetails from '@/modules/quest/quest-card-details'
import NewQuestStore from '@/store/local/new-quest.store'
import { emptyQuest } from '@/types/quest'
import { QuestType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { Horizontal, Vertical, VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { NormalText } from '@/widgets/text'

const WidthFullPaddingY = tw(Vertical)`
  w-full
  py-4
`

const ConfirmationModalFrame = tw(VerticalCenter)`
  w-full
  h-full
`

const TemplateGroup: FunctionComponent<{
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
        styled='!h-[400px]'
      >
        <ConfirmationModalFrame>
          <NormalText>{'Do you want to replace this quest by the new template?'}</NormalText>
          <Gap />
          <Horizontal>
            <NegativeButton
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Cancel
            </NegativeButton>
            <Gap width={4} />
            <PositiveButton
              onClick={() => {
                setQuest(selectedQuest)
                setOpenModal(false)
              }}
              width={SizeEnum.x48}
            >
              Use Template
            </PositiveButton>
          </Horizontal>
          <Gap />
        </ConfirmationModalFrame>
      </BasicModal>
    </>
  )
}

export default TemplateGroup
