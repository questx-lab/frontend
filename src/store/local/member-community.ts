import { action, Action, createContextStore } from 'easy-peasy'

export enum MemberAction {
  ADD,
  EDIT,
}

interface MemberCommunityModel {
  memberAction: MemberAction
  showModal: boolean
  profile: string

  setShowModal: Action<MemberCommunityModel, boolean>
  setMemberAction: Action<MemberCommunityModel, MemberAction>
  setProfile: Action<MemberCommunityModel, string>
}

const MemberCommunityStore = createContextStore<MemberCommunityModel>({
  memberAction: MemberAction.ADD,
  showModal: false,
  profile: '',

  setShowModal: action((state, showModal) => {
    state.showModal = showModal
  }),

  setMemberAction: action((state, action) => {
    state.memberAction = action
  }),

  setProfile: action((state, profile) => {
    state.profile = profile
  }),
})

export default MemberCommunityStore
