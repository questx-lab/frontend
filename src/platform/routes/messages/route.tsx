import { FC, useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import { isLogin } from '@/utils/helper'

const Messages: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin()) {
      navigate(RouterConst.COMMUNITIES)
    }
  }, [])

  return <Outlet />
}

export default Messages
