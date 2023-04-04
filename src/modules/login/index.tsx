import { RouterConst } from '@/constants/router.const'
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

import AuthType from './auth-type'

export default function LoginView() {
  return (
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
            <Description>{'adipiscing elit. Suspendisse sem eros'}</Description>
            <Description>{'Lscelerisque sed ultricies at'}</Description>
            <Description>{'egestas quis dolor'}</Description>
            <AuthType />
          </Box>
        </Wrap>
        <SkipText href={RouterConst.HOME}>{'Skip For now'}</SkipText>
      </RightSession>
    </Main>
  )
}
