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
  DISCORD = 'join_discord',
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

export const QuestTypeMap = new Map<String, QuestTypeEnum>([
  ['url', QuestTypeEnum.URL],
  ['image', QuestTypeEnum.IMAGE],
  ['text', QuestTypeEnum.TEXT],
  ['quiz', QuestTypeEnum.QUIZ],
  ['visit_link', QuestTypeEnum.VISIT_LINK],
  ['empty', QuestTypeEnum.EMPTY],
  ['twitter', QuestTypeEnum.TWITTER],
  ['twitter_follow', QuestTypeEnum.TWITTER],
  ['twitter_reaction', QuestTypeEnum.TWITTER],
  ['twitter_tweet', QuestTypeEnum.TWITTER],
  ['twitter_join_space', QuestTypeEnum.TWITTER],
  ['join_discord', QuestTypeEnum.DISCORD],
  ['join_telegram', QuestTypeEnum.JOIN_TELEGRAM],
  ['invite', QuestTypeEnum.INVITES],
])

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

export const QuestRecurrencesStringMap = new Map<String, QuestRecurrence>([
  ['once', QuestRecurrence.ONCE],
  ['daily', QuestRecurrence.DAILY],
  ['weekly', QuestRecurrence.WEEKLY],
  ['monthly', QuestRecurrence.MONTHLY],
])

export const QuestRewards = ['Gem', 'Discord Role', 'Other']

export enum SideEnum {
  QUEST,
  REVIEW_SUBMISSION,
  SETTINGS,
}

export enum TabReviewEnum {
  PENDING,
  HISTORY,
}

export enum ReviewBtnEnum {
  REJECT,
  ACCEPT,
  EXPORT,
  PENDING,
}

export enum ClaimedQuestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  AUTO_REJECTED = 'auto_rejected',
  AUTO_ACCEPTED = 'auto_accepted',
  ALL = 'rejected,accepted',
}

export const ClaimedQuestMap = new Map<ClaimedQuestStatus, String>([
  [ClaimedQuestStatus.PENDING, 'Pending'],
  [ClaimedQuestStatus.ACCEPTED, 'Accept'],
  [ClaimedQuestStatus.REJECTED, 'Reject'],
  [ClaimedQuestStatus.ALL, 'All'],
])

export enum QuestStatusEnum {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

export enum AnswerStatusEnum {
  DEFAULT,
  DANGER,
  ACTIVE,
  BLOCK,
}

export enum CommunityRoleEnum {
  NONE,
  GUEST,
  OWNER,
  EDITOR,
}

export enum ButtonSocialType {
  DISCORD,
  TWITTER,
  VISIT_LINK,
  TELEGRAM,
}

export enum LeaderboardRangeEnum {
  WEEK = 'week',
  MONTH = 'month',
  TOTAL = 'total',
}

export const LeaderboardRangeMap = new Map<LeaderboardRangeEnum, string>([
  [LeaderboardRangeEnum.WEEK, 'WEEK'],
  [LeaderboardRangeEnum.MONTH, 'MONTH'],
  [LeaderboardRangeEnum.TOTAL, 'ALL TIME'],
])

export enum LeaderboardConst {
  POINT = 'point',
  TASK = 'task',
}

export enum NewCommunityStage {
  IDEA,
  DEVELOPMENT,
  TESTING,
  LAUNCH,
  OTHER,
}

export enum NewCommunityDescribeSize {
  SOLO,
  SMALL,
  MEDIUM,
  LARGE,
}

export enum NewCommunityTypeShare {
  PROJECT,
  EDUCATION,
  COMMUNITY,
  DEVELOPMENT,
  EVENT,
  CONTENT,
  OTHER,
}

export const NewCommunityStageMap = new Map<NewCommunityStage, string>([
  [NewCommunityStage.IDEA, 'Idea/Concept stage'],
  [NewCommunityStage.DEVELOPMENT, 'Development stage'],
  [NewCommunityStage.TESTING, 'Beta testing stage'],
  [NewCommunityStage.LAUNCH, 'Launch/Deployment stage'],
  [NewCommunityStage.OTHER, 'Other'],
])

export const NewCommunityDescribeSizeMap = new Map<
  NewCommunityDescribeSize,
  string
>([
  [NewCommunityDescribeSize.SOLO, 'Solo developer'],
  [NewCommunityDescribeSize.SMALL, 'Small team (2-5 members)'],
  [NewCommunityDescribeSize.MEDIUM, 'Medium-sized team (6-10 members)'],
  [NewCommunityDescribeSize.LARGE, 'Large team (11+ members)'],
])

export const NewCommunityTypeShareMap = new Map<NewCommunityTypeShare, string>([
  [NewCommunityTypeShare.PROJECT, 'Project updates and milestones'],
  [NewCommunityTypeShare.EDUCATION, 'Educational articles and tutorials'],
  [NewCommunityTypeShare.COMMUNITY, 'Community spotlights and success stories'],
  [NewCommunityTypeShare.DEVELOPMENT, 'Behind-the-scenes development insights'],
  [
    NewCommunityTypeShare.EVENT,
    'Event announcements and participation opportunities',
  ],
  [NewCommunityTypeShare.CONTENT, 'Memes and light-hearted content'],
  [NewCommunityTypeShare.OTHER, 'Other'],
])

export enum NewCommunityStep {
  BEGIN,
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
}

export enum ConnectSocialPlatformEnum {
  NONE = 'None',
  DISCORD = 'Discord',
  TWITTER = 'Twitter',
}

export enum AuthEnum {
  LOGIN,
  REGISTER,
  INPUT_FORM,
}

export enum SocialDisplay {
  NONE,
  TWITTER,
  DISCORD,
  EMAIL,
}

export const SocialDisplayMap = new Map<SocialDisplay, string>([
  [SocialDisplay.NONE, 'None'],
  [SocialDisplay.TWITTER, 'Twitter handle'],
  [SocialDisplay.DISCORD, 'Discord profile'],
  [SocialDisplay.EMAIL, 'Email address'],
])

export enum SizeEnum {
  x32,
  x48,
  x64,
  x96,
}

export enum ColorEnum {
  NONE,
  PRIMARY,
  WARNING,
  INFO,
  SUCCESS,
  DANGER,
}
export enum CarouselType {
  QUEST,
  COMMUNITY,
}
