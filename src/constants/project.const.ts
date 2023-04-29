export enum QuestTypeEnum {
  URL = 'url',
  IMAGE = 'image',
  TEXT = 'text',
  QUIZ = 'quiz',
  VISIT_LINK = 'visit_link',
  EMPTY = 'empty',
  TWITTER = 'twitter',
  TWITTER_FOLLOW = 'twitter_follow',
  TWITTER_REACTION = 'twitter_reaction',
  TWITTER_TWEET = 'twitter_tweet',
  TWITTER_JOIN_SPACE = 'twitter_join_space',
  DISCORD = 'discord',
  JOIN_TELEGRAM = 'join_telegram',
  INVITES = 'invite',
}

export const QuestTypes = [
  QuestTypeEnum.URL,
  QuestTypeEnum.IMAGE,
  QuestTypeEnum.TEXT,
  QuestTypeEnum.QUIZ,
  QuestTypeEnum.VISIT_LINK,
  QuestTypeEnum.EMPTY,
  QuestTypeEnum.TWITTER,
  QuestTypeEnum.TWITTER_FOLLOW,
  QuestTypeEnum.TWITTER_REACTION,
  QuestTypeEnum.TWITTER_TWEET,
  QuestTypeEnum.TWITTER_JOIN_SPACE,
  QuestTypeEnum.DISCORD,
  QuestTypeEnum.JOIN_TELEGRAM,
  QuestTypeEnum.INVITES,
]

export const QuestTypeStringMap = new Map<QuestTypeEnum, String>([
  [QuestTypeEnum.URL, 'URL'],
  [QuestTypeEnum.IMAGE, 'Image'],
  [QuestTypeEnum.TEXT, 'Text'],
  [QuestTypeEnum.QUIZ, 'Quiz'],
  [QuestTypeEnum.VISIT_LINK, 'Visit Link'],
  [QuestTypeEnum.EMPTY, 'Empty'],
  [QuestTypeEnum.TWITTER, 'Twitter'],
  [QuestTypeEnum.TWITTER_FOLLOW, 'Twitter'],
  [QuestTypeEnum.TWITTER_REACTION, 'Twitter'],
  [QuestTypeEnum.TWITTER_TWEET, 'Twitter'],
  [QuestTypeEnum.TWITTER_JOIN_SPACE, 'Twitter'],
  [QuestTypeEnum.DISCORD, 'Discord'],
  [QuestTypeEnum.JOIN_TELEGRAM, 'Telegram'],
  [QuestTypeEnum.INVITES, 'Invites'],
])

export enum TwitterEnum {
  FOLLOW = 'Follow',
  LIKE = 'Like',
  REPLY = 'Reply',
  RETWEET = 'Retweet',
  TWEET = 'Tweet',
  JOIN_SPACE = 'Join Space',
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

// export const QuestRecurrences = ['Once', 'Daily', 'Weekly', 'Monthly']

export enum QuestRecurrence {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export const QuestRecurrencesMap = new Map<QuestRecurrence, String>([
  [QuestRecurrence.ONCE, 'Once'],
  [QuestRecurrence.DAILY, 'Daily'],
  [QuestRecurrence.WEEKLY, 'Weekly'],
  [QuestRecurrence.MONTHLY, 'Monthly'],
])

export const QuestRewards = ['Gem', 'Discord Role', 'Other']
