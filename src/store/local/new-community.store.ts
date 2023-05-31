import { action, Action, createContextStore } from 'easy-peasy'

import { NewCommunityStep } from '@/constants/common.const'

export interface NewCommunityModel {
  currentStep: number
  title: string
  description: string
  inviteCode: string
  avatar: File[]
  twitterUrl: string
  websiteUrl: string
  createdCommunityHandle: string
  urlName: string

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

export const NewCommunityStore = createContextStore<NewCommunityModel>({
  currentStep: NewCommunityStep.BEGIN,
  title: '',
  urlName: '',
  description: '',
  inviteCode: '',
  avatar: [],
  twitterUrl: '',
  websiteUrl: '',
  createdCommunityHandle: '',

  setCurrentStep: action((state, step) => {
    state.currentStep = step
  }),
  setTitle: action((state, title) => {
    state.title = title
  }),
  setDescription: action((state, description) => {
    state.description = description
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
    state.urlName = url
  }),
})
