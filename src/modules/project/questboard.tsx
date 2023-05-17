import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { StorageConst } from '@/constants/storage.const'
import { Quests } from '@/modules/quests/quest-list'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import {
  BoardingCard,
  Card,
  CardBox,
  DesQ,
  EndBoarding,
  HeaderBox,
  PointText,
  StartBoarding,
  TitleQuestBox,
} from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'

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
    <VerticalFullWidth>
      {/* <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat> */}
      <HeaderText>{'🔥 Trending Quests'}</HeaderText>
      <Gap height={6} />
      <Horizontal>{listBoarding}</Horizontal>
      <Gap height={6} />
      <Quests questList={questList} show={!loading} />
    </VerticalFullWidth>
  )
}
