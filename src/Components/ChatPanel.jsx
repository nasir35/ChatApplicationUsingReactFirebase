import React from 'react'
import cam from "../images/cam.png"
import more from "../images/more.png"
import add from "../images/add.png"
import Message from './Message'
import Input from './Input'
const ChatPanel = () => {
  return (
    <div className='chatPanel'>

      <div className="top">
        <div className="name">Nasir</div>
        <div className="Icons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <div className="messages">
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
      </div>
      <div className="input">
        <Input></Input>
      </div>
    </div>
  )
}

export default ChatPanel