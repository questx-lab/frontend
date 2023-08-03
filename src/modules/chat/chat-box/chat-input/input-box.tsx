import { FC, ReactNode, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'
import { getCommunityFollowersApi } from '@/api/communitiy'
import CommunityStore from '@/store/local/community'
import { FollowCommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { Horizontal } from '@/widgets/orientation'
import StorageConst from '@/constants/storage.const'
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
      borderBottom: '1px solid #e5e7eb',
      '&focused': {
        backgroundColor: '#cee4e5',
        color: 'white',
      },
    },
  },
}

const MentionStyle = {
  position: 'relative',
  zIndex: 1,
  backgroundColor: '#cee4e5',
  textDecoration: 'none',
  textShadow: 'none',
  color: 'white',
}

const InputBox: FC<{
  onNewMessagedEntered: (s: string) => void
  inputMessage: string
  onInputMessage: (s: string) => void
}> = ({ onNewMessagedEntered, inputMessage, onInputMessage }) => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const [enterdTime, setEnterTime] = useState<number>(0)
  const [searchedUsers, setSearchedUsers] = useState<FollowCommunityType[]>([])

  const renderSuggestion = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: ReactNode,
    index: number,
    focused: boolean
  ): JSX.Element => {
    const follower = searchedUsers.find((follower) => follower.user.id === suggestion.id)

    return (
      <Horizontal>
        <Image
          width={30}
          height={30}
          src={follower?.user.avatar_url || StorageConst.USER_DEFAULT.src}
          alt={'user Avatar'}
        />
        <Gap width={2} />
        <div>{suggestion.display} </div>
      </Horizontal>
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
        setSearchedUsers(followers)
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
        trigger='@'
        data={searchUsers}
        renderSuggestion={renderSuggestion}
        style={MentionStyle}
        displayTransform={(id: string, display: string) => `@${display}`}
      />
    </MentionsInput>
  )
}

export default InputBox
