import { FC, useEffect, useState } from 'react'

import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { getMyClaims } from '@/api/claim'
import ClaimItem from '@/modules/header/user-profile/claim-history/item'
import { ClaimQuestType, UserType } from '@/types'
import { Vertical, VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { TextBase } from '@/widgets/text'

const LoadingPosition = tw(VerticalCenter)`
  w-full
  h-full
  mt-8
`

const OverflowScroll = tw(VerticalFullWidth)`
  w-full
  overflow-y-scroll
  max-h-[calc(100vh_-_360px)]
`

const RenderClaim: FC<{ claims: ClaimQuestType[] | undefined }> = ({ claims }) => {
  if (!claims) {
    return <></>
  }

  const renderClaims = claims.map((claim: ClaimQuestType, index: number) => {
    return <ClaimItem key={index} claim={claim} />
  })

  return <>{renderClaims}</>
}

const ClaimHistory: FC<{ user: UserType }> = ({ user }) => {
  const [claims, setClaims] = useState<ClaimQuestType[] | undefined>(undefined)

  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    try {
      const result = await getMyClaims(user.id)
      if (result.code === 0) {
        setClaims(result.data?.claimed_quests)
      }
    } catch (err) {
      setClaims([])
    }
  }

  if (claims === undefined) {
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
    <OverflowScroll>
      <Gap />
      <RenderClaim claims={claims} />
    </OverflowScroll>
  )
}

export default ClaimHistory
