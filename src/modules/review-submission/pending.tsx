import { ChangeEvent, FunctionComponent } from 'react'

import Image from 'next/image'

import { ReviewBtnEnum } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import {
  Btn,
  BtnBox,
  BtnWrap,
  PAction,
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
  SCol,
  SDes,
  SInfo,
  SItem,
  SName,
  SRow,
  STextInfo,
  SubmitItem,
} from '@/styles/quest-review.style'
import { BarsArrowDownIcon } from '@heroicons/react/24/solid'

import QuestSearch from './quest-search'
import Recurrence from './recurrence'

const RenderBtn: FunctionComponent<{ data: string[] }> = ({ data }) => {
  if (!data.length) {
    return <></>
  }

  return (
    <BtnWrap>
      <BtnBox>
        <Btn btnType={ReviewBtnEnum.REJECT}>{'Reject'}</Btn>
        <Btn btnType={ReviewBtnEnum.ACCEPT}>{'Accept'}</Btn>
      </BtnBox>
    </BtnWrap>
  )
}

const PendingTab: FunctionComponent = () => {
  // Data
  const chooseQuestsState = NewQuestStore.useStoreState(
    (state) => state.chooseQuestsPending
  )

  // Actions
  const onChooseQuestsChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onChooseQuestsPendingChanged
  )

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (e.target.checked) {
      onChooseQuestsChanged([...chooseQuestsState, value])
    } else {
      onChooseQuestsChanged(chooseQuestsState.filter((data) => data !== value))
    }
  }

  const listSubmit = [1, 2, 3, 4, 5, 6].map((e) => {
    const active = chooseQuestsState.includes(e.toString())
    return (
      <SRow key={e} active={active}>
        <SubmitItem>
          <PCheckBox
            checked={active}
            type='checkbox'
            onChange={(value) => onCheck(value, e.toString())}
          />
          <SItem>
            <SInfo>
              <Image
                width={40}
                height={40}
                src={'/images/dummy/1.svg'}
                alt={StorageConst.AVATAR_DEFAUL.alt}
              />
              <SCol>
                <SName>{'alim_marcus'}</SName>
                <SDes>{'claimed a few seconds ago'}</SDes>
              </SCol>
            </SInfo>
            <STextInfo>{'Invite 15 fren to join our crew3 🤲'}</STextInfo>
          </SItem>
        </SubmitItem>
        <PAction>
          <Btn btnType={ReviewBtnEnum.REJECT}>{'Reject'}</Btn>
          <Btn btnType={ReviewBtnEnum.ACCEPT}>{'Accept'}</Btn>
        </PAction>
      </SRow>
    )
  })

  return (
    <PWrap>
      <PBox>
        <PLSide>
          <PTabHeader>
            <PHeaderInfo>
              <PCheckBox id='inline-checked-checkbox' type='checkbox' />
              {'Pending Submission'}
            </PHeaderInfo>
            <PSort>
              <BarsArrowDownIcon className='w-4 h-4 mr-1' />
              {'Sort by'}
            </PSort>
          </PTabHeader>
          <PBody>{listSubmit}</PBody>
        </PLSide>
        <PRSide>
          <PRWrap>
            <PTabHeader>
              <PHeaderInfo>{'Filter'}</PHeaderInfo>
            </PTabHeader>
            <Recurrence />
            <QuestSearch />
          </PRWrap>
        </PRSide>
      </PBox>
      <RenderBtn data={chooseQuestsState} />
    </PWrap>
  )
}

export default PendingTab
