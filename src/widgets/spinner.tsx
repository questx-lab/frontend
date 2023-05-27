import React from 'react'

import { MoonLoader } from 'react-spinners'

import { SpinnerStyle } from '@/styles/common.style'
import { Wrap } from '@/styles/spinner.style'

import { VerticalBetween } from './orientation'

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
  <VerticalBetween>
    <MoonLoader
      color={'#000'}
      loading={true}
      cssOverride={SpinnerStyle}
      size={30}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  </VerticalBetween>
)
