import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getMyFollowerInfoApi } from '@/api/communitiy'
import { ColorEnum, CommunityRoleEnum, QuestTypeEnum } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import CommunityStore from '@/store/local/community'
import { QuestType } from '@/types/quest'
import { HorizontalCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { SmallSpinner } from '@/widgets/spinner'
import { Label } from '@/widgets/text'
import { ClipboardIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const generateInviteLink = (code: string, communityHandle: string): string => {
  return `${EnvVariables.FRONTEND_URL}/communities/${communityHandle}?invitation=${code}`
}

const CursorLinkBox = tw(HorizontalCenter)`
  cursor-pointer
  gap-1
`

export const QuestInvites: FC<{ quest: QuestType }> = ({ quest }) => {
  const [inviteCode, setInviteCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const role = CommunityStore.useStoreState((state) => state.role)

  useEffect(() => {
    if (quest && quest.type === QuestTypeEnum.INVITES && role === CommunityRoleEnum.GUEST) {
      fetchMyFollowerInfo()
    }
  }, [quest])

  const fetchMyFollowerInfo = async () => {
    setLoading(true)
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
    } finally {
      setLoading(false)
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

  // If user is a owner
  if (
    role &&
    (role === CommunityRoleEnum.OWNER ||
      role === CommunityRoleEnum.EDITOR ||
      role === CommunityRoleEnum.REVIEWER)
  ) {
    return (
      <ColorBox boxColor={ColorEnum.PRIMARY}>
        {'You are a owner, only guest could get invite code'}
      </ColorBox>
    )
  }

  if (loading) {
    return (
      <HorizontalFullWidthCenter>
        <SmallSpinner />
      </HorizontalFullWidthCenter>
    )
  }

  if (!inviteCode) {
    return (
      <ColorBox boxColor={ColorEnum.WARNING}>
        <ExclamationTriangleIcon className='w-6 h-6 text-warning' />
        {'You need to follow this community first to get this invite code'}
      </ColorBox>
    )
  }

  // DONE: Handle logic if user does not follow community
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
