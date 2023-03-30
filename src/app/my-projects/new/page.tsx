'use client'

import LayoutCpn from '@/components/layouts/layout'
import NewProjectModule from '@/modules/my-projects/newProject'

export default function NewProject() {
  return (
    <LayoutCpn>
      <header>
        <title>{'New Project'}</title>
      </header>
      <NewProjectModule />
    </LayoutCpn>
  )
}
