'use client'

import LayoutCpn from '@/components/layouts/layout';
import ExploreMod from '@/modules/explores/explore.module';

export default function Explore() {
  return (
    <LayoutCpn>
      <header>
        <title>{'Explore'}</title>
      </header>
      <ExploreMod />
    </LayoutCpn>
  )
}
