'use client'

import { FunctionComponent } from 'react'

import { useRouter } from 'next/navigation'

import { SideEnum } from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { useStoreState } from '@/store/store'
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
  projectId: string
  active?: number
}> = ({ projectId, active = SideEnum.QUEST }) => {
  // Data
  const userState = useStoreState((state) => state.userSession.user)
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
            router.push(RouterConst.PROJECT + projectId)
          }}
          active={active === SideEnum.QUEST}
        >
          <BoltIcon className='w-6 h-6 mr-2' />
          {'QUESTS'}
        </ItemSide>
        <ItemSide
          onClick={() => {
            router.push(RouterConst.PROJECT + projectId + '/review')
          }}
          active={active === SideEnum.REVIEW_SUBMISSION}
        >
          <ArrowUpOnSquareIcon className='w-6 h-6 mr-2' />
          {'REVIEW SUBMISSION'}
        </ItemSide>
        <ItemSide
          onClick={() => {
            router.push(RouterConst.PROJECT + projectId + '/review')
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
