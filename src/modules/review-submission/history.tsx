import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'
import { FixedSizeList as List } from 'react-window'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestStatus,
  ReviewBtnEnum,
  TabReviewEnum,
} from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import {
  Btn,
  BtnBox,
  BtnWrap,
  NothingBox,
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
import { ClaimQuestType } from '@/utils/type'
import { BarsArrowDownIcon } from '@heroicons/react/24/solid'

import QuestSearch from './quest-search'
import { getListClaimQuest } from './review-submission'
import Status from './status'
import SubmissionItem from './submission-item'

const RenderBtn: FunctionComponent<{ data: ClaimQuestType[] }> = ({ data }) => {
  // action
  const setHistoryClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setHistoryClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
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
        setHistoryClaims([])
      }

      setTimeout(() => onLoadingModalChanged(false), 200)
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

const RenderBody: FunctionComponent<{
  data: ClaimQuestType[]
  choose: ClaimQuestType[]
  onCheck: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
}> = ({ data, choose, onCheck }) => {
  if (data.length === 0) {
    return <NothingBox>{'Nothing quest claim'}</NothingBox>
  }

  return (
    <List height={600} itemCount={data.length} itemSize={120} width={'100%'}>
      {({ index, style }) => {
        const active = choose.includes(data[index])
        return (
          <SubmissionItem
            tab={TabReviewEnum.HISTORY}
            active={active}
            onChange={onCheck}
            payload={data[index]}
            key={index}
            style={style}
          />
        )
      }}
    </List>
  )
}

const HistoryTab: FunctionComponent<{ communityHandle: string }> = ({
  communityHandle,
}) => {
  // Data
  const chooseQuestsState = NewClaimReviewStore.useStoreState(
    (state) => state.chooseQuestsHistory
  )
  const allCheckHistoryState = NewClaimReviewStore.useStoreState(
    (state) => state.allCheckHistory
  )
  const historyClaims = NewClaimReviewStore.useStoreState(
    (state) => state.historyClaims
  )
  const questsSelect = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )

  // Actions
  const setChooseHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setChooseHistory
  )
  const setCheckHistory = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setCheckHistory
  )
  const setHistoryClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setHistoryClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Hook
  useEffect(() => {
    getClaimsQuest()
  }, [])

  const getClaimsQuest = async () => {
    onLoadingModalChanged(true)
    getListClaimQuest(
      communityHandle,
      'rejected,accepted',
      setHistoryClaims,
      questsSelect.map((e) => e.id!)
    )
    setTimeout(() => onLoadingModalChanged(false), 200)
  }

  // Handler
  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckHistory(e.target.checked)
    if (e.target.checked) {
      setChooseHistory(historyClaims.map((e) => e))
    } else {
      setChooseHistory([])
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      setChooseHistory([...chooseQuestsState, value])
    } else {
      setChooseHistory(chooseQuestsState.filter((data) => data !== value))
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
            <RenderBody
              onCheck={onCheck}
              data={historyClaims}
              choose={chooseQuestsState}
            />
          </PBody>
        </PLSide>
        <PRSide>
          <PRWrap>
            <PTabHeader>
              <PHeaderInfo>{'Filter'}</PHeaderInfo>
            </PTabHeader>
            <Status communityHandle={communityHandle} />
            {/* <Recurrence /> */}
            <QuestSearch communityHandle={communityHandle} />
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
