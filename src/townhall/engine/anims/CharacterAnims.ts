import { getCharactersApi } from '@/api/communitiy'
import { getCharacterSet } from '@/utils/character'
import Phaser from 'phaser'

const animsFrameRate = 15

const fetchCharacters = async (anims: Phaser.Animations.AnimationManager) => {
  const resp = await getCharactersApi()

  if (resp.code === 0 && resp.data)
    resp.data.game_characters.forEach((character) => {
      const characterSet = getCharacterSet(character)
      anims.create({
        key: `${characterSet}_idle_right`,
        frames: anims.generateFrameNames(characterSet, {
          start: 0,
          end: 5,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${characterSet}_idle_up`,
        frames: anims.generateFrameNames(characterSet, {
          start: 6,
          end: 11,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${characterSet}_idle_left`,
        frames: anims.generateFrameNames(characterSet, {
          start: 12,
          end: 17,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${characterSet}_idle_down`,
        frames: anims.generateFrameNames(characterSet, {
          start: 18,
          end: 23,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${characterSet}_run_right`,
        frames: anims.generateFrameNames(characterSet, {
          start: 24,
          end: 29,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_run_up`,
        frames: anims.generateFrameNames(characterSet, {
          start: 30,
          end: 35,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_run_left`,
        frames: anims.generateFrameNames(characterSet, {
          start: 36,
          end: 41,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_run_down`,
        frames: anims.generateFrameNames(characterSet, {
          start: 42,
          end: 47,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_sit_down`,
        frames: anims.generateFrameNames(characterSet, {
          start: 48,
          end: 48,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_sit_left`,
        frames: anims.generateFrameNames(characterSet, {
          start: 49,
          end: 49,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_sit_right`,
        frames: anims.generateFrameNames(characterSet, {
          start: 50,
          end: 50,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${characterSet}_sit_up`,
        frames: anims.generateFrameNames(characterSet, {
          start: 51,
          end: 51,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })
    })
}

export const createCharacterAnims = async (anims: Phaser.Animations.AnimationManager) => {
  await fetchCharacters(anims)
}
