import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getMyFollowerInfoApi } from '@/api/communitiy'
import { ColorEnum, CommunityRoleEnum, QuestTypeEnum } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import CommunityStore from '@/store/local/community'
import { QuestType } from '@/types/quest'
import { HorizontalCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label } from '@/widgets/text'
import { ClipboardIcon } from '@heroicons/react/24/outline'

const generateInviteLink = (code: string, communityHandle: string): string => {
  return `${EnvVariables.FRONTEND_URL}/communities/${communityHandle}?invitation=${code}`
}

const CursorLinkBox = tw(HorizontalCenter)`
  cursor-pointer
  gap-1
`

export const QuestInvites: FC<{ quest: QuestType }> = ({ quest }) => {
  const [inviteCode, setInviteCode] = useState<string>('')
  const role = CommunityStore.useStoreState((state) => state.role)

  useEffect(() => {
    if (quest && quest.type === QuestTypeEnum.INVITES && role === CommunityRoleEnum.GUEST) {
      fetchMyFollowerInfo()
    }
  }, [quest])

  const fetchMyFollowerInfo = async () => {
    try {
      const resp = await getMyFollowerInfoApi(quest.community.handle)
      if (resp.error) {
        toast.error(resp.error)
        return
      }

      if (!resp.data) {
        toast.error('Can not get follower info')
        return
      }

      setInviteCode(resp.data.invite_code || '')
    } catch (error) {
      toast.error(error as string)
    }
  }

  const link = generateInviteLink(inviteCode, quest.community.handle)
  const onCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link)
      toast('Copied!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }

  // TODO: Handle logic if user does not follow community
  // Block when integrate unclaimable quest
  return (
    <>
      <Label>{'Invite link:'}</Label>
      <CursorLinkBox onClick={onCopy}>
        <ColorBox boxColor={ColorEnum.SUCCESS}> {link} </ColorBox>
        <Gap width={2} />
        <ClipboardIcon className='w-7 h-7' />
      </CursorLinkBox>
    </>
  )
}
