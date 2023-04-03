import { SubmitBtn } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { NotifyBox, NotifyText, QuestWrap } from '@/styles/home.style'

export default function ReviewSubMitMod() {
  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
    </QuestWrap>
  )
}
