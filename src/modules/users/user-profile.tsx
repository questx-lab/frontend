import { useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'

import { GlobalStoreModel } from '@/store/store'
import { DelBtn, PActionWrap, Pcancel, PSave } from '@/styles/button.style'
import {
  ColCWrap,
  ColSWrap,
  Divider,
  Gap,
  ImgBox,
  MediumTitle,
  RowBWrap,
  RowSWrap,
} from '@/styles/common.style'
import { InputBBox } from '@/styles/input.style'
import { UPWrap } from '@/styles/user.style'
import { clearLocalStorage, delCookies } from '@/utils/helper'
import { Label } from '@/widgets/text'

export default function UserProfileTab({ userId }: { userId: string }) {
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)
  const [isPerson, setIsPerson] = useState<boolean>(false)

  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    if (userState && userState.id === userId) {
      setIsPerson(true)
    }
  }, [])

  const handleLogout = () => {
    setUser({})
    delCookies()
    clearLocalStorage()
  }

  return (
    <>
      <UPWrap>
        <RowSWrap>
          <ImgBox />
          <Gap width={6} height={0} />
          <ColSWrap>
            <Label>{'Username'}</Label>
            <InputBBox
              defaultValue={userState && userState.name}
              placeholder='Username'
            />
            <Gap height={6} />
            <Label>{'Email'}</Label>
            <InputBBox placeholder='Email' />
          </ColSWrap>
        </RowSWrap>
        <Gap height={8} />
        <RowBWrap>
          <ColSWrap>
            <Label>{'Twitter'}</Label>
            <InputBBox placeholder='Twitter handle' />
          </ColSWrap>
          <Gap width={12} />
          <ColSWrap>
            <Label>{'Telegram'}</Label>
            <InputBBox placeholder='Telegram handle' />
          </ColSWrap>
          <Gap width={12} />
          <ColSWrap>
            <Label>{'Discord'}</Label>
            <InputBBox placeholder='Discord handle' />
          </ColSWrap>
        </RowBWrap>
        <Gap height={6} />
        {isPerson && (
          <>
            <Divider />
            <Gap height={2} />
            <PActionWrap>
              <Pcancel>{'view public profile'.toUpperCase()}</Pcancel>
              <Gap width={6} />
              <PSave isBlock={false}>{'update profile'.toUpperCase()}</PSave>
            </PActionWrap>
            <Gap height={8} />
          </>
        )}
      </UPWrap>
      <Gap height={8} />
      <MediumTitle>{'My Badges'}</MediumTitle>
      <Divider />
      <MediumTitle>{'NFT Collection'}</MediumTitle>
      <Divider />
      <RowSWrap>
        <ImgBox />
        <Gap />
        <ImgBox />
        <Gap />
        <ImgBox />
        <Gap />
        <ImgBox />
      </RowSWrap>
      <Divider />
      <ColCWrap>
        <DelBtn onClick={handleLogout}>{'Delete Account'}</DelBtn>
      </ColCWrap>
    </>
  )
}
