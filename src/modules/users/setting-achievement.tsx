'use client'

import { FunctionComponent } from 'react'

import { NegativeButton, PositiveButton } from '@/widgets/button'
import Image from 'next/image'
import {
  BadgeBox,
  BadgeGrid,
  ButtonBox,
  ContentBox,
  DivideBox,
  HeadBox,
  ProfileSession,
} from './style'

export const Achievement: FunctionComponent = () => {
  return (
    <DivideBox>
      <HeadBox>{'Achievements'}</HeadBox>
      <ContentBox>
        <ProfileSession>
          <BadgeGrid>
            {[...Array.from({ length: 12 }, (x: any, i: any) => i)].map(
              (idx) => (
                <BadgeBox key={idx}>
                  <Image
                    width={180}
                    height={180}
                    src={'/images/dummy/badge.svg'}
                    alt={'Badge'}
                  />
                </BadgeBox>
              )
            )}
          </BadgeGrid>
        </ProfileSession>
        <ProfileSession>
          <ButtonBox>
            <NegativeButton>{'Cancel'}</NegativeButton>
            <PositiveButton>{'Save'}</PositiveButton>
          </ButtonBox>
        </ProfileSession>
      </ContentBox>
    </DivideBox>
  )
}
