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

  const res: string[] = []
  for (let i = permBits.length - 1, j = flagBits.length - 1; i >= 0 || j >= 0; i--, j--) {
    let s = '0'
    if (i >= 0) {
      s = permBits[i]
    }

    // Only change the bit where the flags is 1
    if (j >= 0 && flagBits[j] === '1') {
      if (checked) {
        s = '1'
      } else {
        s = '0'
      }
    }

    res.unshift(s)
  }

  const num = res.join('')

  return BigInt('0b' + num)
}
