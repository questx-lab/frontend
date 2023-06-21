import NewQuestStore from '@/store/local/new-quest'
import { OpType } from '@/types'
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

const ListOpOptionRender: FC<{ ops: OpType[] }> = ({ ops }) => {
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
            <Listbox.Option key={op.id} className={ActiveOption} value={op.id}>
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

const OpBox: FC<{ index: number; ops: OpType[] }> = ({ index, ops }) => {
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
        <ListOpOptionRender ops={ops} />
      </Relative>
    </Listbox>
  )
}

export default OpBox
