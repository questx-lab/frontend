import React, { useEffect, useRef } from 'react'

import { update } from 'jdenticon'

interface IdenticonProps {
  value: string
  size: number
}

const Identicon: React.FC<IdenticonProps> = ({ value, size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      update(canvasRef.current, value)
    }
  }, [value])

  return <canvas width={size} height={size} ref={canvasRef} />
}

export default Identicon
