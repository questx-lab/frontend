import { FC, useState } from 'react'

import tw from 'twin.macro'

import { CommunitySettingSidebar } from '@/constants/common.const'
import Member from '@/modules/community/settings/member/content/member'
import Role from '@/modules/community/settings/member/content/role'
import MemberSidebar from '@/modules/community/settings/member/sidebar'
import { HorizontalFullWidth } from '@/widgets/orientation'

const Frame = tw(HorizontalFullWidth)`
  w-full
  h-full
  py-4
  px-36
  overflow-y-hidden
`

const ContentFrame = tw.div`
  w-full
  pl-[180px]
  h-full
`

const Content: FC<{ tabSide: CommunitySettingSidebar }> = ({ tabSide }) => {
  if (tabSide === CommunitySettingSidebar.ROLES) {
    return <Role />
  }

  return <Member />
}

const MemberSetting: FC = () => {
  const [tabSide, setTabSide] = useState<CommunitySettingSidebar>(CommunitySettingSidebar.MEMBERS)

  const onTabSide = (tab: CommunitySettingSidebar) => {
    setTabSide(tab)
  }

  return (
    <Frame>
      <MemberSidebar tabSide={tabSide} onTabSide={onTabSide} />
      <ContentFrame>
        <Content tabSide={tabSide} />
      </ContentFrame>
    </Frame>
  )
}

export default MemberSetting
