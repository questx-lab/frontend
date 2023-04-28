'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import SidebarCustom from '@/components/layouts/sidebar'
import { SmallSpinner } from '@/components/spinner/spinner'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { PSave } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import {
  Boarding,
  BoardingCard,
  Card,
  CardBox,
  CBox,
  CHeading,
  CPBox,
  CSide,
  DesQ,
  EndBoarding,
  HeaderBox,
  ImageQuestBox,
  ItemSide,
  LvBox,
  MBox,
  MHeader,
  MMain,
  MPadding,
  Mtemplate,
  MTitleBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
  PointText,
  QuestboardBox,
  SeeAllText,
  StartBoarding,
  TitleQuestBox,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'

export default function ManageProject({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [activeSide, setActiveSide] = useState<number>(0)
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await listQuestApi(projectId)
      if (data.error) {
        toast.error(data.error)
      }
      if (data.data) {
        setListQuests(data.data?.quests ?? [])
        setLoading(false)
      }
    } catch (error) {
      toast.error('error')
    }
  }

  const listQuests = questList && [
    ...questList.map((e) => (
      <QuestboardBox key={e.id}>
        <StartBoarding>
          <Gap height={4} />
          <TitleQuestBox>{`🎉 ${e.title}`}</TitleQuestBox>
          <Gap height={4} />
          <DesQ>
            {e.description ?? 'Please visit Manta Network official website'}
          </DesQ>
        </StartBoarding>
        <EndBoarding>
          <HeaderBox>
            <Image
              width={25}
              height={25}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{`300 Gems`}</PointText>
          </HeaderBox>
          {e.recurrence && (
            <CardBox>
              <Card>{e.recurrence.toUpperCase()}</Card>
              <Gap width={2} />
            </CardBox>
          )}
        </EndBoarding>
      </QuestboardBox>
    )),
    <QuestboardBox
      onClick={() => router.push(RouterConst.PROJECT + projectId + '/create')}
      key={'x'}
    >
      <Image
        width={50}
        height={50}
        src={StorageConst.ADD_ICON.src}
        alt={StorageConst.ADD_ICON.alt}
      />
    </QuestboardBox>,
  ]

  const listBoarding = [0, 1, 2, 3].map((e) => (
    <BoardingCard manage key={e}>
      <StartBoarding>
        <TitleQuestBox>{'Join Discord 👾'}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>
          {'Get a Discord Role and introduce yourself to the community.'}
        </DesQ>
      </StartBoarding>
      <EndBoarding>
        <HeaderBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <Gap width={2} />
          <PointText>{'N/A'}</PointText>
        </HeaderBox>
        <CardBox>
          <Card>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </BoardingCard>
  ))

  const EmptyQuest = () => <div>{'There are currently no quests'}</div>

  return (
    <Wrap>
      <SidebarCustom />
      <MMain>
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
          <MBox>
            <MPadding>
              <MHeader>
                <CHeading>{'Quest'}</CHeading>
                <PSave
                  onClick={() =>
                    router.push(RouterConst.PROJECT + projectId + '/create')
                  }
                  isBlock={false}
                >
                  {'+  Create Quest'}
                </PSave>
              </MHeader>
            </MPadding>
            <Gap height={6} />
            <Mtemplate>
              <MTitleBox>
                <HeaderText>{'🌟 Templates'}</HeaderText>
                <SeeAllText>{'See all Templates'}</SeeAllText>
              </MTitleBox>
              <Gap height={6} />
              <Boarding>{listBoarding}</Boarding>
            </Mtemplate>
            <Gap height={6} />

            <MPadding>
              <QTWrap>
                <HeaderText>{'👋 Onboarding'}</HeaderText>
                <Gap height={6} />
                {/* <Divider /> */}
                {loading && <SmallSpinner />}
                {!loading && (
                  <WrapQuestboard>
                    {!questList.length ? <EmptyQuest /> : listQuests}
                  </WrapQuestboard>
                )}
                <Gap height={6} />
                <HeaderText>{'👌 Invite'}</HeaderText>
                <Gap height={6} />
                {/* <Divider /> */}
                {loading && <SmallSpinner />}
                {!loading && (
                  <WrapQuestboard>
                    {!questList.length ? <EmptyQuest /> : listQuests}
                  </WrapQuestboard>
                )}
              </QTWrap>
            </MPadding>
          </MBox>
        </CBox>
      </MMain>
    </Wrap>
  )
}
