import React, { useContext } from 'react'
import cam from "../images/cam.png"
import more from "../images/more.png"
import add from "../images/add.png"
import Input from './Input'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'
const ChatPanel = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chatPanel'>

      <div className="top">
        <div className="name">{data?.user?.displayName}</div>
        <div className="Icons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <div className='messages'>
        <Messages></Messages>
      </div>
      <div className="input">
        <Input></Input>
      </div>
    </div>
  )
}

export default ChatPanel