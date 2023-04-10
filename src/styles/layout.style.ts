import styled from 'styled-components'
import tw from 'twin.macro'

type NavType = {
  isOpen: boolean
}

export const Main = tw.main`
  max-h-screen
  flex
  flex-col
  
`

export const Html = styled.html<NavType>(({ isOpen }) => [
  isOpen ? tw`overflow-hidden` : tw``,
])
