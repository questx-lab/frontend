import React from 'react'

import { MoonLoader } from 'react-spinners'

import { SpinnerStyle } from '@/styles/common.style'
import { Wrap } from '@/styles/spinner.style'

export const Spinner = () => (
  <Wrap>
    <MoonLoader
      color={'#000'}
      loading={true}
      cssOverride={SpinnerStyle}
      size={50}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  </Wrap>
)

export const SmallSpinner = () => (
  <MoonLoader
    color={'#000'}
    loading={true}
    cssOverride={SpinnerStyle}
    size={30}
    aria-label='Loading Spinner'
    data-testid='loader'
  />
)
