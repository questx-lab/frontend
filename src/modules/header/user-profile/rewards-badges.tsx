import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'
import { BadgeType } from '@/types'
import ClaimHistory from '@/modules/header/user-profile/claim-history'
import Badges from '@/modules/header/user-profile/badges'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { Vertical } from '@/widgets/orientation'
import { Tab, TabItem } from '@/widgets/tab-group/focus-light-primary'
import { Gap } from '@/widgets/separator'
import { getAllBadgesApi } from '@/api/user'
import { toast } from 'react-hot-toast'

const BoundingBox = tw(Vertical)`
  w-2/3
  flex
  flex-col
  max-sm:w-full
`

const CounterBox = styled.div<{ active: boolean }>(({ active }) => {
  const style = [
    tw`
      rounded-full
      border-2
      px-2
      py-0
      `,
  ]

  if (active) {
    style.push(tw`
        bg-primary-500
        text-white
      `)
  } else {
    style.push(tw`
        bg-[#E5E7EB]
        text-black
      `)
  }

  return style
})

const tabList = ['BADGES', 'RANKING', 'FRIENDS', 'HISTORY']
const ControlTabs: FC<{ activePos: number; setActivePos: (activePos: number) => void }> = ({
  activePos,
  setActivePos,
}) => {
  return (
    <Tab>
      {tabList.map((tab, idx) => (
        <>
          <TabItem
            active={idx === activePos}
            tabCount={tabList.length}
            position={idx}
            onClick={() => setActivePos(idx)}
          >
            <>
              <div>{tab}</div>
              <Gap width={1} />
              <CounterBox active={idx === activePos}> {idx}</CounterBox>
            </>
          </TabItem>
        </>
      ))}
    </Tab>
  )
}

const RewardsBadges: FC<{ user: UserType }> = ({ user }) => {
  // TODO: Add badges and ranking
  const me: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [activePos, setActivePos] = useState<number>(0)

  const fetchBadges = async () => {
    const resp = await getAllBadgesApi()

    if (resp.code === 0 && resp.data) {
      setBadges(resp.data.badges)
    }
    if (resp.error) toast.error(resp.error)
  }
  useEffect(() => {
    fetchBadges()
  }, [])
  if (user.id !== me.id) {
    return <></>
  }

  const Panel = () => {
    switch (activePos) {
      case 0:
        return <Badges badges={badges} />

      case 3:
        return <ClaimHistory user={user} />

      default:
        return <div className='w-full text-center'> We are developing </div>
    }
  }

  return (
    <BoundingBox>
      <ControlTabs activePos={activePos} setActivePos={setActivePos} />
      <Gap height={5} />
      <Panel />
    </BoundingBox>
  )
}

export default RewardsBadges
