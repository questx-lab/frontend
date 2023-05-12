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

  setStageCheckBoxQuiz: Action<NewCommunityModel, number>
  setDescribeSizeQuiz: Action<NewCommunityModel, number>
  setTypeShareQuiz: Action<NewCommunityModel, number>
  setInputOtherStage: Action<NewCommunityModel, string>
  setInputOtherTypeShare: Action<NewCommunityModel, string>
  setCurrentStep: Action<NewCommunityModel, number>
  setTitle: Action<NewCommunityModel, string>
  setDescription: Action<NewCommunityModel, string>
  setInviteCode: Action<NewCommunityModel, string>
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
})
