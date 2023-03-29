'use client'

import LayoutCpn from '@/components/layouts/layout'
import QuestboardModule from '@/modules/questboard/questboard.module'

export default function Questboard() {
  return (
    <LayoutCpn>
      <header>
        <title>{'Questboard'}</title>
      </header>
      <QuestboardModule />
    </LayoutCpn>
  )
}
