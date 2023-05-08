import { Fragment, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { TabReviewEnum } from '@/constants/project.const'
import { NewProjectStore } from '@/store/local/project.store'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  CbbBoxInput,
  CbbBtn,
  CbbInput,
  CbbOption,
  CbbTitle,
  CbbWrap,
  NotFoundBox,
  RCard,
  RICard,
  WrapIcon,
} from '@/styles/quest-review.style'
import { QuestType } from '@/types/project.type'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { getListClaimQuest } from './review-submission'

const ResultBox: FunctionComponent<{ quest: QuestType[]; query: string }> = ({
  quest,
  query,
}) => {
  if (!quest.length && query !== '') {
    return <NotFoundBox>Nothing found.</NotFoundBox>
  }

  return (
    <>
      {quest.map((quest) => (
        <Combobox.Option
          key={quest.id}
          className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900'
          value={quest}
        >
          {({ selected }) => (
            <>
              <CbbTitle selected={selected}>{quest.title}</CbbTitle>
              {selected ? (
                <WrapIcon>
                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                </WrapIcon>
              ) : null}
            </>
          )}
        </Combobox.Option>
      ))}
    </>
  )
}

const QuestSearch: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  // data
  const listQuestsState = NewQuestSearchStore.useStoreState(
    (state) => state.listQuests
  )
  const queryState = NewQuestSearchStore.useStoreState((state) => state.query)
  const questsSelectState = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )
  const listQuestQuery = NewQuestSearchStore.useStoreState(
    (state) => state.listQuestQuery
  )
  const tabReviewState = NewProjectStore.useStoreState(
    (state) => state.tabReview
  )
  const reviewStatus = NewQuestClaimStore.useStoreState(
    (state) => state.reviewStatus
  )

  // actions
  const onListQuestsChanged = NewQuestSearchStore.useStoreActions(
    (actions) => actions.onListQuestsChanged
  )
  const onQuestsSelectChanged = NewQuestSearchStore.useStoreActions(
    (actions) => actions.onQuestsSelectChanged
  )
  const onQueryChanged = NewQuestSearchStore.useStoreActions(
    (actions) => actions.onQueryChanged
  )
  const onListQuestQueryChanged = NewQuestSearchStore.useStoreActions(
    (actions) => actions.onListQuestQueryChanged
  )
  const onHistoryClaimsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onHistoryClaimsChanged
  )
  const onPendingClaimsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onPendingClaimsChanged
  )
  const onLoadingModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await listQuestApi(projectId)
      if (data.error) {
        toast.error(data.error)
      }
      if (data.data) {
        onListQuestsChanged(data.data.quests)
      }
    } catch (error) {
      toast.error('error')
    }
  }

  useEffect(() => {
    if (!queryState && listQuestsState.length) {
      onListQuestQueryChanged(
        listQuestsState.filter((quest) => {
          const title = quest!.title?.toLowerCase() ?? ''
          return title.includes(queryState.toLowerCase())
        })
      )
    } else {
      onListQuestQueryChanged(listQuestsState)
    }
  }, [queryState])

  const onChangeQuestBox = async (e: QuestType[]) => {
    onQuestsSelectChanged(e)
    onLoadingModalChanged(true)
    if (tabReviewState === TabReviewEnum.HISTORY) {
      await getListClaimQuest(
        projectId,
        reviewStatus,
        onHistoryClaimsChanged,
        e.map((e) => e.id!)
      )
    }
    if (tabReviewState === TabReviewEnum.PENDING) {
      await getListClaimQuest(
        projectId,
        'pending',
        onPendingClaimsChanged,
        e.map((e) => e.id!)
      )
    }
    setTimeout(() => onLoadingModalChanged(false), 200)
  }

  return (
    <RCard>
      <RICard>
        <LabelInput>{'QUEST'}</LabelInput>
        <Gap height={4} />
        <Combobox
          value={questsSelectState}
          onChange={onChangeQuestBox}
          multiple
        >
          <CbbWrap>
            <CbbBoxInput>
              <CbbInput
                displayValue={(person) => (person as any).name}
                onChange={(event) => onQueryChanged(event.target.value)}
              />
              <CbbBtn>
                <ChevronUpDownIcon
                  onClick={() => onListQuestQueryChanged(listQuestsState)}
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </CbbBtn>
            </CbbBoxInput>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => onQueryChanged('')}
            >
              <CbbOption>
                <ResultBox quest={listQuestQuery} query={queryState} />
              </CbbOption>
            </Transition>
          </CbbWrap>
        </Combobox>
      </RICard>
    </RCard>
  )
}

export default QuestSearch
