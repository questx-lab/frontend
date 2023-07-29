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

// export const QuestRewards = ['Gem', 'Discord Role', 'Other']
export const QuestRewards = ['Gem']

export enum TabReviewEnum {
  PENDING,
  HISTORY,
}

export enum ReviewBtnEnum {
  REJECT,
  ACCEPT,
  EXPORT,
  PENDING,
  VIEW_DETAIL,
}

export enum ClaimedQuestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  AUTO_REJECTED = 'auto_rejected',
  AUTO_ACCEPTED = 'auto_accepted',
  ALL = 'rejected,accepted',
}

export const ClaimedQuestMap = new Map<ClaimedQuestStatus, string>([
  [ClaimedQuestStatus.PENDING, 'Pending'],
  [ClaimedQuestStatus.ACCEPTED, 'Accepted'],
  [ClaimedQuestStatus.REJECTED, 'Rejected'],
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
  NOT_LOGIN = '',
  GUEST = 'guest',
  OWNER = 'owner',
  EDITOR = 'editor',
  REVIEWER = 'reviewer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
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
])

export enum LeaderboardSortType {
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
  CHOOSE_USERNAME,
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
  NONE,
  x32,
  x48,
  x64,
  x96,
  FULL,
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

export enum TownhallStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

export enum QuestColor {
  EMERALD = 'emerald',
  ORANGE = 'orange',
  INDIGO = 'indigo',
  PINK = 'pink',
  CYAN = 'cyan',
}

export enum LeaderboardType {
  TOWNHALL,
  PLATFORM,
}

export const ShowedInstructionKey = 'showed_instruction'

export enum RewardEnum {
  DISCORD_ROLE = 'Discord role',
  COIN = 'USDT-avaxc-testnet',
}

export enum LotteryViewEnum {
  CONVERT_POINT_TO_TICKET,
  BUY_TICKET,
  RESULT,
}

export enum CommunityPermissionFlag {
  DELETE_COMMUNITY,
  EDIT_COMMUNITY,
  MANAGE_QUEST,
  REVIEW_CLAIMED_QUEST,
  MANAGE_CHANNEL,
  MANAGE_ROLE,
  KICK_MEMBER,
  BAN_MEMBER,
  TIMEOUT_MEMBER,
  ASSIGN_ROLE,
  MANAGE_LOTTERY,
}

export const CommunityPermissionMapNumber = new Map<CommunityPermissionFlag, number>([
  [CommunityPermissionFlag.DELETE_COMMUNITY, 1 << 0],
  [CommunityPermissionFlag.EDIT_COMMUNITY, 1 << 1],
  [CommunityPermissionFlag.MANAGE_QUEST, 1 << 2],
  [CommunityPermissionFlag.REVIEW_CLAIMED_QUEST, 1 << 3],
  [CommunityPermissionFlag.MANAGE_CHANNEL, 1 << 4],
  [CommunityPermissionFlag.MANAGE_ROLE, 1 << 5],
  [CommunityPermissionFlag.KICK_MEMBER, 1 << 6],
  [CommunityPermissionFlag.BAN_MEMBER, 1 << 7],
  [CommunityPermissionFlag.TIMEOUT_MEMBER, 1 << 8],
  [CommunityPermissionFlag.ASSIGN_ROLE, 1 << 9],
  [CommunityPermissionFlag.MANAGE_LOTTERY, 1 << 10],
])

export const CommunityPermissionMapString = new Map<CommunityPermissionFlag, string>([
  [CommunityPermissionFlag.DELETE_COMMUNITY, 'Delete community'],
  [CommunityPermissionFlag.EDIT_COMMUNITY, 'Edit community'],
  [CommunityPermissionFlag.MANAGE_QUEST, 'Manage quest'],
  [CommunityPermissionFlag.REVIEW_CLAIMED_QUEST, 'Review Claim quest'],
  [CommunityPermissionFlag.MANAGE_CHANNEL, 'Manage channel'],
  [CommunityPermissionFlag.MANAGE_ROLE, 'Manage role'],
  [CommunityPermissionFlag.KICK_MEMBER, 'Kick member'],
  [CommunityPermissionFlag.BAN_MEMBER, 'Ban member'],
  [CommunityPermissionFlag.TIMEOUT_MEMBER, 'Timeout member'],
  [CommunityPermissionFlag.ASSIGN_ROLE, 'Assign role'],
  [CommunityPermissionFlag.MANAGE_LOTTERY, 'Manage Lottery'],
])

export enum CommunitySettingSidebar {
  MEMBERS = 'Members',
  ROLES = 'Roles',
}

export enum ChatSettingSidebar {
  CHANNEL = 'Channels',
}

export enum RolePermissionColor {
  GREEN = '#22C55E',
  RED = '#EF4444',
  YELLOW = '#F59E0B',
  BLUE = '#3B82F6',
  ORANGE = '#f97316',
  PINK = '#ec4899',
  GRAY = '#d1d5db',
}
