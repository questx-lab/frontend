import {
  ConnectedTwitterBtn,
  Pcancel,
  PSave,
  SubmitBtn,
} from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  NotifyBox,
  NotifyText,
  PActionWrap,
  PCategoryItem,
  PCateWrap,
  PHalfSession,
  PHalfWrap,
  PInputBlock,
  PLabel,
  PSessionL,
  PSessionLChild,
  PSessionLogo,
  PSessionR,
  PWrap,
  QuestWrap,
} from '@/styles/home.style'
import { InputBox, MulInputBox } from '@/styles/input.style'

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

export default function ProjectSettingMod() {
  const listCategory = categories.map((e, i) => (
    <PCategoryItem key={i}>{e}</PCategoryItem>
  ))

  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
      <PWrap>
        <PSessionL>
          <PSessionLogo />
          <Gap width={8} />
          <PSessionLChild>
            <PLabel>{'Project Name*'}</PLabel>
            <Gap height={4} />
            <InputBox defaultValue={'Quest001'} />
            <Gap height={8} />
            <PLabel>{'Project URL*'}</PLabel>
            <Gap height={4} />
            <PInputBlock>{'QuestX.com/Quest001'}</PInputBlock>
          </PSessionLChild>
        </PSessionL>
        <Gap width={0} height={8} />
        <PSessionR>
          <PLabel>{'Project Introduction*'}</PLabel>
          <Gap height={4} />
          <MulInputBox />
        </PSessionR>
      </PWrap>
      <Gap height={8} />
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
          <InputBox placeholder='Enter Telegram URL' />
        </PHalfSession>
        <Gap height={8} width={0} />
        <PHalfSession postion>
          <PLabel>{'Website'}</PLabel>
          <Gap height={4} />
          <InputBox placeholder='Enter Website URL' />
          <Gap height={8} />

          <PLabel>{'Discord'}</PLabel>
          <Gap height={4} />
          <InputBox placeholder='Enter Discord URL' />
        </PHalfSession>
      </PHalfWrap>
      <Gap height={8} />
      <Divider />
      <Gap height={8} />
      <PActionWrap>
        <Pcancel>{'cancel'.toUpperCase()}</Pcancel>
        <Gap width={6} />
        <PSave isBlock={false}>{'save changes'.toUpperCase()}</PSave>
      </PActionWrap>
      <Gap height={8} />
    </QuestWrap>
  )
}
