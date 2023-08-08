import { FC } from 'react'

import tw from 'twin.macro'

import CommunityBody from '@/admin-portal/modules/communities/community-table/community-body'
import SimpleTable from '@/widgets/table/simple-table'

const Th = tw.th`
  border-b border-gray-300 bg-gray-100 p-4
`

const TABLE_HEAD = [
  'Name',
  'Status',
  'Created By',
  'Date Created',
  'Contact Email',
  'Members',
  'DAU',
  'Action',
]

const CommunityContent: FC = () => {
  return (
    <>
      <SimpleTable>
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <Th key={index}>{head}</Th>
            ))}
          </tr>
        </thead>
        <CommunityBody />
      </SimpleTable>
    </>
  )
}

export default CommunityContent
