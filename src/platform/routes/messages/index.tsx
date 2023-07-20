import { FC, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'

const Index: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(RouterConst.COMMUNITIES)
  }, [])

  return <>This page does not exist</>
}

export default Index
