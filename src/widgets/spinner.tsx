import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { SpinnerStyle } from '@/styles/common.style'

const Wrap = tw.div`
  h-screen
  flex
  justify-center
  items-center
`

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
