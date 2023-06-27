import NewQuestStore from '@/store/local/new-quest'
import { QuestType } from '@/types/quest'
import {
  ActiveOption,
  CheckIconBox,
  ListButton,
  ListOption,
  Relative,
  Title,
  TitleOption,
  UpDown,
} from '@/widgets/simple-popup'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { FC, Fragment } from 'react'

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
            <Listbox.Option key={quest.id} className={ActiveOption} value={quest.id}>
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

export default QuestBox
