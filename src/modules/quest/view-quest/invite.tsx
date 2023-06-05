import { FunctionComponent, useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getMyFollowerInfoApi } from '@/api/communitiy'
import { QuestTypeEnum } from '@/constants/common.const'
import { EnvVariables } from '@/constants/env.const'
import { StorageConst } from '@/constants/storage.const'
import { QuestType } from '@/types'
import { Image } from '@/widgets/image'
import { HorizontalBetweenCenter } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { Label } from '@/widgets/text'

const LinkText = tw.div`
  text-info-700
`

const generateInviteLink = (code: string): string => {
  return `${EnvVariables.FRONTEND_URL}/invites/${code}`
}

export const QuestInvites: FunctionComponent<{ quest: QuestType }> = ({ quest }) => {
  const [inviteCode, setInviteCode] = useState<string>('')

  useEffect(() => {
    if (quest && quest.type === QuestTypeEnum.INVITES) {
      fetchMyFollowerInfo()
    }
  }, [quest])

  const fetchMyFollowerInfo = async () => {
    try {
      // TODO: getMyFollowerInfoApi is broken. Checks with backend and remove this comment when it's
      // fixed.
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

  const link = generateInviteLink(inviteCode)
  const onCopy = () => {
    toast.success('Copied to clipboard successfully')
  }

  return (
    <CopyToClipboard text={link} onCopy={onCopy}>
      <>
        <Divider />
        <Label>Invite link:</Label>
        <HorizontalBetweenCenter>
          <LinkText> {link} </LinkText>
          <Gap width={2} />

          <Image width={30} height={30} src={StorageConst.COPY.src} alt={StorageConst.COPY.alt} />
        </HorizontalBetweenCenter>
      </>
    </CopyToClipboard>
  )
}
