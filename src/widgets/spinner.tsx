import { CSSProperties } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

const Wrap = tw.div`
  w-full
  h-screen
  flex
  justify-center
  items-center
`

export const SpinnerStyle: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#000',
}

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
