import { Fragment, FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { styled } from 'goober'
import tw from 'twin.macro'

import TemplateGroup from '@/modules/create-quest/template-groups/category-group'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/utils/type'
import { GrayBorderBox } from '@/widgets/box'
import { PrimaryText } from '@/widgets/text'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

type TemplateGroupType = {
  name: string
  quests: QuestType[]
}

const BorderBoxFrame = tw(GrayBorderBox)`
  w-80
  h-[calc(100%_-_48px)]
  border-r-[1px]
  fixed
  overflow-y-scroll
  pb-24
  px-6
  pt-2
  rounded-l-lg
`

const DisclosureButton = styled(Disclosure.Button)(tw`
  flex
  w-full
  justify-between
  items-center
  rounded-lg
  px-2
  py-2
  text-left
  text-sm
  font-medium
  text-gray-900
  ring-0
  outline-none
`)

const GroupTitle = tw(PrimaryText)`
  text-lg
`

const TemplateGroupsContent: FunctionComponent<{ templateGroups: TemplateGroupType[] }> = ({
  templateGroups,
}) => {
  if (templateGroups.length === 0) {
    return <Fragment />
  }

  const groupsView = templateGroups.map((e, i) => (
    <Disclosure defaultOpen key={i} as='div'>
      {({ open }) => (
        <>
          <DisclosureButton>
            <GroupTitle>{e.name}</GroupTitle>
            <ChevronUpIcon
              className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-primary`}
            />
          </DisclosureButton>
          <TemplateGroup quests={e.quests} onItemClicked={() => {}} />
        </>
      )}
    </Disclosure>
  ))

  return <>{groupsView}</>
}

const TemplateGroups: FunctionComponent<{ show: boolean }> = ({ show }) => {
  const templates: QuestType[] = useStoreState<GlobalStoreModel>((state) => state.templates)
  if (!show) {
    return <></>
  }

  let templateGroups: TemplateGroupType[] = []
  if (templates && templates.length !== 0) {
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

    templateGroups = names.map((name) => {
      const filters = templates.filter((tem) => tem.category?.name === name)
      return {
        name,
        quests: filters,
      }
    })
  }

  return (
    <BorderBoxFrame>
      <TemplateGroupsContent templateGroups={templateGroups} />
    </BorderBoxFrame>
  )
}

export default TemplateGroups
