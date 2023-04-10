import { useEffect, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import { Spinner } from '@/components/spinner/spinner'
import { StorageConst } from '@/constants/storage.const'
import { SubmitBtn } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  CateTitle,
  HeaderText,
  NotifyBox,
  NotifyText,
  QuestWrap,
  QuestWrapCat,
  SectionBox,
  SectionWrap,
} from '@/styles/home.style'
import { CategoryBox, CategoryItem } from '@/styles/myProjects.style'
import { QuestType } from '@/types/project.type'

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

export default function QuestMod() {
  const pathName = usePathname()
  const router = useRouter()
  const [questTw, setQuestTw] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getQuests()
  }, [pathName])

  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  const listQuests = (
    <SectionBox onClick={() => router.push(pathName + '/twitter-quest')}>
      <Image
        width={50}
        height={50}
        src={StorageConst.TWITTER_DIR.src}
        alt={StorageConst.TWITTER_DIR.alt}
      />
      <Gap height={4} width={0} />
      {`+ Create Twitter quest`}
    </SectionBox>
  )

  const listTwQuests =
    !loading &&
    questTw.map((e, i) => (
      <SectionBox key={i}>
        <Image
          width={50}
          height={50}
          src={StorageConst.TWITTER_DIR.src}
          alt={StorageConst.TWITTER_DIR.alt}
        />
        <Gap height={4} width={0} />
        {e.title ?? ''}
      </SectionBox>
    ))

  const getQuests = async () => {
    try {
      const id = pathName?.split('/').at(-1)
      if (id) {
        const data = await listQuestApi(id)
        if (data.error) {
          toast.error(data.error)
        }
        if (data.data) {
          setQuestTw(data.data?.quests ?? [])
          setLoading(false)
        }
      }
    } catch (error) {
      toast.error('error')
    }
  }

  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
      <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat>
      <Gap height={8} />
      <HeaderText>{'Create New Quest'}</HeaderText>
      <Divider />
      <SectionWrap>{listQuests}</SectionWrap>
      <HeaderText>{'Twitter Quests'}</HeaderText>
      <Divider />
      {!loading && <SectionWrap>{listTwQuests}</SectionWrap>}
      {loading && <Spinner />}
    </QuestWrap>
  )
}
