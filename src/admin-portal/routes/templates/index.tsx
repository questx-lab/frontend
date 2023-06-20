import { FC, ReactNode } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import RowOption from '@/admin-portal/routes/templates/row-option'
import ViewQuest from '@/modules/quest/view-quest'
import ActiveQuestStore from '@/store/local/active-quest'
import { GlobalStoreModel } from '@/store/store'
import { emptyQuest, QuestType } from '@/types/quest'
import BasicModal from '@/widgets/modal/basic'
import Table from '@/widgets/table'

enum ColumnType {
  TITLE = 'Title',
  TYPE = 'Type',
  RECURRENCE = 'Recurrence',
  CREATED = 'Created',
  POINTS = 'Points',
  EDIT = '   ',
}

const Frame = tw.div`
  p-8
`

const CellPadding = tw.div`
  p-2
`

const RenderCell = (props: {
  item: QuestType
  rowIndex: number
  columnIndex: number
}): ReactNode => {
  switch (props.columnIndex) {
    case 0:
      return <CellPadding>{props.item.title}</CellPadding>
    case 1:
      return <CellPadding>{props.item.type}</CellPadding>
    case 2:
      return <CellPadding>{props.item.recurrence}</CellPadding>
    case 3:
      return <CellPadding>{props.item.created_at}</CellPadding>
    case 4:
      return <CellPadding>{props.item.points}</CellPadding>
    case 5:
      return (
        <CellPadding>
          <RowOption quest={props.item} />
        </CellPadding>
      )
  }

  return <></>
}

const Index: FC = () => {
  const columns = [
    ColumnType.TITLE,
    ColumnType.TYPE,
    ColumnType.RECURRENCE,
    ColumnType.CREATED,
    ColumnType.POINTS,
    ColumnType.EDIT,
  ]
  // data
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)
  const activeQuest = ActiveQuestStore.useStoreState((state) => state.quest)

  // action
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  return (
    <Frame>
      <Table columns={columns} data={templates} cellView={RenderCell} />
      <BasicModal
        title={`${activeQuest.title}`}
        isOpen={activeQuest.id !== ''}
        onClose={() => {
          setActiveQuest(emptyQuest())
        }}
      >
        <ViewQuest quest={activeQuest} />
      </BasicModal>
    </Frame>
  )
}

export default Index
