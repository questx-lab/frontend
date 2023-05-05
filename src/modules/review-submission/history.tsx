import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'
import { FixedSizeList as List } from 'react-window'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestStatus,
  ReviewBtnEnum,
  TabReviewEnum,
} from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import {
  Btn,
  BtnBox,
  BtnWrap,
  PBody,
  PBox,
  PCheckBox,
  PHeaderInfo,
  PLSide,
  PRSide,
  PRWrap,
  PSort,
  PTabHeader,
  PWrap,
} from '@/styles/quest-review.style'
import { ClaimQuestType } from '@/types/project.type'
import { BarsArrowDownIcon } from '@heroicons/react/24/solid'

import QuestSearch from './quest-search'
import { getListClaimQuest } from './review-submission'
import Status from './status'
import SubmissionItem from './submission-item'

const RenderBtn: FunctionComponent<{ data: ClaimQuestType[] }> = ({ data }) => {
  // action
  const onListClaimQuestHistoryChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onListClaimQuestHistoryChanged
  )
  const onLoadingModalChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Handler
  const updateClaimQuest = async () => {
    try {
      const rs = await updateClaimedQuestApi(
        data.map((e) => e.id!),
        ClaimedQuestStatus.PENDING
      )

      if (rs.error) {
        toast.error(rs.error)
      } else {
        onListClaimQuestHistoryChanged([])
      }

      setTimeout(() => onLoadingModalChanged(false), 500)
    } catch (error) {
      toast.error('Error network')
      onLoadingModalChanged(false)
    }
  }

  const onSubmit = () => {
    updateClaimQuest()
    onLoadingModalChanged(true)
  }

  if (!data.length) {
    return <></>
  }

  return (
    <BtnWrap>
      <BtnBox>
        <Btn onClick={onSubmit} btnType={ReviewBtnEnum.PENDING}>
          {'Set as Pending'}
        </Btn>
      </BtnBox>
    </BtnWrap>
  )
}

const HistoryTab: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  // Data
  const chooseQuestsState = NewQuestStore.useStoreState(
    (state) => state.chooseQuestsHistory
  )
  const allCheckHistoryState = NewQuestStore.useStoreState(
    (state) => state.allCheckHistory
  )
  const listClaimQuestState = NewQuestStore.useStoreState(
    (state) => state.listClaimHistoryQuest
  )
  const questsSelect = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )

  // Actions
  const onChooseQuestsChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onChooseQuestsHistoryChanged
  )
  const onAllCheckHistoryChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onAllCheckHistoryChanged
  )
  const onListClaimQuestHistoryChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onListClaimQuestHistoryChanged
  )

  // Hook
  useEffect(() => {
    getListClaimQuest(
      projectId,
      'rejected,accepted',
      onListClaimQuestHistoryChanged,
      questsSelect.map((e) => e.id!)
    )
  }, [])

  // Handler
  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    onAllCheckHistoryChanged(e.target.checked)
    if (e.target.checked) {
      onChooseQuestsChanged(listClaimQuestState.map((e) => e))
    } else {
      onChooseQuestsChanged([])
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      onChooseQuestsChanged([...chooseQuestsState, value])
    } else {
      onChooseQuestsChanged(chooseQuestsState.filter((data) => data !== value))
    }
  }

  return (
    <PWrap>
      <PBox>
        <PLSide>
          <PTabHeader>
            <PHeaderInfo>
              <PCheckBox
                id='inline-checked-checkbox'
                type='checkbox'
                onChange={onCheckAll}
                checked={allCheckHistoryState}
              />
              {'History'}
            </PHeaderInfo>

            <PSort>
              <BarsArrowDownIcon className='w-4 h-4 mr-1' />
              {'Sort by'}
            </PSort>
          </PTabHeader>
          <PBody>
            <List
              height={600}
              itemCount={listClaimQuestState.length}
              itemSize={120}
              width={'100%'}
            >
              {({ index, style }) => {
                const active = chooseQuestsState.includes(
                  listClaimQuestState[index]
                )
                return (
                  <SubmissionItem
                    tab={TabReviewEnum.HISTORY}
                    active={active}
                    onChange={onCheck}
                    payload={listClaimQuestState[index]}
                    key={index}
                    style={style}
                  />
                )
              }}
            </List>
          </PBody>
        </PLSide>
        <PRSide>
          <PRWrap>
            <PTabHeader>
              <PHeaderInfo>{'Filter'}</PHeaderInfo>
            </PTabHeader>
            <Status projectId={projectId} />
            {/* <Recurrence /> */}
            <QuestSearch projectId={projectId} />
          </PRWrap>
          <Gap height={6} />
          <Btn btnType={ReviewBtnEnum.EXPORT}>{'Export CSV'}</Btn>
        </PRSide>
      </PBox>
      <RenderBtn data={chooseQuestsState} />
    </PWrap>
  )
}

export default HistoryTab
