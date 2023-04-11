import { useState } from 'react'

import Image from 'next/image'

import SidebarCustom from '@/components/layouts/sidebar'
import { StorageConst } from '@/constants/storage.const'
import { PFollow } from '@/styles/button.style'
import { Gap, SmallTitle } from '@/styles/common.style'
import {
  LHBox,
  LHDes,
  LHeader,
  LHImg,
  LHInfoA,
  LHInfoB,
  LHInfoC,
  LHLogo,
  LHTitle,
  LHTitleBox,
  LSBox,
  LTabSide,
  LTabWrap,
  LTInvite,
  Main,
  Wrap,
} from '@/styles/leaderboard.style'

import QuestBoardTab from './questboard/page'

export default function Leaderboard() {
  const [tab, setTab] = useState<boolean>(true)

  return (
    <Wrap>
      <SidebarCustom />
      <Main>
        <LHeader>
          <LHInfoA>
            <LHImg />
            <Gap width={4} />
            <LHBox>
              <LHTitleBox>
                <LHTitle>{'Project name'}</LHTitle>
                <Gap height={4} />
                <LHLogo>
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.TWITTER_DIR.src}
                    alt={StorageConst.TWITTER_DIR.alt}
                  />
                  <Gap width={2} height={0} />
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.DISCORD_DIR.src}
                    alt={StorageConst.DISCORD_DIR.alt}
                  />
                  <Gap width={2} height={0} />
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.METAMASK_DIR.src}
                    alt={StorageConst.METAMASK_DIR.alt}
                  />
                </LHLogo>
              </LHTitleBox>
              <Gap height={4} />
              <LHDes>{'Supendisse eros, scelerique sed iltri cies at,'}</LHDes>
              <LHDes>{'egestas, quis dolor est dosit merta'}</LHDes>
            </LHBox>
          </LHInfoA>
          <Gap height={4} />
          <LHInfoB>
            <LSBox>
              <SmallTitle>{'32'}</SmallTitle>
              <LHDes>{'Quests'}</LHDes>
            </LSBox>
            <Gap width={6} />
            <LSBox>
              <SmallTitle>{'7.2K'}</SmallTitle>
              <LHDes>{'Follower'}</LHDes>
            </LSBox>
            <Gap width={6} />
            <LSBox>
              <SmallTitle>{'30 Mar, 23'}</SmallTitle>
              <LHDes>{'Project created'}</LHDes>
            </LSBox>
          </LHInfoB>
          <LHInfoC>
            <PFollow>{'FOLLOW'}</PFollow>
            <Gap height={8} />
            <LTInvite>{'Invite Friends'}</LTInvite>
          </LHInfoC>
        </LHeader>
        <Gap height={8} />
        <LTabWrap>
          <LTabSide active={tab} onClick={() => setTab(true)}>
            {'QUESTBOARD'}
          </LTabSide>
          <LTabSide active={!tab} onClick={() => setTab(false)}>
            {'JOIN TOWHALL'}
          </LTabSide>
        </LTabWrap>
        <Gap height={8} />
        {tab && <QuestBoardTab />}
      </Main>
    </Wrap>
  )
}
