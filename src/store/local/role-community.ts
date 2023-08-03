import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityRoleType } from '@/types/community'

export enum RoleAction {
  ADD,
  EDIT,
}

interface RoleCommunityModel {
  roleAction: RoleAction
  showModal: boolean
  roles: CommunityRoleType[]
  roleId: string
  roleName: string
  color: string
  permission: bigint

  setShowModal: Action<RoleCommunityModel, boolean>
  setRoleId: Action<RoleCommunityModel, string>
  setRoleName: Action<RoleCommunityModel, string>
  setColor: Action<RoleCommunityModel, string>
  setPermission: Action<RoleCommunityModel, bigint>
  setRoles: Action<RoleCommunityModel, CommunityRoleType[]>
  setRoleAction: Action<RoleCommunityModel, RoleAction>
}

const RoleCommunityStore = createContextStore<RoleCommunityModel>({
  roleAction: RoleAction.ADD,
  showModal: false,
  roles: [],
  roleId: '',
  roleName: '',
  color: '',
  permission: BigInt(0),

  setRoleId: action((state, roleId) => {
    state.roleId = roleId
  }),

  setRoleName: action((state, name) => {
    state.roleName = name
  }),

  setColor: action((state, color) => {
    state.color = color
  }),

  setPermission: action((state, permission) => {
    state.permission = permission
  }),

  setRoles: action((state, roles) => {
    state.roles = roles
  }),

  setShowModal: action((state, showModal) => {
    state.showModal = showModal
  }),

  setRoleAction: action((state, action) => {
    state.roleAction = action
  }),
})

export default RoleCommunityStore
