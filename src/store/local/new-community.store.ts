import { action, Action, createContextStore } from 'easy-peasy'

import { NewCommunityStep } from '@/constants/common.const'
import { CommunityType } from '@/utils/type'

export interface NewCommunityModel {
  currentStep: number
  displayName: string
  introduction: string
  inviteCode: string
  avatar: File[]
  twitterUrl: string
  websiteUrl: string
  createdCommunityHandle: string
  logoUrl: string

  setCommunity: Action<NewCommunityModel, CommunityType>
  setCurrentStep: Action<NewCommunityModel, number>
  setTitle: Action<NewCommunityModel, string>
  setDescription: Action<NewCommunityModel, string>
  setInviteCode: Action<NewCommunityModel, string>
  setAvatar: Action<NewCommunityModel, File[]>
  setTwitterUrl: Action<NewCommunityModel, string>
  setWebsiteUrl: Action<NewCommunityModel, string>
  setCreatedCommunityHandle: Action<NewCommunityModel, string>
  setUrlName: Action<NewCommunityModel, string>
}

const NewCommunityStore = createContextStore<NewCommunityModel>({
  currentStep: NewCommunityStep.BEGIN,
  displayName: '',
  logoUrl: '',
  introduction: '',
  inviteCode: '',
  avatar: [],
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
  setTitle: action((state, title) => {
    state.displayName = title
  }),
  setDescription: action((state, description) => {
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

  setUrlName: action((state, url) => {
    state.logoUrl = url
  }),
})

export default NewCommunityStore
