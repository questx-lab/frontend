import {MouseEventHandler} from "react";

export default function DefaultBtnCpn ({text,onClick}:{text:string,onClick:MouseEventHandler}){
  return (
    <button onClick={onClick} className="bg-primary hover:bg-blue-700 text-sm text-white font-medium py-2 px-4 rounded-lg">
      {text}
    </button>
  )
}
