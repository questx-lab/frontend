import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import {
  Boarding,
  BoardingCard,
  Card,
  CardBox,
  DesQ,
  EndBoarding,
  HeaderBox,
  PointText,
  QuestboardBox,
  StartBoarding,
  TitleQuestBox,
  WrapQuestboard,
} from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'
import { SmallSpinner } from '@/widgets/spinner'

const categories = [
  'NFT',
  'GameFi',
  'DeFi',
  'DAO',
  'SocialFi',
  'Metaverse',
  'Tools',
  'Ecosystem',
  'Others',
]

export default function QuestBoardTab() {
  const pathName = usePathname()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const id = pathName?.split('/').at(-1)
      if (id) {
        const data = await listQuestApi(id)
        if (data.error) {
          toast.error(data.error)
        }
        if (data.data) {
          setListQuests(data.data?.quests ?? [])
          setLoading(false)
        }
      }
    } catch (error) {
      toast.error('error')
    }
  }

  const EmptyQuest = () => <div>{'There are currently no quests'}</div>

  const listQuests =
    questList &&
    questList.map((e) => (
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
    ))

  const listBoarding = [0, 1, 2, 3].map((e) => (
    <BoardingCard key={e}>
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
          <PointText>{'300 Gems'}</PointText>
        </HeaderBox>
        <CardBox>
          <Card>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </BoardingCard>
  ))

  return (
    <QTWrap>
      {/* <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat> */}
      <HeaderText>{'🔥 Trending Quests'}</HeaderText>
      <Gap height={6} />
      <Boarding>{listBoarding}</Boarding>
      <Gap height={6} />
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
  )
}
