import { FunctionComponent, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { QuestFieldsBox } from '@/modules/create-quest/mini-widget'
import QuestTypeSelection from '@/modules/create-quest/quest-type/selection'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { CommunityType } from '@/utils/type'
import Editor from '@/widgets/editor'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { Horizontal, HorizontalStartCenter, Vertical } from '@/widgets/orientation'
import { Label, Large3xlText } from '@/widgets/text'

const Fullscreen = tw(Vertical)`
  w-full
  h-full
`

const TitleBox = tw(HorizontalStartCenter)`
  px-12
  py-6
  w-full
`

const BodyFrame = styled(Horizontal)<{ isTemplate?: boolean }>(({ isTemplate = false }) => {
  if (isTemplate) {
    return tw`
      w-full
      h-full
      justify-center
      pr-12
      mb-12
    `
  }

  return tw`
    w-full
  `
})

const EditInfoFrame = tw.div`
  w-2/3
  h-full
  bg-white
  py-8
  pl-12
`

const CreateQuestLabel: FunctionComponent<{
  isTemplate?: boolean
}> = ({ isTemplate = false }) => {
  const navigate = useNavigate()
  if (isTemplate) {
    return <></>
  }

  return (
    <>
      <TitleBox>
        <Image
          className='cursor-pointer'
          onClick={() => navigate('../')}
          width={35}
          height={35}
          src={StorageConst.ARROW_BACK_ICON.src}
          alt={StorageConst.ARROW_BACK_ICON.alt}
        />
        <Gap width={3} />
        <Large3xlText>{'Create Quest'}</Large3xlText>
      </TitleBox>
    </>
  )
}

export const CreateQuest: FunctionComponent<{
  communityId: string
  community: CommunityType
  isTemplate?: boolean
  isEdit?: boolean
}> = ({ communityId, isTemplate = false, isEdit = false }) => {
  // Data
  const title = NewQuestStore.useStoreState((state) => state.title)
  const project = NewQuestStore.useStoreState((state) => state.project)
  const description = NewQuestStore.useStoreState((state) => state.description)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Actions
  const setTitle = NewQuestStore.useStoreActions((actions) => actions.setTitle)
  const setDescription = NewQuestStore.useStoreActions((actions) => actions.setDescription)

  return (
    <Fullscreen>
      <CreateQuestLabel isTemplate={isTemplate} />

      <BodyFrame isTemplate={isTemplate}>
        <EditInfoFrame>
          <QuestFieldsBox title={'QUEST TITLE'} required={true}>
            <TextField
              required
              value={title}
              placeholder='The name of the quest is written here.'
              onChange={(e) => setTitle(e.target.value)}
              errorMsg='You must have a quest title to create this quest.'
            />
            <Gap />

            <Label>{'QUEST DESCRIPTION'}</Label>
            <Editor onChange={(value) => setDescription(value)} value={description} />
          </QuestFieldsBox>

          <QuestFieldsBox title={'SUBMISSION TYPE'} required={true}>
            <QuestTypeSelection />
          </QuestFieldsBox>
        </EditInfoFrame>
      </BodyFrame>
    </Fullscreen>
  )
}
