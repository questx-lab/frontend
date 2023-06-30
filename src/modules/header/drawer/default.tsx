import { FC, useEffect, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import { useLocation } from 'react-router-dom'

import { NavigationEnum } from '@/constants/key.const'
import { RouterConst } from '@/constants/router.const'
import { NavigateBox, NavigateOption } from '@/modules/header/drawer/mini-widget'
import { GlobalStoreModel } from '@/store/store'

const DefaultDrawer: FC = () => {
  // hook
  const [navActive, setNavActive] = useState<string>('')
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

  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  return (
    <NavigateBox>
      <NavigateOption
        onClick={() => setShowNavigationDrawer(false)}
        to={RouterConst.COMMUNITIES}
        isactive={navActive === NavigationEnum.COMMUNITY}
      >
        {'Communities'}
      </NavigateOption>
      <NavigateOption
        onClick={() => setShowNavigationDrawer(false)}
        to={RouterConst.QUESTBOARD}
        isactive={navActive === NavigationEnum.QUESTCARD}
      >
        {'Questcard'}
      </NavigateOption>
    </NavigateBox>
  )
}

export default DefaultDrawer
