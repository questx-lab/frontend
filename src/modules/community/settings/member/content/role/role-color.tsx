import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { RolePermissionColor } from '@/constants/common.const'
import RoleCommunityStore from '@/store/local/role-community'
import { HorizontalFullWidth } from '@/widgets/orientation'

const GapHorizontalFullWidth = tw(HorizontalFullWidth)`gap-1`

const ColorItem = styled.div<{ isactive: boolean }>(({ isactive }) => {
  const styles = [tw`w-6 h-6 rounded-full cursor-pointer`]
  if (isactive) {
    styles.push(tw`border-2 border-gray-900 border-solid`)
  }
  return styles
})

const RoleColor: FC = () => {
  const color = RoleCommunityStore.useStoreState((state) => state.color)

  const setColor = RoleCommunityStore.useStoreActions((action) => action.setColor)

  const renderColor = Object.values(RolePermissionColor).map((element) => (
    <ColorItem
      isactive={color === element}
      onClick={() => setColor(element)}
      style={{ backgroundColor: element }}
    />
  ))

  return <GapHorizontalFullWidth>{renderColor}</GapHorizontalFullWidth>
}

export default RoleColor
