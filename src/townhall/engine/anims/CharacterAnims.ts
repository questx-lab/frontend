import { getCharactersApi } from '@/api/communitiy'
import Phaser from 'phaser'

const animsFrameRate = 15

const fetchCharacters = async (anims: Phaser.Animations.AnimationManager) => {
  const resp = await getCharactersApi()

  if (resp.code === 0 && resp.data)
    resp.data.game_characters.forEach((character) => {
      // create idle and run animations
      anims.create({
        key: `${character.name}_idle_right`,
        frames: anims.generateFrameNames(character.name, {
          start: 0,
          end: 5,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${character.name}_idle_up`,
        frames: anims.generateFrameNames(character.name, {
          start: 6,
          end: 11,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${character.name}_idle_left`,
        frames: anims.generateFrameNames(character.name, {
          start: 12,
          end: 17,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${character.name}_idle_down`,
        frames: anims.generateFrameNames(character.name, {
          start: 18,
          end: 23,
        }),
        repeat: -1,
        frameRate: animsFrameRate * 0.6,
      })

      anims.create({
        key: `${character.name}_run_right`,
        frames: anims.generateFrameNames(character.name, {
          start: 24,
          end: 29,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_run_up`,
        frames: anims.generateFrameNames(character.name, {
          start: 30,
          end: 35,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_run_left`,
        frames: anims.generateFrameNames(character.name, {
          start: 36,
          end: 41,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_run_down`,
        frames: anims.generateFrameNames(character.name, {
          start: 42,
          end: 47,
        }),
        repeat: -1,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_sit_down`,
        frames: anims.generateFrameNames(character.name, {
          start: 48,
          end: 48,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_sit_left`,
        frames: anims.generateFrameNames(character.name, {
          start: 49,
          end: 49,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_sit_right`,
        frames: anims.generateFrameNames(character.name, {
          start: 50,
          end: 50,
        }),
        repeat: 0,
        frameRate: animsFrameRate,
      })

      anims.create({
        key: `${character.name}_sit_up`,
        frames: anims.generateFrameNames(character.name, {
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

  // anims.create({
  //   key: 'adam_idle_right',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 0,
  //     end: 5,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'adam_idle_up',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 6,
  //     end: 11,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'adam_idle_left',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 12,
  //     end: 17,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'adam_idle_down',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 18,
  //     end: 23,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'adam_run_right',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 24,
  //     end: 29,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_run_up',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 30,
  //     end: 35,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_run_left',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 36,
  //     end: 41,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_run_down',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 42,
  //     end: 47,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_sit_down',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 48,
  //     end: 48,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_sit_left',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 49,
  //     end: 49,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_sit_right',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 50,
  //     end: 50,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'adam_sit_up',
  //   frames: anims.generateFrameNames('adam', {
  //     start: 51,
  //     end: 51,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })
}
