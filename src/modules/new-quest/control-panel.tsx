'use client'

import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'

import { SideEnum } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { Divider, Gap } from '@/styles/common.style'
import {
  CPBox,
  CSide,
  ImageQuestBox,
  ItemSide,
  LvBox,
  PersonInfoBox,
  PersonName,
  PersonWrap,
} from '@/styles/questboard.style'
import {
  ArrowUpOnSquareIcon,
  BoltIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const ControlPanel: FunctionComponent<{
  communityId: string
  active?: number
}> = ({ communityId, active = SideEnum.QUEST }) => {
  // Data
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)
  const router = useRouter()

  return (
    <CSide>
      <PersonWrap>
        <ImageQuestBox
          width={80}
          height={80}
          src={'/images/dummy/1.svg'}
          alt={'Avatar'}
        />
        <Gap height={6} />
        <PersonInfoBox>
          {userState && <PersonName>{userState.name}</PersonName>}
          <Gap width={1} />
          <LvBox>{'lvl.3'}</LvBox>
        </PersonInfoBox>
      </PersonWrap>
      <Divider />
      <CPBox>
        <ItemSide
          onClick={() => {
            router.push(RouterConst.PROJECT + communityId)
          }}
          active={active === SideEnum.QUEST}
        >
          <BoltIcon className='w-6 h-6 mr-2' />
          {'QUESTS'}
        </ItemSide>
        <ItemSide
          onClick={() => {
            router.push(RouterConst.PROJECT + communityId + '/review')
          }}
          active={active === SideEnum.REVIEW_SUBMISSION}
        >
          <ArrowUpOnSquareIcon className='w-6 h-6 mr-2' />
          {'REVIEW SUBMISSION'}
        </ItemSide>
        <ItemSide
          onClick={() => {
            router.push(RouterConst.PROJECT + communityId + '/setting')
          }}
          active={active === SideEnum.SETTINGS}
        >
          <Cog6ToothIcon className='w-6 h-6 mr-2' />
          {'SETTINGS'}
        </ItemSide>
      </CPBox>
    </CSide>
  )
}

export default ControlPanel
