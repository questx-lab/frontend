import { CharacterType } from '@/types'

export const getCharacterSet = (character: CharacterType) => {
  return `${character.name}_${character.level}`
}
