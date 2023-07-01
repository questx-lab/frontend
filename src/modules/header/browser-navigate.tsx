import { FC, useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavigationEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { Horizontal } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'

export const BoxLink = tw(Horizontal)`
  h-full
  w-full
  items-center
  max-md:hidden
  gap-6
`

export const Route = styled(Link)(
  tw`
    relative
    text-black
    text-xl
    font-light
    cursor-pointer
    flex
    flex-col
    justify-center
    items-center
    h-full
  `
)

export const Underline = tw.div`
  h-[5px]
  bg-primary-600
  w-full
  rounded-t-lg
  absolute
  bottom-0
`

const MediumTextSm = tw(TextSm)`
  font-medium
`

const BrowserNavigation: FC = () => {
  const [navActive, setNavActive] = useState<string>('')
  // hook
  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes(NavigationEnum.COMMUNITY)) {
      setNavActive(NavigationEnum.COMMUNITY)
    } else if (location.pathname.includes(NavigationEnum.QUESTCARD)) {
      setNavActive(NavigationEnum.QUESTCARD)
    } else {
      setNavActive(NavigationEnum.HOME)
    }
  }, [location])

  return (
    <BoxLink>
      <Route to={RouterConst.COMMUNITIES}>
        <MediumTextSm>{'Communities'}</MediumTextSm>
        {navActive === NavigationEnum.COMMUNITY && <Underline />}
      </Route>
      <Route to={RouterConst.QUESTBOARD}>
        <MediumTextSm>{'QuesterCamp'}</MediumTextSm>
        {navActive === NavigationEnum.QUESTCARD && <Underline />}
      </Route>
    </BoxLink>
  )
}

export default BrowserNavigation
