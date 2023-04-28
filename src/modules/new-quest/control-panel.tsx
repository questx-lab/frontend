'use client'

import { FunctionComponent } from 'react'

import Image from 'next/image'

import { Divider, Gap } from '@/styles/common.style'
import {
  CPBox,
  CSide,
  ImageQuestBox,
  ItemSide,
  LvBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
} from '@/styles/questboard.style'

const ControlPanel: FunctionComponent<{}> = () => {
  return (
    <CSide>
      <PersonWrap>
        <ImageQuestBox
          width={80}
          height={80}
          src={'/images/dummy/1.svg'}
          alt={'Avatar'}
        />
        <Gap height={6} />
        <PersonInfoBox>
          <PersonName>{'ThanhChi'}</PersonName>
          <Gap width={1} />
          <LvBox>{'lvl.3'}</LvBox>
        </PersonInfoBox>
        <Gap height={3} />
        <PersonDes>
          {'Short description. Lorem ipsum dolor sit amt, consectetur'}
        </PersonDes>
      </PersonWrap>
      <Divider />
      <CPBox>
        <ItemSide>
          <Image
            width={30}
            height={30}
            src={'/images/icons/bolt.svg'}
            alt={'logo'}
          />
          <Gap width={2} />
          {'QUESTS'}
        </ItemSide>
        <ItemSide>
          <Image
            width={30}
            height={30}
            src={'/images/icons/bolt.svg'}
            alt={'logo'}
          />
          <Gap width={2} />
          {'REVIEW SUBMISSION'}
        </ItemSide>
        <ItemSide>
          <Image
            width={30}
            height={30}
            src={'/images/icons/bolt.svg'}
            alt={'logo'}
          />
          <Gap width={2} />
          {'SETTINGS'}
        </ItemSide>
      </CPBox>
    </CSide>
  )
}

export default ControlPanel
