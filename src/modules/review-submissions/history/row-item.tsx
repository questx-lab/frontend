import { ClaimQuestType } from '@/utils/type'
import { ChangeEvent, FunctionComponent } from 'react'

const RowItem: FunctionComponent<{
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claimQuest: ClaimQuestType
}> = ({ active, onChange, claimQuest }) => {
  return <>AAAA</>
}

export default RowItem
