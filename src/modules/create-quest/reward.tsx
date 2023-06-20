import { FC, useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { DiscordRoleType } from '@/types'
import { SocialBox } from '@/modules/header/login'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import StorageConst from '@/constants/storage.const'
import NewQuestStore from '@/store/local/new-quest'
import { RoundedGrayBorderBox } from '@/widgets/box'
import { Image } from '@/widgets/image'
import { NumberInput } from '@/widgets/input'
import { Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label } from '@/widgets/text'
import CommunityStore from '@/store/local/community'
import { getDiscordRolesApi } from '@/api/communitiy'
import { toast } from 'react-hot-toast'
import { HorizontalFullWidth } from '@/widgets/orientation'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CommunityType } from '@/types/community'
import { ColorEnum } from '@/constants/common.const'
import { handleLoginDiscord } from '@/handler/auth/discord'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const FrameShape = tw(Vertical)`
  py-8
  px-8
  w-1/3
  h-full
  justify-start
  items-end
`

const FullWidthInput = tw(NumberInput)`
  w-full
`

const BorderBox = tw(RoundedGrayBorderBox)`
  w-full
  px-6
  py-6
  gap-4
`

const AddDiscordBtn = tw.div`
  text-primary-500
  font-bold
  cursor-pointer	
`

const Relative = tw.div`
  relative mt-1
`

const ListButton = tw(Listbox.Button)`
  relative
  w-full
  cursor-pointer
  rounded-lg
  bg-white
  py-2
  pl-3
  pr-10
  text-left
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

const Title = tw.div`
  block
  truncate
  text-lg
  font-normal
  text-gray-900
`
const UpDown = tw.div`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

const ListOption = tw(Listbox.Options)`
  absolute
  mt-1
  max-h-60
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-lg
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

const CheckIconBox = tw.div`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
  text-gray-600
`
const activeOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

const TitleOption = styled.div<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`block truncate`]
  if (selected) {
    styles.push(tw`font-medium`)
  } else {
    styles.push(tw`font-normal`)
  }

  return styles
})

const ListOptionRender: FC<{ roles: DiscordRoleType[] }> = ({ roles }) => {
  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <ListOption>
        {roles &&
          roles.map((role) => (
            <Listbox.Option key={role.id} className={activeOption} value={role}>
              {({ selected }) => (
                <>
                  <TitleOption selected={selected}>{role.name}</TitleOption>
                  {selected ? (
                    <CheckIconBox>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </CheckIconBox>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
      </ListOption>
    </Transition>
  )
}

const DiscordAction: FC<{ community: CommunityType; roles: DiscordRoleType[] }> = ({
  community,
  roles,
}) => {
  const selectedRole = NewQuestStore.useStoreState((state) => state.discordRole)

  const setSelectedRole = NewQuestStore.useStoreActions((action) => action.setDiscordRole)

  if (!community.discord) {
    return (
      <ColorBox boxColor={ColorEnum.WARNING}>
        <HorizontalFullWidth>
          <ExclamationTriangleIcon className='w-7 h-7 text-warning' />
          {'You need to connect Discord'}
        </HorizontalFullWidth>
        <SocialBox
          onClick={() =>
            handleLoginDiscord({
              joinCommunity: true,
              communityHandle: community.handle,
            })
          }
        >
          <Image
            width={30}
            height={30}
            src={StorageConst.DISCORD_DIR.src}
            alt={StorageConst.DISCORD_DIR.alt}
          />
          {'Connect Discord'}
        </SocialBox>
      </ColorBox>
    )
  }

  return (
    <>
      <Listbox
        value={selectedRole}
        onChange={(e) => {
          setSelectedRole(e)
        }}
      >
        <Relative>
          <ListButton>
            <Title>{selectedRole?.name || 'Choose a role'}</Title>
            <UpDown>
              <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </UpDown>
          </ListButton>
          <ListOptionRender roles={roles} />
        </Relative>
      </Listbox>
    </>
  )
}

const QuestReward: FC = () => {
  // Data
  const pointReward = NewQuestStore.useStoreState((state) => state.pointReward)

  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const isOpenDiscordRole = NewQuestStore.useStoreState((state) => state.isOpenDiscordRole)

  const [roles, setRoles] = useState<DiscordRoleType[]>([])

  // Actions
  const setPointReward = NewQuestStore.useStoreActions((actions) => actions.setPointReward)
  const setIsOpenDiscordRole = NewQuestStore.useStoreActions(
    (actions) => actions.setIsOpenDiscordRole
  )

  const openDiscordRole = () => {
    setIsOpenDiscordRole(true)
  }

  const closeDiscordRole = () => {
    setIsOpenDiscordRole(false)
  }

  const fetchRoles = async () => {
    const resp = await getDiscordRolesApi(community.handle)
    if (resp.error) {
      toast.error(resp.error)
      return
    }
    if (resp.code === 0 && resp.data) setRoles(resp.data?.roles || [])
  }

  useEffect(() => {
    if (isOpenDiscordRole) fetchRoles()
  }, [isOpenDiscordRole])

  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <Gap height={2} />

        <Label>{'Gem'}</Label>
        <Gap height={6} />

        <FullWidthInput
          full
          onChange={(e) => setPointReward(parseFloat(e.target.value ?? '0'))}
          leftChild={
            <>
              <Image width={30} height={30} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
              <Gap width={2} />
            </>
          }
          min={0}
          defaultValue={pointReward}
        />

        <Gap height={6} />
        {!isOpenDiscordRole && (
          <AddDiscordBtn onClick={openDiscordRole}> + Add Discord role</AddDiscordBtn>
        )}
        {isOpenDiscordRole && (
          <>
            <div className='justify-between flex'>
              <Label>{'Discord role'}</Label>
              <XMarkIcon
                onClick={closeDiscordRole}
                className='h-5 w-5 cursor-pointer	text-[#EF4444]'
              />
            </div>
            <Gap height={6} />
            <DiscordAction community={community} roles={roles} />
          </>
        )}
      </BorderBox>
    </FrameShape>
  )
}

export default QuestReward
