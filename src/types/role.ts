import { CommunityPermissionFlag, CommunityPermissionMapNumber } from '@/constants/common.const'

export const hasFlag = (permission: bigint, flag: CommunityPermissionFlag): boolean => {
  const flagNumberBit = CommunityPermissionMapNumber.get(flag)
  if (flagNumberBit === undefined) {
    return false
  }

  const flagBits = flagNumberBit.toString(2)
  const permBits = permission.toString(2)

  if (flagBits.length > permBits.length) {
    return false
  }

  return permBits[permBits.length - flagBits.length] === '1'
}

export const togglePermissionFlag = (
  permission: bigint,
  flag: CommunityPermissionFlag,
  checked: boolean
): bigint => {
  const flagNumberBit = CommunityPermissionMapNumber.get(flag)
  if (flagNumberBit === undefined) {
    return permission
  }

  const flagBits = flagNumberBit.toString(2)
  const permBits = permission.toString(2)
  const len = Math.max(flagBits.length, permBits.length)
  const res: string[] = []
  for (let i = 0; i < len; i++) {
    let s = '0'
    if (i < permBits.length) {
      s = permBits[i]
    }

    // Only change the bit where the flags is 1
    if (i < flagBits.length && flagBits[i] === '1') {
      if (checked) {
        s = '1'
      } else {
        s = '0'
      }
    }

    res.push(s)
  }

  const num = res.join('')

  return BigInt('0b' + num)
}
