import { FC, Fragment, ReactNode, useEffect, useState } from 'react'

import tw from 'twin.macro'
import NewQuestStore from '@/store/local/new-quest'
import { VerticalFullWidth, HorizontalBetween, VerticalCenter } from '@/widgets/orientation'
import { Label, SmallText } from '@/widgets/text'
import { ConditionType, OpType } from '@/types'
import { Listbox, Transition } from '@headlessui/react'
import { RoundedGrayBorderBox } from '@/widgets/box'
import styled from 'styled-components'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { QuestType } from '@/types/quest'
import { Gap } from '@/widgets/separator'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CommunityStore from '@/store/local/community'
import { listQuestApi } from '@/api/quest'
import toast from 'react-hot-toast'

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
export const Padding = tw(VerticalFullWidth)`
  px-8
  py-1
  gap-4
`

const Relative = tw.div`
  relative mt-1
`

const ListButton = tw(Listbox.Button)`
  relative
  w-full
  cursor-pointer
  rounded-lg
  bg-white
  py-2
  pl-3
  pr-10
  text-left
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
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

const Title = tw.div`
  block
  truncate
  text-lg
  font-normal
  text-gray-900
`
const UpDown = tw.div`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

const ListOption = tw(Listbox.Options)`
  absolute
  mt-1
  max-h-60
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-lg
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

const CheckIconBox = tw.div`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
  text-gray-600
`
const AndBtn = tw.div`
  text-white
  bg-[#22C55E] 
  px-2 
  py-1 
  rounded-xl 
  font-bold 
  text-xs
`

const FullWidth = tw.div`
  w-full z-20
`

const activeOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

const TitleOption = styled.div<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`block truncate`]
  if (selected) {
    styles.push(tw`font-medium`)
  } else {
    styles.push(tw`font-normal`)
  }

  return styles
})

const ListTypeOptionRender: FC<{ ops: OpType[] }> = ({ ops }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {ops &&
          ops.map((op) => (
            <Listbox.Option key={op.id} className={activeOption} value={op.id}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{op.name}</TitleOption>
                  {selected ? (
                    <CheckIconBox>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </CheckIconBox>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
      </ListOption>
    </Transition>
  )
}

const ListQuestOptionRender: FC<{ quests: QuestType[] }> = ({ quests }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {quests &&
          quests.map((quest) => (
            <Listbox.Option key={quest.id} className={activeOption} value={quest.id}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{quest.title}</TitleOption>
                  {selected ? (
                    <CheckIconBox>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </CheckIconBox>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
      </ListOption>
    </Transition>
  )
}

const ConditionTypeBox: FC<{ index: number; ops: OpType[] }> = ({ index, ops }) => {
  const conditions = NewQuestStore.useStoreState((state) => state.conditions)
  const setConditions = NewQuestStore.useStoreActions((action) => action.setConditions)
  const setConditionType = (e: string) => {
    const arr = conditions
    if (index > conditions.length) {
      return
    }
    if (arr[index].data) {
      arr[index].data.op = e
      setConditions([...arr])
    }
  }

  const getOpName = () => {
    const opId = conditions[index].data.op
    const op = ops.find((op) => op.id === opId)

    if (op) return op.name
    return null
  }

  const getOpId = () => {
    return conditions[index].data.op
  }

  return (
    <Listbox value={getOpId()} onChange={setConditionType}>
      <Relative>
        <ListButton>
          <Title>{getOpName() || 'Choose a type'}</Title>
          <UpDown>
            <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </UpDown>
        </ListButton>
        <ListTypeOptionRender ops={ops} />
      </Relative>
    </Listbox>
  )
}

const QuestBox: FC<{ index: number; quests: QuestType[] }> = ({ index, quests }) => {
  const conditions = NewQuestStore.useStoreState((state) => state.conditions)
  const setConditions = NewQuestStore.useStoreActions((action) => action.setConditions)
  const setQuest = (e: string) => {
    const arr = conditions
    if (index > conditions.length) {
      return
    }

    if (arr[index].data) {
      arr[index].data.quest_id = e
      setConditions([...arr])
    }
  }

  const getQuestTitle = () => {
    const questId = conditions[index].data.quest_id
    const quest = quests.find((q) => q.id === questId)

    if (quest) return quest.title
    return null
  }

  const getQuestId = () => {
    return conditions[index].data.quest_id
  }
  return (
    <Listbox value={getQuestId()} onChange={setQuest}>
      <Relative>
        <ListButton>
          <Title>{getQuestTitle() || 'Choose a quest'}</Title>
          <UpDown>
            <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </UpDown>
        </ListButton>
        <ListQuestOptionRender quests={quests} />
      </Relative>
    </Listbox>
  )
}

const Condition: FC = () => {
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
          op: 'is completed',
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
              <ConditionTypeBox index={index} ops={ops} />
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

export default Condition
