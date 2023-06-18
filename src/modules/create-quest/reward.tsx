import { FC } from 'react'

import tw from 'twin.macro'
import styled from 'styled-components'
import { RoleType } from '@/types'

import StorageConst from '@/constants/storage.const'
import NewQuestStore from '@/store/local/new-quest'
import { RoundedGrayBorderBox } from '@/widgets/box'
import { Image } from '@/widgets/image'
import { NumberInput, CheckBox } from '@/widgets/input'
import { Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label } from '@/widgets/text'
import { Combobox } from '@headlessui/react'

const mockRoles: RoleType[] = [
  {
    id: '1',
    name: 'test',
  },
]

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

const CheckboxFrame = tw.span`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
`

const NotFoundBox = tw.div`
  relative
  cursor-default
  select-none
  py-2
  px-4
  text-gray-700
`

const Title = styled.span<{ selected: boolean }>(({ selected = false }) => [
  selected ? tw`block truncate font-medium` : tw`block truncate font-normal`,
])

const RoleBox: FC<{ roles: RoleType[] }> = ({ roles }) => {
  if (!roles.length) {
    return <NotFoundBox>No Quest matched.</NotFoundBox>
  }

  return (
    <>
      {roles.map((role) => (
        <Combobox.Option
          key={role.id}
          className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900'
          value={role}
        >
          {() => {
            const selected = roles.some((selectedRole) => selectedRole.id === role.id)

            return (
              <>
                <Title selected={selected}>{role.name}</Title>
                <CheckboxFrame>
                  <CheckBox checked={selected} onChange={() => {}} type='checkbox' />
                </CheckboxFrame>
              </>
            )
          }}
        </Combobox.Option>
      ))}
    </>
  )
}

const QuestReward: FC = () => {
  // Data
  const activeReward = NewQuestStore.useStoreState((state) => state.activeReward)
  const pointReward = NewQuestStore.useStoreState((state) => state.pointReward)

  // Actions
  const onActiveRewardChanged = NewQuestStore.useStoreActions((actions) => actions.setActiveReward)
  const setPointReward = NewQuestStore.useStoreActions((actions) => actions.setPointReward)

  return (
    <FrameShape>
      <BorderBox>
        <Label>{'REWARD'}</Label>
        <Gap height={2} />

        {/* <TypesSelection
          list={QuestRewards}
          activeFunc={(item, index) => index === activeReward}
          onClick={(item, index) => onActiveRewardChanged(index)}
          itemView={(item: string) => item}
        /> */}
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

        <RoleBox roles={mockRoles} />
        {
          // TODO: add this back when we have a doc for how level is calculated.
          /* <UnderlinedText>{'Learn more here about how the levels are calculated.'}</UnderlinedText> */
        }
      </BorderBox>
    </FrameShape>
  )
}

export default QuestReward
