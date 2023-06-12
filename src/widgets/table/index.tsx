import { FC, ReactNode } from 'react'

import tw from 'twin.macro'

const TableStyled = tw.table`
  w-full
  table-auto
`

const ThStyled = tw.th`
  border
`

const Table: FC<{
  columns: string[]
  data: any[]
  cellView: (args: { item: any; rowIndex: number; columnIndex: number }) => ReactNode
}> = ({ columns, data, cellView }) => {
  return (
    <TableStyled>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <ThStyled key={index}>{column}</ThStyled>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((_, columnIndex) => (
              <ThStyled key={columnIndex}>{cellView({ item, rowIndex, columnIndex })}</ThStyled>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  )
}

export default Table
