import { action, Action, createContextStore } from 'easy-peasy'

import { FollowCommunityType } from '@/types/community'

export enum MemberAction {
  ADD,
  EDIT,
}

interface MemberCommunityModel {
  selectedMember: FollowCommunityType | undefined
  filterdMembers: FollowCommunityType[]
  members: FollowCommunityType[]
  memberAction: MemberAction
  showModal: boolean

  setShowModal: Action<MemberCommunityModel, boolean>
  setMemberAction: Action<MemberCommunityModel, MemberAction>
  setMembers: Action<MemberCommunityModel, FollowCommunityType[]>
  setFilterdMembers: Action<MemberCommunityModel, FollowCommunityType[]>
  setSelectedMember: Action<MemberCommunityModel, FollowCommunityType>
}

const MemberCommunityStore = createContextStore<MemberCommunityModel>({
  selectedMember: undefined,
  filterdMembers: [],
  members: [],
  memberAction: MemberAction.ADD,
  showModal: false,

  setShowModal: action((state, showModal) => {
    state.showModal = showModal
  }),

  setMemberAction: action((state, action) => {
    state.memberAction = action
  }),

  setMembers: action((state, members) => {
    state.members = members
  }),

  setFilterdMembers: action((state, members) => {
    state.members = members
  }),

  setSelectedMember: action((state, member) => {
    state.selectedMember = member
  }),
})

export default MemberCommunityStore
