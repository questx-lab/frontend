import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import AccountSettingStore from '@/store/local/account-setting.store'
import { GlobalStoreModel } from '@/store/store'
import { AccoutSettingTabEnum, UserType } from '@/utils/type'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { LargeText } from '@/widgets/text'

const MainFrame = tw(Vertical)`
  fixed
  w-80
  h-full
  divide-y
  divide-gray-200
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

const ControlPanel: FunctionComponent = () => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const tabType = AccountSettingStore.useStoreState((state) => state.tabType)
  const setTabType = AccountSettingStore.useStoreActions((action) => action.setTabType)

  const onClick = (value: number) => {
    if (tabType !== value) {
      setTabType(value)
    }
  }

  return (
    <MainFrame>
      <PersonVertical>
        <CircularImage width={80} height={80} src={StorageConst.USER_DEFAULT.src} alt={'Avatar'} />
        <LargeText>{user && user.name}</LargeText>
      </PersonVertical>
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
