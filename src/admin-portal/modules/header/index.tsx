import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { HeaderBox } from '@/modules/header'
import { AvatarBox } from '@/modules/header/user-popover'
import { GlobalStoreModel } from '@/store/store'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { Horizontal } from '@/widgets/orientation'
import { PopItem, PopoverPosition, PopPanel } from '@/widgets/popover'
import { Popover } from '@headlessui/react'

const RightSection = tw(Horizontal)`
  w-full
  items-end
  justify-end
`

const Header: FC = () => {
  const navigate = useNavigate()
  // action
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  // handler
  const handleLogout = () => {
    setUser(undefined)
    delCookies()
    clearLocalStorage()

    navigate(RouterConst.HOME)
  }

  return (
    <HeaderBox>
      <RightSection>
        <PopoverPosition>
          <Popover.Button className={'outline-0'}>
            <AvatarBox
              width={40}
              height={40}
              src={StorageConst.USER_DEFAULT.src}
              alt={StorageConst.USER_DEFAULT.alt}
            />
          </Popover.Button>

          <PopPanel>
            <PopItem onClick={handleLogout}>Logout</PopItem>
          </PopPanel>
        </PopoverPosition>
      </RightSection>
    </HeaderBox>
  )
}

export default Header
