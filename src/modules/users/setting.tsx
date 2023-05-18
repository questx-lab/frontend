'use client'

import { FunctionComponent, useState } from 'react'

import { useStoreState } from 'easy-peasy'

import { Achievement } from '@/modules/users/setting-achievement'
import { General } from '@/modules/users/setting-general'
import { UserStore } from '@/store/local/user.store'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types/account.type'

import {
  Asside,
  Avatar,
  LvBox,
  Main,
  NameText,
  Option,
  OptionWrap,
  PersonWrap,
  Wrap,
} from './style'

enum TabEnum {
  GENERAL,
  ACHIEVEMENTS,
}

const UserSetting: FunctionComponent = () => {
  // hook
  const [tab, setTab] = useState<number>(TabEnum.GENERAL)

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const ContentOption: FunctionComponent = () => {
    if (tab === TabEnum.ACHIEVEMENTS) {
      return <Achievement />
    }

    return <General />
  }

  return (
    <Wrap>
      <Asside>
        <PersonWrap>
          <Avatar
            width={80}
            height={80}
            src={'/images/dummy/1.svg'}
            alt={'Avatar'}
          />
          <NameText>{user && user.name}</NameText>
          <LvBox>{'lvl.3'}</LvBox>
        </PersonWrap>
        <OptionWrap>
          <Option
            active={tab === TabEnum.GENERAL}
            onClick={() => tab !== TabEnum.GENERAL && setTab(TabEnum.GENERAL)}
          >
            <span>{'👋'}</span>

            {'GENERAL'}
          </Option>
          <Option
            active={tab === TabEnum.ACHIEVEMENTS}
            onClick={() =>
              tab !== TabEnum.ACHIEVEMENTS && setTab(TabEnum.ACHIEVEMENTS)
            }
          >
            <span> {'🎉'}</span>
            {'ACHIEVEMENT'}
          </Option>
        </OptionWrap>
      </Asside>
      <Main>
        <UserStore.Provider>
          <ContentOption />
        </UserStore.Provider>
      </Main>
    </Wrap>
  )
}

export default UserSetting
