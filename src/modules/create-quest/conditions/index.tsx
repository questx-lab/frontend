import { FC, ReactNode, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { listQuestApi } from '@/api/quest'
import OpBox from '@/modules/create-quest/conditions/select-op'
import QuestBox from '@/modules/create-quest/conditions/select-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { ConditionType, OpType } from '@/types'
import { QuestType } from '@/types/quest'
import { RoundedGrayBorderBox } from '@/widgets/box'
import {
  HorizontalBetween,
  VerticalCenter,
  VerticalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Padding } from '@/widgets/simple-popup'
import { Label, LightTextSm } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ops: OpType[] = [
  {
    id: 'is_completed',
    name: 'is completed',
  },
  { id: 'is_not_completed', name: 'is not completed' },
]

const AddConditionBtn = tw.div`
  text-primary-500
  font-medium
  text-sm
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

const GapVertical = tw(VerticalFullWidth)`gap-3`

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
    <GapVertical>
      <LightTextSm>Quest will only be claimable for members fulfilling the condition.</LightTextSm>

      {conditions.map((condition, index) => (
        <>
          {index > 0 && (
            <VerticalFullWidthCenter>
              <Gap height={2} />
              <AndBtn>AND</AndBtn>
              <Gap height={2} />
            </VerticalFullWidthCenter>
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
    </GapVertical>
  )
}

export default Conditions
