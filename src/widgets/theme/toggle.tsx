import 'twin.macro'

import React from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'

import { ThemeType } from '@/constants/common.const'
import { GlobalStoreModel } from '@/store/store'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeToggle = () => {
  const theme = useStoreState<GlobalStoreModel>((state) => state.theme)
  const setTheme = useStoreActions<GlobalStoreModel>((action) => action.setTheme)

  function isDark() {
    return theme === ThemeType.DARK
  }

  if (isDark()) {
    return (
      <SunIcon
        onClick={() => setTheme(ThemeType.LIGHT)}
        className='w-6 h-6 text-gray-900 cursor-pointer'
      />
    )
  }

  return (
    <MoonIcon
      onClick={() => setTheme(ThemeType.DARK)}
      className='w-6 h-6 text-gray-900 cursor-pointer'
    />
  )
}

export default ThemeToggle
