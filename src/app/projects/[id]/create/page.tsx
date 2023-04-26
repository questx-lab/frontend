'use client'

import { useState } from 'react'

import Image from 'next/image'

import Editor from '@/components/editor/page'
import Layout from '@/components/layouts/layout'
import SidebarCustom from '@/components/layouts/sidebar'
import { StorageConst } from '@/constants/storage.const'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  InputBox,
  InputInviteBox,
  InputTeleBox,
  MulInputBox,
} from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  BtnUseT,
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CMain,
  CPBox,
  CSide,
  CSideCard,
  ICard,
  ImageQuestBox,
  ItemSide,
  ITypeBox,
  LabelDes,
  LvBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
  PICard,
  PointBox,
  PointInput,
  TitleBox,
  TwitterBox,
  TypeBox,
  UnderText,
  Wrap,
} from '@/styles/questboard.style'

const types = [
  'URL',
  'Image',
  'Text',
  'Quiz',
  'Visit Link',
  'Empty',
  'Twitter',
  'Join Discord',
  'Join Telegram',
  'Invites',
]

const recurrences = ['Once', 'Daily', 'Weekly', 'Monthly']

const rewards = ['Gem', 'Discord Role', 'Other']

type ActionType = {
  name: string
  des: string
  label: string
  key: string
}

const ActionList: ActionType[] = [
  {
    name: 'Follow',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'account_url',
  },
  {
    name: 'Like',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Reply',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'tweet_url',
  },
  {
    name: 'Retweet',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Tweet',
    des: 'This is a subtitle',
    label: 'Default tweet',
    key: 'default_tweet',
  },
  {
    name: 'Join Space',
    des: 'This is a subtitle',
    label: 'Space URL',
    key: 'space_url',
  },
]

export default function Questboard() {
  const [activeType, setActiveType] = useState<number>(0)
  const [activeRecurrence, setActiveRecurrence] = useState<number>(0)
  const [actionTwitter, setActionTwitter] = useState<number[]>([])
  const [activeReward, setActiveReward] = useState<number>(0)
  const [activeSide, setActiveSide] = useState<number>(0)

  const listTypeItems = types.map((e, i) => (
    <TypeBox
      active={activeType === i}
      key={i}
      onClick={() => {
        setActiveType(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listRewards = rewards.map((e, i) => (
    <TypeBox
      active={activeReward === i}
      key={i}
      onClick={() => {
        setActiveReward(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listRecurrenceItems = recurrences.map((e, i) => (
    <TypeBox
      active={activeRecurrence === i}
      key={i}
      onClick={() => {
        setActiveRecurrence(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listTwitterAction = ActionList.map((e, i) => {
    let block = false

    if (actionTwitter.includes(0)) {
      if (i !== 0) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(4)) {
      if (i !== 4) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(5)) {
      if (i !== 5) {
        block = true
      } else {
        block = false
      }
    }

    if (
      actionTwitter.includes(1) ||
      actionTwitter.includes(2) ||
      actionTwitter.includes(3)
    ) {
      if (i !== 1 && i !== 2 && i !== 3) {
        block = true
      } else {
        block = false
      }
    }

    const handleActive = () => {
      if (!actionTwitter.includes(i)) {
        setActionTwitter([...actionTwitter, i])
      } else {
        setActionTwitter(actionTwitter.filter((e) => e !== i))
      }
    }

    let active = 0

    if (block) {
      active = 2
    }

    if (actionTwitter.includes(i)) {
      active = 1
    }

    return (
      <TwitterBox
        active={active}
        key={i}
        onClick={block ? undefined : handleActive}
      >
        {e.name}
      </TwitterBox>
    )
  })

  const actionView = () => {
    switch (activeType) {
      case 0:
        return <></>
      case 4:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'LINK'}</LabelInput>
              <Gap height={2} />
              <InputBox placeholder='https://example.com' />
            </PICard>
          </>
        )

      case 6:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'ACTION'}</LabelInput>
              <Gap height={2} />
              <ITypeBox>{listTwitterAction}</ITypeBox>
            </PICard>
            {actionTwitter.includes(0) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'ACCOUNT URL'}</LabelInput>
                  <Gap height={3} />
                  <MulInputBox
                    rows={3}
                    placeholder='https://twitter.com/elon.musk'
                  />
                </PICard>
              </>
            )}
            {(actionTwitter.includes(1) ||
              actionTwitter.includes(2) ||
              actionTwitter.includes(3)) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'TWEET URL'}</LabelInput>
                  <Gap height={3} />
                  <InputBox placeholder='https://twitter.com/abc' />
                  <Gap height={3} />
                  <LabelDes>{'Post to like/reply/retweet'}</LabelDes>
                </PICard>
              </>
            )}
            {actionTwitter.includes(2) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'DEFAULT REPLY'}</LabelInput>
                  <Gap height={3} />
                  <MulInputBox
                    rows={3}
                    placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
                  />
                  <Gap height={3} />
                  <LabelDes>
                    {'We will prepare a pre-filled reply for the users'}
                  </LabelDes>
                </PICard>
              </>
            )}
            {(actionTwitter.includes(3) || actionTwitter.includes(4)) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'TWEET CONTENT'}</LabelInput>
                  <Gap height={3} />
                  <MulInputBox
                    rows={3}
                    placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
                  />
                </PICard>
              </>
            )}
          </>
        )
      case 8:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'JOIN TELEGRAM'}</LabelInput>
              <Gap height={2} />
              <InputTeleBox placeholder='Telegram invite link' />
              <Gap height={2} />
              <LabelDes>
                {'Invite link should be in the format https://t.me/groupid'}
              </LabelDes>
            </PICard>
          </>
        )
      case 9:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'INVITES'}</LabelInput>
              <Gap height={2} />
              <InputInviteBox defaultValue={10} type='number' />
              <Gap height={2} />
              <LabelDes>
                {'Invited user needs to complete 1 quest for invite to count'}
              </LabelDes>
            </PICard>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>
      <Wrap>
        <SidebarCustom />
        <CMain>
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
              <ItemSide
                onClick={() => setActiveSide(0)}
                active={activeSide === 0}
              >
                <Image
                  width={30}
                  height={30}
                  src={'/images/icons/bolt.svg'}
                  alt={'logo'}
                />
                <Gap width={2} />
                {'QUESTS'}
              </ItemSide>
              <ItemSide
                onClick={() => setActiveSide(1)}
                active={activeSide === 1}
              >
                <Image
                  width={30}
                  height={30}
                  src={'/images/icons/bolt.svg'}
                  alt={'logo'}
                />
                <Gap width={2} />
                {'REVIEW SUBMISSION'}
              </ItemSide>
              <ItemSide
                onClick={() => setActiveSide(2)}
                active={activeSide === 2}
              >
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
          <CBox>
            <CCard>
              <TitleBox>
                <Image
                  className='cursor-pointer'
                  width={35}
                  height={35}
                  src={StorageConst.ARROW_BACK_ICON.src}
                  alt={StorageConst.ARROW_BACK_ICON.alt}
                />
                <Gap width={3} />
                <CHeadling>{'Create Quest'}</CHeadling>
              </TitleBox>
              <Gap height={8} />
              <ICard>
                <PICard>
                  <LabelInput>{'QUEST TITLE'}</LabelInput>
                  <Gap />
                  <InputBox placeholder='The name of the quest is written here.' />
                  <Gap height={6} />
                  <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
                  <Gap />
                  <Editor />
                </PICard>
              </ICard>
              <Gap height={8} />
              <ICard>
                <PICard>
                  <LabelInput>{'SUBMISSION TYPE'}</LabelInput>
                  <Gap height={2} />
                  <ITypeBox>{listTypeItems}</ITypeBox>
                </PICard>
                {actionView()}
              </ICard>
              <Gap height={8} />
              <ICard>
                <PICard>
                  <LabelInput>{'RECURRENCE'}</LabelInput>
                  <Gap height={2} />
                  <ITypeBox>{listRecurrenceItems}</ITypeBox>
                </PICard>
              </ICard>
              <Gap height={8} />
              <BtnWrap>
                <BtnDraft>{'Draft'}</BtnDraft>
                <BtnCreateQuest>{'Publish'}</BtnCreateQuest>
              </BtnWrap>
            </CCard>
            <CSideCard>
              <BtnUseT>{'Use Template'}</BtnUseT>
              <Gap height={5} />
              <ICard>
                <PICard>
                  <LabelInput>{'REWARD'}</LabelInput>
                  <Gap height={2} />
                  <ITypeBox>{listRewards}</ITypeBox>
                  <Gap height={6} />
                  <PointBox>
                    <Image
                      width={30}
                      height={30}
                      src={StorageConst.POINT_ICON.src}
                      alt={StorageConst.POINT_ICON.alt}
                    />
                    <Gap width={2} />
                    <PointInput type='number' min={0} defaultValue={0} />
                  </PointBox>

                  <Gap height={6} />
                  <UnderText>
                    {'Learn more here about how the levels are calculated.'}
                  </UnderText>
                </PICard>
              </ICard>
            </CSideCard>
          </CBox>
        </CMain>
      </Wrap>
    </Layout>
  )
}
