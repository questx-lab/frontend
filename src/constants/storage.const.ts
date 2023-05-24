export const StorageConst = {
  APP_LOGO_DIR: {
    src: '/images/logos/app_logo.svg',
    alt: 'Logo',
  },
  GOOGLE_DIR: {
    src: '/images/logos/google.svg',
    alt: 'Google',
  },
  TELEGRAM_DIR: {
    src: '/images/logos/telegram.svg',
    alt: 'Telegram',
  },
  DISCORD_DIR: {
    src: '/images/logos/discord.svg',
    alt: 'Discord',
  },
  TWITTER_DIR: {
    src: '/images/logos/twitter.svg',
    alt: 'Twitter',
  },
  DISCORD_BLACK_DIR: {
    src: '/images/logos/discord_black.svg',
    alt: 'Discord',
  },
  TWITTER_BLACK_DIR: {
    src: '/images/logos/twitter_black.svg',
    alt: 'Twitter',
  },
  METAMASK_DIR: {
    src: '/images/logos/metamask.svg',
    alt: 'Metamask',
  },
  NOTIFICATION_ICON: {
    src: '/images/logos/noti.svg',
    alt: 'Notification',
  },
  AVATAR_DEFAUL: {
    src: '/images/logos/avatar.svg',
    alt: 'Avatar',
  },
  ADD_ICON: {
    src: '/images/icons/add.svg',
    alt: 'Add icon',
  },
  MENU_ICON: {
    src: '/images/icons/menu.svg',
    alt: 'Menu icon',
  },
  CLOSE_ICON: {
    src: '/images/icons/close.svg',
    alt: 'Close icon',
  },
  CHECK_ICON: {
    src: '/images/icons/check.svg',
    alt: 'Check icon',
  },
  SHARE_ICON: {
    src: '/images/icons/share.svg',
    alt: 'Share icon',
  },
  RECOMEND_ICON: {
    src: '/images/icons/recommendation.svg',
    alt: 'Recommendation icon',
  },
  FAVORITE_ICON: {
    src: '/images/icons/favorite.svg',
    alt: 'Favorite icon',
  },
  ARROW_ICON: {
    src: '/images/icons/arrow.svg',
    alt: 'Arrow icon',
  },
  ARROW_BACK_ICON: {
    src: '/images/icons/arrow_back.svg',
    alt: 'Arrow back icon',
  },
  POINT_ICON: {
    src: '/images/icons/gem.svg',
    alt: 'Point Icon',
  },
  MANTA_LOGO: {
    src: '/images/dummy/manta.svg',
    alt: 'Manta Logo',
  },
  XP_ICON: {
    src: '/images/icons/xp.svg',
    alt: 'XP Icon',
  },
  UPLOAD_IMG: {
    src: '/images/icons/upload.svg',
    alt: 'Upload image',
  },
  COIN: {
    src: '/images/icons/coin.svg',
    alt: 'Coin',
  },
  EARN_REWARD: {
    src: '/images/logos/earn_reward.svg',
    alt: 'logo',
  },
  JOIN_COMMUNITY: {
    src: '/images/logos/join_community.svg',
    alt: 'logo',
  },
  X_A_QUEST: {
    src: '/images/logos/x_a_quest.svg',
    alt: 'logo',
  },
  BACKGROUND: {
    src: '/images/logos/bg.png',
    alt: 'Background',
  },
  CHICKEN: {
    src: '/images/logos/chicken.svg',
    alt: 'Chicken',
  },
  HUSKY: {
    src: '/images/logos/husky.svg',
    alt: 'Husky',
  },
}

type RewardDataType = {
  name: string
  des: string
  image: string
}

export const RewardsData: RewardDataType[] = [
  {
    name: 'Join a Community',
    des: 'Join a vibrant community, connect with like-minded individuals, and unlock endless possibilities for collaboration and growth.',
    image: StorageConst.JOIN_COMMUNITY.src,
  },
  {
    name: 'X a Quest',
    des: 'Take on the challenge, push your limits, and triumph over obstacles. Dare to X a Quest and achieve greatness!',
    image: StorageConst.X_A_QUEST.src,
  },
  {
    name: 'Earn Reward',
    des: 'Unlock exciting incentives and reap the rewards of your accomplishments. Embrace the journey and earn your well-deserved recognition. Claim your rewards now!',
    image: StorageConst.EARN_REWARD.src,
  },
]
