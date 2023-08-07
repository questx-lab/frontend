import React, { FC, ReactNode } from 'react'

import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'

export const PopoverHover: FC<{ button: ReactNode; children: ReactNode; placement?: any }> = ({
  button,
  children,
  placement,
}) => {
  const [openPopover, setOpenPopover] = React.useState(false)

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  }

  return (
    <Popover placement={placement} open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>{button}</PopoverHandler>
      <PopoverContent className='p-0' {...triggers}>
        {children}
      </PopoverContent>
    </Popover>
  )
}

export const PopoverClick: FC<{ button: ReactNode; children: ReactNode; placement?: any }> = ({
  button,
  children,
  placement,
}) => {
  return (
    <Popover placement={placement}>
      <PopoverHandler>{button}</PopoverHandler>
      <PopoverContent className='p-0'>{children}</PopoverContent>
    </Popover>
  )
}
