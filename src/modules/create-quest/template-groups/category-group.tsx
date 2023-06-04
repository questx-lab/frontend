import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import { SizeEnum } from '@/constants/common.const'
import QuestCard from '@/modules/quest/quest-card'
import NewQuestStore from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { emptyQuest } from '@/types/quest'
import { QuestType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/buttons/button'
import { BasicModal } from '@/widgets/modal'
import { Horizontal, Vertical, VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
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
      <QuestCard
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
