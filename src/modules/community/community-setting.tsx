import { useRef } from 'react'

import { toast } from 'react-hot-toast'

import { updateCommunityApi } from '@/app/api/client/community'
import { CommunityStore } from '@/store/local/community.store'
import {
  ConnectedTwitterBtn,
  PActionWrap,
  Pcancel,
  PSave,
  SubmitBtn,
} from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  NotifyBox,
  NotifyText,
  PCategoryItem,
  PCateWrap,
  PHalfSession,
  PHalfWrap,
  PInputBlock,
  PLabel,
  PSessionL,
  PSessionLogo,
  PSessionR,
  PWrap,
  QuestWrap,
} from '@/styles/home.style'
import { InputBox, MulInputBox } from '@/styles/input.style'
import { ReqUpdateCommunity } from '@/utils/type'
import { VerticalFullWidth } from '@/widgets/orientation'

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

export default function CommunitySetting() {
  const nameRef = useRef<HTMLInputElement>(null)
  const introRef = useRef<HTMLTextAreaElement>(null)
  const telRef = useRef<HTMLInputElement>(null)
  const webRef = useRef<HTMLInputElement>(null)
  const discordRef = useRef<HTMLInputElement>(null)

  const projectState = CommunityStore.useStoreState((state) => state.project)

  const listCategory = categories.map((e, i) => (
    <PCategoryItem key={i}>{e}</PCategoryItem>
  ))

  const handleSave = async () => {
    try {
      const payload: ReqUpdateCommunity = {
        id: projectState.id ?? '',
        discord: discordRef.current?.value,
        telegram: telRef.current?.value,
      }
      const rs = await updateCommunityApi(payload)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        toast.success('Update success')
      }
    } catch (error) {
      toast.error('Update project information fail')
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
      {projectState && (
        <PWrap>
          <PSessionL>
            <PSessionLogo />
            <Gap width={8} />
            <VerticalFullWidth>
              <PLabel>{'Project Name*'}</PLabel>
              <Gap height={4} />
              <InputBox
                disabled
                ref={nameRef}
                defaultValue={projectState.display_name}
              />
              <Gap height={8} />
              <PLabel>{'Project URL*'}</PLabel>
              <Gap height={4} />
              <PInputBlock>{'QuestX.com/Quest001'}</PInputBlock>
            </VerticalFullWidth>
          </PSessionL>
          <Gap width={0} height={8} />
          <PSessionR>
            <PLabel>{'Project Introduction*'}</PLabel>
            <Gap height={4} />
            <MulInputBox ref={introRef} />
          </PSessionR>
        </PWrap>
      )}
      <Gap height={8} />
      {projectState && (
        <PHalfWrap>
          <PHalfSession>
            <PHalfWrap>
              <PHalfSession>
                <PLabel>{'Project Category'}</PLabel>
                <Gap />
                <PCateWrap>{listCategory}</PCateWrap>
              </PHalfSession>
              <Gap height={8} width={0} />
              <PHalfSession>
                <PLabel>{'Twitter'}</PLabel>
                <Gap height={4} />
                <ConnectedTwitterBtn>
                  {'connected with twitter'.toUpperCase()}
                </ConnectedTwitterBtn>
              </PHalfSession>
            </PHalfWrap>
            <Gap height={8} width={0} />
            <PLabel>{'Telegram'}</PLabel>
            <Gap height={4} />
            <InputBox
              ref={telRef}
              defaultValue={projectState.telegram}
              placeholder='Enter Telegram URL'
            />
          </PHalfSession>
          <Gap height={8} width={0} />
          <PHalfSession postion>
            <PLabel>{'Website'}</PLabel>
            <Gap height={4} />
            <InputBox placeholder='Enter Website URL' />
            <Gap height={8} />

            <PLabel>{'Discord'}</PLabel>
            <Gap height={4} />
            <InputBox
              ref={discordRef}
              defaultValue={projectState.discord}
              placeholder='Enter Discord URL'
            />
          </PHalfSession>
        </PHalfWrap>
      )}
      <Gap height={8} />
      <Divider />
      <Gap height={8} />
      <PActionWrap>
        <Pcancel>{'cancel'.toUpperCase()}</Pcancel>
        <Gap width={6} />
        <PSave onClick={handleSave} isBlock={false}>
          {'save changes'.toUpperCase()}
        </PSave>
      </PActionWrap>
      <Gap height={8} />
    </QuestWrap>
  )
}
