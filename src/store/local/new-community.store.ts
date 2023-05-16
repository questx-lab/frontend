import { action, Action, createContextStore } from 'easy-peasy'

import {
  NewCommunityDescribeSize,
  NewCommunityStage,
  NewCommunityStep,
  NewCommunityTypeShare,
} from '@/constants/project.const'

export interface NewCommunityModel {
  stageCheckBoxQuiz: number
  describeSizeQuiz: number
  typeShareQuiz: number
  inputOtherStage: string
  inputOtherTypeShare: string
  currentStep: number
  title: string
  description: string
  inviteCode: string
  avatar: File[]
  discordUrl: string
  twitterUrl: string

  setStageCheckBoxQuiz: Action<NewCommunityModel, number>
  setDescribeSizeQuiz: Action<NewCommunityModel, number>
  setTypeShareQuiz: Action<NewCommunityModel, number>
  setInputOtherStage: Action<NewCommunityModel, string>
  setInputOtherTypeShare: Action<NewCommunityModel, string>
  setCurrentStep: Action<NewCommunityModel, number>
  setTitle: Action<NewCommunityModel, string>
  setDescription: Action<NewCommunityModel, string>
  setInviteCode: Action<NewCommunityModel, string>
  setAvatar: Action<NewCommunityModel, File[]>
  setDiscordUrl: Action<NewCommunityModel, string>
  setTwitterUrl: Action<NewCommunityModel, string>
}

export const NewCommunityStore = createContextStore<NewCommunityModel>({
  stageCheckBoxQuiz: NewCommunityStage.IDEA,
  describeSizeQuiz: NewCommunityDescribeSize.SOLO,
  typeShareQuiz: NewCommunityTypeShare.PROJECT,
  inputOtherStage: '',
  inputOtherTypeShare: '',
  currentStep: NewCommunityStep.BEGIN,
  title: '',
  description: '',
  inviteCode: '',
  avatar: [],
  discordUrl: '',
  twitterUrl: '',

  setStageCheckBoxQuiz: action((state, stage) => {
    state.stageCheckBoxQuiz = stage
  }),
  setDescribeSizeQuiz: action((state, size) => {
    state.describeSizeQuiz = size
  }),
  setTypeShareQuiz: action((state, type) => {
    state.typeShareQuiz = type
  }),
  setInputOtherStage: action((state, input) => {
    state.inputOtherStage = input
  }),
  setInputOtherTypeShare: action((state, input) => {
    state.inputOtherTypeShare = input
  }),
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
  setDiscordUrl: action((state, url) => {
    state.discordUrl = url
  }),
  setTwitterUrl: action((state, url) => {
    state.twitterUrl = url
  }),
})
