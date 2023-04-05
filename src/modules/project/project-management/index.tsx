import { AddRoleBtn, SubmitBtn } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import {
  MBtn,
  MWrapBtn,
  NotifyBox,
  NotifyText,
  PTable,
  PTableWrap,
  PTd,
  PTh,
  PThead,
  PTr,
  QuestWrap,
} from '@/styles/home.style'

export default function PManageMod() {
  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
      <MWrapBtn>
        <MBtn>{'1 Flowwers'}</MBtn>
        <MBtn>{'1 New followers in 7days'}</MBtn>
        <MBtn>{'0 Quests'}</MBtn>
      </MWrapBtn>
      <Gap height={8} />
      <AddRoleBtn>{'add new role'.toUpperCase()}</AddRoleBtn>
      <Gap height={8} />
      <PTableWrap>
        <PTable>
          <PThead>
            <tr>
              <PTh scope='col'>Usernam</PTh>
              <PTh scope='col'>Email</PTh>
              <PTh scope='col'>MetaMask</PTh>
              <PTh scope='col'>Discord</PTh>
              <PTh scope='col'>Telegram</PTh>
              <PTh scope='col'>Role</PTh>
            </tr>
          </PThead>
          <tbody>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
          </tbody>
        </PTable>
      </PTableWrap>
    </QuestWrap>
  )
}
