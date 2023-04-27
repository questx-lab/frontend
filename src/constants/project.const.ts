export const QuestTypes = [
  'URL',
  'Image',
  'Text',
  'Quiz',
  'Visit Link',
  'Empty',
  'Twitter',
  'Join Discord',
  'Join Telegram',
  'Invites',
]

export enum TwitterEnum {
  FOLLOW,
  LIKE,
  REPLY,
  RETWEET,
  TWEET,
  JOIN_SPACE,
}

export enum ActiveEnum {
  NONE,
  ACTIVE,
  BLOCK,
}

export enum SubmissionEnum {
  URL,
  IMAGE,
  TEXT,
  QUIZ,
  VISIT_LINK,
  EMPTY,
  TWITTER,
  JOIN_DISCORD,
  JOIN_TELEGRAM,
  INVITES,
}

export enum QuestTypeEnum {
  URL = 'url',
  IMAGE = 'image',
  TEXT = 'text',
  QUIZ = 'quiz',
  VISIT_LINK = 'visit_link',
  EMPTY = 'empty',
  TWITTER_FOLLOW = 'twitter_follow',
  TWITTER_REACTION = 'twitter_reaction',
  TWITTER_TWEET = 'twitter_tweet',
  TWITTER_JOIN_SPACE = 'twitter_join_space',
  JOIN_DISCORD = 'join_discord',
  JOIN_TELEGRAM = 'join_telegram',
  INVITES = 'invite',
}

export const QuestRecurrences = ['Once', 'Daily', 'Weekly', 'Monthly']

export enum QuestRecurrencesEnum {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export const QuestRewards = ['Gem', 'Discord Role', 'Other']

type ActionType = {
  name: string
  des: string
  label: string
  key: string
}

export const ActionList: ActionType[] = [
  {
    name: 'Follow',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'account_url',
  },
  {
    name: 'Like',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Reply',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'tweet_url',
  },
  {
    name: 'Retweet',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Tweet',
    des: 'This is a subtitle',
    label: 'Default tweet',
    key: 'default_tweet',
  },
  {
    name: 'Join Space',
    des: 'This is a subtitle',
    label: 'Space URL',
    key: 'space_url',
  },
]
