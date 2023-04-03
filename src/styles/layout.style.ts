import styled from 'styled-components'
import tw from 'twin.macro'

type NavType = {
  isOpen: boolean
}

export const Main = tw.main`
  min-h-screen
  flex
  flex-col
  relative
`

export const Html = styled.html<NavType>(({ isOpen }) => [
  isOpen ? tw`overflow-hidden` : tw``,
])
