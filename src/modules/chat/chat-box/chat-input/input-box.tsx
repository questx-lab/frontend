import { FC, ReactNode, useState } from 'react'

import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { getCommunityFollowersApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { FollowCommunityType } from '@/types/community'
import { UserAvatar } from '@/widgets/avatar'
import { Horizontal } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'

const MentionInputStyle = {
  control: {
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&singleLine': {
    display: 'inline-block',
    width: '100%',

    highlighter: {
      padding: 1,
    },
    input: {
      padding: 1,
      outline: 0,
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      fontSize: 14,
      overflow: 'auto',
      position: 'absolute',
      bottom: 14,
      width: '200px',
    },
    item: {
      padding: '5px 15px',
      borderRadius: '16px solid #e5e7eb',
      '&focused': {
        backgroundColor: '#FFE07D',
        color: '#000000',
      },
    },
  },
}

const HorizontaStartCenter = tw(Horizontal)`items-center`

const InputBox: FC<{
  onNewMessagedEntered: (s: string) => void
  inputMessage: string
  onInputMessage: (s: string) => void
}> = ({ onNewMessagedEntered, inputMessage, onInputMessage }) => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const [enterdTime, setEnterTime] = useState<number>(0)
  const [searchedFollowers, setSearchedFollowers] = useState<FollowCommunityType[]>([])

  const renderSuggestion = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: ReactNode,
    index: number,
    focused: boolean
  ): JSX.Element => {
    const follower = searchedFollowers.find((follower) => follower.user.id === suggestion.id)

    return (
      <HorizontaStartCenter>
        <UserAvatar user={follower?.user} size={32} />
        <Gap width={2} />
        <div>{suggestion.display} </div>
      </HorizontaStartCenter>
    )
  }

  const searchUsers = useDebouncedCallback(
    async (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      const resp = await getCommunityFollowersApi(community.handle, query, 5)
      if (resp.code === 0 && resp.data) {
        const followers = resp.data.followers
        const searchedUsers = followers.map((follower) => {
          return {
            id: follower.user.id,
            display: follower.user.name,
          }
        })
        setSearchedFollowers(followers)
        callback(searchedUsers)
      }
    },
    1000
  )

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300 && !event.shiftKey) {
      event.preventDefault()
      onNewMessagedEntered(inputMessage)
      onInputMessage('')
      setEnterTime(now)
    }
  }

  return (
    <MentionsInput
      singleLine
      value={inputMessage}
      onChange={(e) => {
        onInputMessage(e.target.value)
      }}
      style={MentionInputStyle}
      onKeyDown={handleKeyboardEvent}
    >
      <Mention
        style={{ backgroundColor: '#FFE07D' }}
        trigger='@'
        data={searchUsers}
        renderSuggestion={renderSuggestion}
        displayTransform={(id: string, display: string) => `@${display}`}
      />
    </MentionsInput>
  )
}

export default InputBox
