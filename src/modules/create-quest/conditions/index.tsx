import { FC, ReactNode, useEffect, useState } from 'react'

import tw from 'twin.macro'
import NewQuestStore from '@/store/local/new-quest'
import { VerticalFullWidth, HorizontalBetween, VerticalCenter } from '@/widgets/orientation'
import { Label, SmallText } from '@/widgets/text'
import { ConditionType, OpType } from '@/types'
import { RoundedGrayBorderBox } from '@/widgets/box'
import { QuestType } from '@/types/quest'
import { Gap } from '@/widgets/separator'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CommunityStore from '@/store/local/community'
import { listQuestApi } from '@/api/quest'
import toast from 'react-hot-toast'
import { Padding } from '@/widgets/simple-popup'
import OpBox from '@/modules/create-quest/conditions/select-op'
import QuestBox from '@/modules/create-quest/conditions/select-quest'

const ops: OpType[] = [
  {
    id: 'is_completed',
    name: 'is completed',
  },
  { id: 'is_not_completed', name: 'is not completed' },
]

const AddConditionBtn = tw.div`
  text-primary-500
  font-bold
  cursor-pointer	
`

export const ConditionBox: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <RoundedGrayBorderBox>
      <Padding>{children}</Padding>
    </RoundedGrayBorderBox>
  )
}

const AndBtn = tw.div`
  text-white
  bg-[#22C55E] 
  px-2 
  py-1 
  rounded-xl 
  font-bold 
  text-xs
`

const Conditions: FC = () => {
  const conditions = NewQuestStore.useStoreState((state) => state.conditions)
  const setConditions = NewQuestStore.useStoreActions((action) => action.setConditions)
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const [quests, setQuests] = useState<QuestType[]>([])

  const fetchQuests = async () => {
    const resp = await listQuestApi(community.handle, '')
    if (resp.error) {
      toast.error(resp.error)
      return
    }

    if (resp.code === 0 && resp.data) setQuests(resp.data?.quests || [])
  }
  useEffect(() => {
    fetchQuests()
  }, [])

  const onAddCondition = () => {
    setConditions([
      ...conditions,
      {
        type: 'quest',
        data: {
          op: '',
          quest_id: '',
        },
      },
    ])
  }

  const removeCondition = (index: number) => {
    const arr: ConditionType[] = conditions
    arr.splice(index, 1)

    setConditions([...arr])
  }
  return (
    <VerticalFullWidth>
      <SmallText>Quest will only be claimable for members fulfilling the condition.</SmallText>

      {conditions.map((condition, index) => (
        <>
          {index > 0 && (
            <div className='flex justify-center w-full'>
              <Gap height={2} />
              <AndBtn>AND</AndBtn>
              <Gap height={2} />
            </div>
          )}
          <ConditionBox>
            <HorizontalBetween>
              <Label> Quest </Label>
              <OpBox index={index} ops={ops} />
              <QuestBox index={index} quests={quests} />
              <VerticalCenter>
                <XMarkIcon
                  onClick={() => {
                    removeCondition(index)
                  }}
                  className='h-5 w-5 cursor-pointer	text-[#EF4444]'
                />
              </VerticalCenter>
            </HorizontalBetween>
          </ConditionBox>
        </>
      ))}
      <AddConditionBtn onClick={onAddCondition}> Add Condition + </AddConditionBtn>
    </VerticalFullWidth>
  )
}

export default Conditions
