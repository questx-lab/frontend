import { FC, Fragment, useEffect, useState } from 'react'

import tw from 'twin.macro'

import CommunityContent from '@/admin-portal/modules/communities/community-table'
import { getPendingCommunitiesApi, listCommunitiesApi } from '@/api/communitiy'
import AdminCommunityStore from '@/store/admin/community'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'
import { Listbox, Transition } from '@headlessui/react'

const GapVertical = tw(VerticalFullWidth)`
    gap-6
    p-6
  `

const Relavite = tw.div`relative`

const FixedWidth = tw.div`w-32 border border-solid border-gray-200 rounded-lg`

const ButtonSelect = tw(
  Listbox.Button
)`cursor-pointer relative w-full cursor-default rounded-lg bg-white py-2`

const OptionSelect = tw(
  Listbox.Option
)`hover:bg-gray-100 relative cursor-pointer select-none py-2 pl-10 pr-4`

enum FilterEnum {
  ACTIVE = 'Active',
  PENDING = 'Pending',
}

const Filter: FC = () => {
  const [callFirst, setCallFirst] = useState<boolean>(true)
  const [selected, setSelected] = useState<FilterEnum>(FilterEnum.ACTIVE)
  const setCommunities = AdminCommunityStore.useStoreActions((action) => action.setCommunities)

  useEffect(() => {
    // Prevent call first time because active community was called in loader
    setCallFirst(false)
    if (!callFirst) {
      if (selected === FilterEnum.ACTIVE) {
        getCommunities()
      } else {
        getPendingCommunities()
      }
    }
  }, [selected])

  const getCommunities = async () => {
    try {
      const { error, data } = await listCommunitiesApi()
      if (error) return
      if (data) {
        setCommunities(data.communities)
      }
    } catch (error) {}
  }

  const getPendingCommunities = async () => {
    try {
      const { error, data } = await getPendingCommunitiesApi()
      if (error) return
      if (data) {
        setCommunities(data.communities)
      }
    } catch (error) {}
  }

  return (
    <FixedWidth>
      <Listbox value={selected} onChange={setSelected}>
        <Relavite>
          <ButtonSelect>{selected}</ButtonSelect>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              <OptionSelect value={FilterEnum.ACTIVE}>{FilterEnum.ACTIVE}</OptionSelect>
              <OptionSelect value={FilterEnum.PENDING}>{FilterEnum.PENDING}</OptionSelect>
            </Listbox.Options>
          </Transition>
        </Relavite>
      </Listbox>
    </FixedWidth>
  )
}

const Community: FC = () => {
  return (
    <GapVertical>
      <HorizontalBetweenCenterFullWidth>
        <Text2xl>{'Communities'}</Text2xl>
        <Filter />
      </HorizontalBetweenCenterFullWidth>
      <CommunityContent />
    </GapVertical>
  )
}

export default Community
