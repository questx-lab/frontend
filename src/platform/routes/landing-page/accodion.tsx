import React, { useState } from 'react'

import tw from 'twin.macro'

import { FAQs } from '@/types/faq'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'

const Frame = tw.div`
  w-[640px]
  max-sm:w-full
  sm:w-full
  lg:w-[640px]
  px-6
`

const AccordionFrame = tw(Accordion)`
mb-2 rounded-lg border border-white-rgb10 px-4
`

const AccordionBox = () => {
  const [open, setOpen] = useState<number>()

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)

  const render = FAQs.map((item, index) => (
    <AccordionFrame open={open === index} key={index}>
      <AccordionHeader
        className='hover:text-white border-b-0  text-xl text-white font-rubik font-normal'
        onClick={() => handleOpen(index)}
      >
        {item.question}
      </AccordionHeader>
      <AccordionBody className='pt-0 text-sm text-white font-normal font-rubik'>
        {item.answer}
      </AccordionBody>
    </AccordionFrame>
  ))

  return <Frame>{render}</Frame>
}

export default AccordionBox
