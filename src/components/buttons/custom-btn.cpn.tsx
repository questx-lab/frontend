import { MouseEventHandler } from 'react';

export const FullWidthBtn = ({text,onClick}:{text:string,onClick:MouseEventHandler})=>{
  return (
    <button onClick={onClick} className="w-full bg-primary hover:bg-blue-700 text-sm text-white font-medium py-2 px-4 rounded-lg">
      {text}
    </button>
  )
}
