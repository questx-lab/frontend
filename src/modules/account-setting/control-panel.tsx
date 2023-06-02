import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { SettingEnum } from '@/modules/account-setting/mini-widget'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'
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

const ControlPanel: FunctionComponent<{
  settingActive: number
  setSettingActive: (value: number) => void
}> = ({ settingActive, setSettingActive }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const onClick = (value: number) => {
    if (settingActive !== value) {
      setSettingActive(value)
    }
  }

  return (
    <MainFrame>
      <PersonVertical>
        <Image
          className='rounded-full'
          width={80}
          height={80}
          src={StorageConst.USER_DEFAULT.src}
          alt={'Avatar'}
        />
        <LargeText>{user && user.name}</LargeText>
      </PersonVertical>
      <SettingVertical>
        <SettingItemHorizontal
          onClick={() => onClick(SettingEnum.GENERAL)}
          active={settingActive === SettingEnum.GENERAL}
        >
          <span>{'👋'}</span>
          <span>{'GENERAL'}</span>
        </SettingItemHorizontal>
        <SettingItemHorizontal
          onClick={() => onClick(SettingEnum.ACHIEVEMENTS)}
          active={settingActive === SettingEnum.ACHIEVEMENTS}
        >
          <span>{'🎉'}</span>
          <span>{'ACHIEVEMENTS'}</span>
        </SettingItemHorizontal>
      </SettingVertical>
    </MainFrame>
  )
}

export default ControlPanel
