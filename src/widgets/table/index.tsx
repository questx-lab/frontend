import { FC, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { Card } from '@material-tailwind/react'

const TableStyled = tw(Card)`
  shadow-none
  border
  border-solid
  border-gray-300
  h-full
  w-full
`

const TableBox = tw.table`
  w-full
  min-w-max
  table-auto
  text-left
`

const Th = tw.th`
border-b border-gray-300 bg-gray-100 p-4
`

const Td = styled.td<{ highlight?: boolean }>(({ highlight = false }) => {
  const styles = [
    tw`
  p-4
  font-normal
  text-base
  text-gray-500
`,
  ]
  if (highlight) {
    styles.push(tw`font-medium text-info`)
  }

  return styles
})

const Table: FC<{
  columns: string[]
  data: any[]
  cellView: (args: { item: any; rowIndex: number; columnIndex: number }) => ReactNode
}> = ({ columns, data, cellView }) => {
  return (
    <TableStyled>
      <TableBox>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, columnIndex) => (
                <Td key={columnIndex}>{cellView({ item, rowIndex, columnIndex })}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableBox>
    </TableStyled>
  )
}

export default Table
