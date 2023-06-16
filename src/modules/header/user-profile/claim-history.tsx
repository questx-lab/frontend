import { FC, useEffect, useState } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { getMyClaims } from '@/api/claim'
import ClaimItem from '@/modules/header/user-profile/claim-history-item'
import { ClaimQuestType, UserType } from '@/types'
import { Vertical, VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase } from '@/widgets/text'

const LoadingPosition = tw(VerticalCenter)`
  w-full
  h-full
  mt-8
`

const ClaimHistory: FC<{ user: UserType }> = ({ user }) => {
  const [claims, setClaims] = useState<ClaimQuestType[] | undefined>(undefined)

  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    try {
      const result = await getMyClaims(user.id)
      console.log('result = ', result)
      if (result.code === 0) {
        setClaims(result.data?.claimed_quests)
      }
    } catch (err) {
      setClaims([])
    }
  }

  if (claims === undefined) {
    console.log('AAA')
    return (
      <LoadingPosition>
        <MoonLoader />
      </LoadingPosition>
    )
  }

  if (claims.length === 0) {
    return (
      <Vertical>
        <Gap />
        <TextBase>There is no claims found</TextBase>
      </Vertical>
    )
  }

  // TODO: support infinite loading here.
  return (
    <VerticalFullWidth>
      <Gap />
      {claims.map((claim: ClaimQuestType, index: number) => {
        return <ClaimItem key={index} claim={claim} />
      })}
    </VerticalFullWidth>
  )
}

export default ClaimHistory
