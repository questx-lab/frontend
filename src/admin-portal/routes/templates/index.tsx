import { FC, ReactNode } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/types/quest'
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
      return <CellPadding>{props.item.points}</CellPadding>
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
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)
  return (
    <Frame>
      <Table columns={columns} data={templates} cellView={RenderCell} />
    </Frame>
  )
}

export default Index
