import { action, Action, createContextStore, FilterActionTypes, StateMapper } from 'easy-peasy'

import { NewCommunityStep } from '@/constants/common.const'
import { CommunityType, UpdateCommunityRequest } from '@/utils/type'

// TODO: Rename this to EditCommunityModel
export interface NewCommunityModel {
  currentStep: number
  displayName: string
  introduction: string
  inviteCode: string
  avatar: File | undefined
  twitterUrl: string
  websiteUrl: string
  createdCommunityHandle: string
  logoUrl: string

  setCommunity: Action<NewCommunityModel, CommunityType>
  setCurrentStep: Action<NewCommunityModel, number>
  setDisplayName: Action<NewCommunityModel, string>
  setIntroduction: Action<NewCommunityModel, string>
  setInviteCode: Action<NewCommunityModel, string>
  setAvatar: Action<NewCommunityModel, File | undefined>
  setTwitterUrl: Action<NewCommunityModel, string>
  setWebsiteUrl: Action<NewCommunityModel, string>
  setCreatedCommunityHandle: Action<NewCommunityModel, string>
  setHandle: Action<NewCommunityModel, string>
}

const NewCommunityStore = createContextStore<NewCommunityModel>({
  currentStep: NewCommunityStep.BEGIN,
  displayName: '',
  logoUrl: '',
  introduction: '',
  inviteCode: '',
  avatar: undefined,
  twitterUrl: '',
  websiteUrl: '',
  createdCommunityHandle: '',

  setCommunity: action((state, community) => {
    state.displayName = community.display_name
    state.introduction = community.introduction
    state.websiteUrl = community.website_url || ''
    state.logoUrl = community.logo_url
  }),
  setCurrentStep: action((state, step) => {
    state.currentStep = step
  }),
  setDisplayName: action((state, title) => {
    state.displayName = title
  }),
  setIntroduction: action((state, description) => {
    state.introduction = description
  }),
  setInviteCode: action((state, code) => {
    state.inviteCode = code
  }),
  setAvatar: action((state, avatar) => {
    state.avatar = avatar
  }),

  setTwitterUrl: action((state, url) => {
    state.twitterUrl = url
  }),
  setWebsiteUrl: action((state, url) => {
    state.websiteUrl = url
  }),

  setCreatedCommunityHandle: action((state, id) => {
    state.createdCommunityHandle = id
  }),

  setHandle: action((state, url) => {
    state.logoUrl = url
  }),
})

export const stateToUpdateCommunityRequest = (
  state: StateMapper<FilterActionTypes<NewCommunityModel>>,
  handle: string
): UpdateCommunityRequest => {
  return {
    community_handle: handle,
    display_name: state.displayName,
    introduction: state.introduction,
    website_url: state.websiteUrl,
  }
}

export default NewCommunityStore
