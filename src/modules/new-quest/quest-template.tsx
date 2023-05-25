import { Fragment, FunctionComponent, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import Image from 'next/image'
import tw from 'twin.macro'

import { SizeEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { GlobalStoreModel } from '@/store/store'
import { Gap } from '@/styles/common.style'
import {
  Card,
  CardBox,
  DesQ,
  DisclosureBtn,
  DisclosurePanel,
  DisclosureTitle,
  EndBoarding,
  HeaderBox,
  PointText,
  StartBoarding,
  TBoardingCard,
  TitleQuestBox,
  TLSide,
} from '@/styles/questboard.style'
import { QuestType } from '@/utils/type'
import { PositiveButton } from '@/widgets/button'
import { BasicModal } from '@/widgets/modal'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

import { handleTemplate } from './quest-frame'

const ModelBox = tw(VerticalFullWidthCenter)`
  h-full
  gap-6
`

const Panel: FunctionComponent<{ quests: QuestType[] }> = ({ quests }) => {
  // Actions
  const setTitle = NewQuestStore.useStoreActions((actions) => actions.setTitle)
  const setDescription = NewQuestStore.useStoreActions(
    (actions) => actions.setDescription
  )

  const setRecurrence = NewQuestStore.useStoreActions(
    (actions) => actions.setRecurrence
  )

  const setQuestType = NewQuestStore.useStoreActions(
    (actions) => actions.setQuestType
  )
  const setAccountLink = NewQuestStore.useStoreActions(
    (actions) => actions.setAccountLink
  )
  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setAnswer = NewQuestStore.useStoreActions(
    (actions) => actions.setAnswer
  )
  const setVisitLink = NewQuestStore.useStoreActions(
    (actions) => actions.setVisitLink
  )
  const setTelegramLink = NewQuestStore.useStoreActions(
    (actions) => actions.setTelegramLink
  )
  const setInvites = NewQuestStore.useStoreActions(
    (actions) => actions.setInvites
  )

  const setActionTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setActionTwitter
  )

  const setTweetUrl = NewQuestStore.useStoreActions(
    (actions) => actions.setTweetUrl
  )
  const setReplyTwitter = NewQuestStore.useStoreActions(
    (actions) => actions.setReplyTwitter
  )

  // hook
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [questTemplate, setQuestTemplate] = useState<QuestType>()

  // handler
  const onTemplate = () => {
    if (questTemplate) {
      handleTemplate(
        setTitle,
        setDescription,
        setRecurrence,
        setQuestType,
        setAccountLink,
        setTextAutoValidation,
        setAnswer,
        setVisitLink,
        setTelegramLink,
        setInvites,
        setActionTwitter,
        setTweetUrl,
        setReplyTwitter,
        questTemplate
      )
      setOpenModal(false)
    }
  }

  const onOpenModal = (quest: QuestType) => {
    setOpenModal(true)
    setQuestTemplate(quest)
  }

  if (quests && quests.length !== 0) {
    const listPanel = quests.map((e) => (
      <DisclosurePanel key={e.id} onClick={() => onOpenModal(e)}>
        <TBoardingCard>
          <StartBoarding>
            <TitleQuestBox>{e.title}</TitleQuestBox>
            <Gap height={4} />
            <DesQ>{e.description}</DesQ>
          </StartBoarding>
          <EndBoarding>
            <HeaderBox>
              <Image
                width={25}
                height={25}
                src={StorageConst.POINT_ICON.src}
                alt={StorageConst.POINT_ICON.alt}
              />
              <Gap width={2} />
              <PointText>
                {e.rewards && e.rewards.length > 0 && e.rewards[0].data.points}
              </PointText>
            </HeaderBox>
            <CardBox>
              <Card>{e.recurrence}</Card>
              <Gap width={2} />
            </CardBox>
          </EndBoarding>
        </TBoardingCard>
      </DisclosurePanel>
    ))

    return (
      <Fragment>
        {listPanel}
        <BasicModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          styled='!h-[400px]'
        >
          <ModelBox>
            <VerticalFullWidthCenter>
              <NormalText>{'Do you want to replace this quest'}</NormalText>
              <NormalText>{'Feel free press Use Template below'}</NormalText>
            </VerticalFullWidthCenter>

            <PositiveButton onClick={onTemplate} width={SizeEnum.x48}>
              {'Use Template'}
            </PositiveButton>
          </ModelBox>
        </BasicModal>
      </Fragment>
    )
  }

  return <Fragment />
}

export default function QuestTemplate() {
  const templates: QuestType[] = useStoreState<GlobalStoreModel>(
    (state) => state.templates
  )

  let closures: { name: string; quests: QuestType[] }[] = []
  if (templates) {
    const names = Array.from(
      new Set(
        templates.map((e) => {
          if (e.category) {
            return e.category.name
          }
          return ''
        })
      )
    )

    closures = names.map((name) => {
      const filters = templates.filter((tem) => tem.category?.name === name)
      return {
        name,
        quests: filters,
      }
    })
  }

  const listClosure = closures.map((e, i) => (
    <Disclosure defaultOpen key={i} as='div'>
      {({ open }) => (
        <>
          <DisclosureBtn>
            <DisclosureTitle>{e.name}</DisclosureTitle>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-primary`}
            />
          </DisclosureBtn>
          <Panel quests={e.quests} />
          {/* {listPanel} */}
        </>
      )}
    </Disclosure>
  ))

  return <TLSide>{listClosure}</TLSide>
}
