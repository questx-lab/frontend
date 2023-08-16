export enum ControlPanelTab {
  NONE = 'none',
  COMMUNITIES = 'communities',
  TEMPLATES = 'templates',
  BADGES = 'badges',
  REFERRALS = 'referrals',
}

export enum ReferralActionEnum {
  APPROVE = 'approve',
  REJECT = 'reject',
}

export enum ReferralStatusEnum {
  CLAIMED = 'claimed',
  PENDING = 'pending',
  UNCLAIMABLE = 'unclaimable',
  CLAIMABLE = 'claimable',
  REJECTED = 'rejected',
}

export enum ActionReviewCommunityEnum {
  ACTIVE = 'active',
  REJECT = 'rejected',
}

export enum CommunityStatusEnum {
  ACTIVE = 'active',
  REJECT = 'rejected',
  PENDING = 'pending',
}
