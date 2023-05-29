'use client'

import { Fragment, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { TabReviewEnum } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
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
import { QuestType } from '@/utils/type'
import { Label } from '@/widgets/text'
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

const QuestSearch: FunctionComponent<{ communityHandle: string }> = ({
  communityHandle,
}) => {
  // data
  const questsQuery = NewQuestSearchStore.useStoreState(
    (state) => state.questsQuery
  )
  const questsState = NewQuestSearchStore.useStoreState((state) => state.quests)
  const queryState = NewQuestSearchStore.useStoreState((state) => state.query)
  const questsSelectState = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )
  const tabReviewState = NewClaimReviewStore.useStoreState(
    (state) => state.tabReview
  )
  const reviewStatus = NewClaimReviewStore.useStoreState(
    (state) => state.reviewStatus
  )

  // actions
  const setQuests = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setQuests
  )
  const setQuestsSelect = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setQuestsSelect
  )
  const setQuery = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setQuery
  )
  const setQuestsQuery = NewQuestSearchStore.useStoreActions(
    (actions) => actions.setQuestsQuery
  )
  const setHistoryClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setHistoryClaims
  )
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await listQuestApi(communityHandle, '')
      if (data.error) {
        toast.error(data.error)
      }
      if (data.data) {
        setQuests(data.data.quests)
      }
    } catch (error) {
      toast.error('error')
    }
  }

  useEffect(() => {
    if (queryState !== '' && questsState.length) {
      setQuestsQuery(
        questsState.filter((quest) => {
          const title = quest!.title?.toLowerCase() ?? ''
          return title.includes(queryState.toLowerCase())
        })
      )
    } else {
      setQuestsQuery(questsState)
    }
  }, [queryState])

  const onChangeQuestBox = async (e: QuestType[]) => {
    setQuestsSelect(e)
    onLoadingModalChanged(true)
    if (tabReviewState === TabReviewEnum.HISTORY) {
      await getListClaimQuest(
        communityHandle,
        reviewStatus,
        setHistoryClaims,
        e.map((e) => e.id!)
      )
    }
    if (tabReviewState === TabReviewEnum.PENDING) {
      await getListClaimQuest(
        communityHandle,
        'pending',
        setPendingClaims,
        e.map((e) => e.id!)
      )
    }
    setTimeout(() => onLoadingModalChanged(false), 200)
  }

  return (
    <RCard>
      <RICard>
        <Label>{'QUEST'}</Label>
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
                onChange={(event) => setQuery(event.target.value)}
              />
              <CbbBtn>
                <ChevronUpDownIcon
                  onClick={() => setQuestsQuery(questsState)}
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
              afterLeave={() => setQuery('')}
            >
              <CbbOption>
                <ResultBox quest={questsQuery} query={queryState} />
              </CbbOption>
            </Transition>
          </CbbWrap>
        </Combobox>
      </RICard>
    </RCard>
  )
}

export default QuestSearch
