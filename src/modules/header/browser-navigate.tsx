import { FC, useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { NavigationEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { Horizontal } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

export const BoxLink = tw(Horizontal)`
  h-full
  w-full
  items-center
  max-md:hidden
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
    px-4
  `
)

export const Underline = tw.div`
  h-[5px]
  bg-primary-600
  w-full
  rounded-t-full
  absolute
  bottom-0
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
        <TextBase>{'Communities'}</TextBase>
        {navActive === NavigationEnum.COMMUNITY && <Underline />}
      </Route>
      <Route to={RouterConst.QUESTBOARD}>
        <TextBase>{'QuesterCamp'}</TextBase>
        {navActive === NavigationEnum.QUESTCARD && <Underline />}
      </Route>
    </BoxLink>
  )
}

export default BrowserNavigation
