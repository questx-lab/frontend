import { Fragment, FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { newQuestApi } from '@/api/quest'
import { QuestStatusEnum, QuestTypeEnum } from '@/constants/common.const'
import {
  BackButton,
  HorizotalFullWidth,
  Main,
  NextButton,
  Title,
} from '@/modules/create-community/mini-widget'
import NewCommunityStore from '@/store/local/new-community'
import { GlobalStoreModel } from '@/store/store'
import { QuestType, ReqNewQuestType, UserType } from '@/types'
import { CheckBox, CheckBoxSize } from '@/widgets/input'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const WrapBox = tw(HorizontalStartCenter)`
  p-4
  border
  border-solid
  border-gray-300
  text-lg
  font-normal
  text-gray-700
  w-full
  rounded-lg
  gap-3
`

const Content = tw(VerticalFullWidth)`
  max-h-[500px]
  overflow-y-scroll
`

const createQuests = async (quests: QuestType[], communityHandle: string) => {
  if (quests.length) {
    await Promise.all(
      quests.map(async (quest) => {
        try {
          delete quest.category_id
          const payload: ReqNewQuestType = {
            ...quest,
            is_highlight: false,
            status: QuestStatusEnum.ACTIVE,
            community_handle: communityHandle,
          }
          await newQuestApi(payload)
        } catch (error) {}
      })
    )
  }
}

const ListQuests: FunctionComponent<{
  quests: QuestType[]
  questsSelect: QuestType[]
  setQuestsSelect: (e: QuestType[]) => void
}> = ({ quests, setQuestsSelect, questsSelect }) => {
  const onChange = (checked: boolean, quest: QuestType) => {
    if (checked) {
      setQuestsSelect([...questsSelect, quest])
    } else {
      setQuestsSelect([...questsSelect.filter((e) => e.id !== quest.id)])
    }
  }

  const renderQuests =
    quests &&
    quests.map((quest, i) => (
      <WrapBox key={quest.id}>
        <CheckBox
          size={CheckBoxSize.LARGE}
          defaultChecked
          onChange={(e) => onChange(e.target.checked, quest)}
          id='inline-checked-checkbox'
          type='checkbox'
        />
        <NormalText className='line-clamp-1'>{quest.title}</NormalText>
      </WrapBox>
    ))

  return <Fragment>{renderQuests}</Fragment>
}

const Templates: FunctionComponent<{
  questsSelect: QuestType[]
  setQuestsSelect: (e: QuestType[]) => void
}> = ({ questsSelect, setQuestsSelect }) => {
  const [quests, setQuests] = useState<QuestType[]>([])

  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const templates: QuestType[] = useStoreState<GlobalStoreModel>((state) => state.templates)
  useEffect(() => {
    if (templates && user) {
      const data = templates.filter(
        (tem) => tem.type === QuestTypeEnum.URL || tem.type === QuestTypeEnum.EMPTY
      )
      setQuests(data)
      setQuestsSelect(data)
    }
  }, [templates])

  if (quests && quests.length === 0) {
    return <></>
  }

  return (
    <Content>
      <ListQuests quests={quests} questsSelect={questsSelect} setQuestsSelect={setQuestsSelect} />
    </Content>
  )
}

const GenerateQuest: FunctionComponent = () => {
  const [questsSelect, setQuestsSelect] = useState<QuestType[]>([])
  const createdCommunityHandle = NewCommunityStore.useStoreState(
    (state) => state.createdCommunityHandle
  )
  return (
    <Main>
      <Title>{'Well done!'}</Title>
      <NormalText className='text-start'>
        {"It's almost done. Would you like us to create some opening quests for you?"}
      </NormalText>
      <Templates questsSelect={questsSelect} setQuestsSelect={setQuestsSelect} />
      <HorizotalFullWidth>
        <BackButton />
        <NextButton onClick={() => createQuests(questsSelect, createdCommunityHandle)} />
      </HorizotalFullWidth>
    </Main>
  )
}

export default GenerateQuest
