import { CommunityType } from '@/utils/type'

export enum ControlPanelTab {
  QUESTS,
  REVIEW_SUBMISSION,
  SETTINGS,
}

export enum CommunityIndexMode {
  VIEW_COMMUNITY,
  CREATE_QUEST,
}

export const emptyCommunity = (): CommunityType => {
  return {
    display_name: '',
    handle: '',
    introduction: '',
    logo_url: '',
  }
}
