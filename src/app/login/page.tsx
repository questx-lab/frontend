'use client'

import React from 'react'

import LayoutDefault from '@/components/layouts/layout-default'
import { RouterConst } from '@/constants/router.const'
import AuthType from '@/modules/login/auth-type'
import {
  Box,
  Description,
  LeftSession,
  Main,
  RightSession,
  SkipText,
  Title,
  Wrap,
} from '@/styles/login.style'

const LoginPage = () => {
  return (
    <LayoutDefault>
      <Main>
        <header>
          <title>{'Login'}</title>
        </header>
        <LeftSession />
        <RightSession>
          <Wrap>
            <Box>
              <Title>{'Welcome to QuestX'}</Title>
              <Description>
                {'Lorem ipsum dolor sit amet, consectetur'}
              </Description>
              <Description>
                {'adipiscing elit. Suspendisse sem eros'}
              </Description>
              <Description>{'Lscelerisque sed ultricies at'}</Description>
              <Description>{'egestas quis dolor'}</Description>
              <AuthType />
            </Box>
          </Wrap>
          <SkipText href={RouterConst.HOME}>{'Skip For now'}</SkipText>
        </RightSession>
      </Main>
    </LayoutDefault>
  )
}

export default LoginPage
