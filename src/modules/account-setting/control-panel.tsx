import { FC } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { MobileView } from 'react-device-detect'
import styled from 'styled-components'
import tw from 'twin.macro'

import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { AccoutSettingTabEnum, UserType } from '@/types'
import { UserAvatar } from '@/widgets/avatar'
import { CloseIcon } from '@/widgets/image'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'

const MainFrame = tw(Vertical)`
  fixed
  w-80
  h-full
  border-r
  border-gray-200
`

const PersonVertical = tw(VerticalFullWidth)`
  justify-center
  items-center
  py-8
  gap-2
`

const SettingVertical = tw(VerticalFullWidth)`
  px-4
  py-6
  gap-2
`

const CloseFrame = tw(Vertical)`
  items-end
  p-3
  w-80
`

const SettingItemHorizontal = styled(Horizontal)<{ active?: boolean }>(({ active = false }) => {
  const styled = [
    tw`
    w-full
    gap-3
    px-4
    py-2
    cursor-pointer
    hover:bg-primary-50
    rounded-lg
    text-gray-700
    font-medium
  `,
  ]
  if (active) {
    styled.push(tw`
      bg-primary-100
      text-primary
    `)
  }

  return styled
})

const ControlPanel: FC = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const tabType = AccountSettingsStore.useStoreState((state) => state.tabType)

  //  action
  const setTabType = AccountSettingsStore.useStoreActions((action) => action.setTabType)
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  const onClick = (value: number) => {
    if (tabType !== value) {
      setTabType(value)
    }
  }

  if (!user) {
    return <></>
  }

  return (
    <MainFrame>
      <MobileView>
        <CloseFrame>
          <CloseIcon onClick={() => setShowNavigationDrawer(false)} />
        </CloseFrame>
      </MobileView>
      <PersonVertical>
        <UserAvatar size={80} user={user} />
        <TextXl>{user.name}</TextXl>
      </PersonVertical>
      <Divider />
      <SettingVertical>
        <SettingItemHorizontal
          onClick={() => onClick(AccoutSettingTabEnum.GENERAL)}
          active={tabType === AccoutSettingTabEnum.GENERAL}
        >
          <span>{'👋'}</span>
          <span>{'GENERAL'}</span>
        </SettingItemHorizontal>

        {/* // TODO: ACHIEVEMENT TAB*/}

        {/* <SettingItemHorizontal
          onClick={() => onClick(AccoutSettingTabEnum.ACHIEVEMENTS)}
          active={tabType === AccoutSettingTabEnum.ACHIEVEMENTS}
        >
          <span>{'🎉'}</span>
          <span>{'ACHIEVEMENTS'}</span>
        </SettingItemHorizontal> */}
      </SettingVertical>
    </MainFrame>
  )
}

export default ControlPanel
