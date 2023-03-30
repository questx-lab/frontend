'use client'

import LayoutCpn from '@/components/layouts/layout'
import MyProjectsModule from '@/modules/my-projects'

export default function MyProjects() {
  return (
    <LayoutCpn>
      <header>
        <title>{'My Projects'}</title>
      </header>
      <MyProjectsModule />
    </LayoutCpn>
  )
}
