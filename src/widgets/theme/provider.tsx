import React, { useEffect } from 'react'

import { useStoreState } from 'easy-peasy'

import { ThemeType } from '@/constants/common.const'
import { GlobalStoreModel } from '@/store/store'
import { getThemeLocal, setThemeLocal } from '@/utils/helper'

export const getInitialTheme = (): ThemeType => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = getThemeLocal()
    if (typeof storedPrefs === 'string') {
      return storedPrefs as ThemeType
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return ThemeType.DARK
    }
  }

  return ThemeType.DARK
}

interface ThemeProviderProps {
  initialTheme?: ThemeType
  children: React.ReactNode
}

const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps): JSX.Element => {
  const theme = useStoreState<GlobalStoreModel>((state) => state.theme)

  const rawSetTheme = (theme: ThemeType) => {
    const root = window.document.documentElement
    const isDark = theme === ThemeType.DARK

    root.classList.remove(isDark ? ThemeType.LIGHT : ThemeType.DARK)
    root.classList.add(theme)

    setThemeLocal(theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return <>{children}</>
}

export default ThemeProvider
