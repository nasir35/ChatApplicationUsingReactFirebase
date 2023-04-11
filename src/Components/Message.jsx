import React from 'react'
import avatar from "../images/user.jpg"

const Message = () => {
  return (
    <div className='messageContainer owner'>
        <div className="messageInfo">
            <img src={avatar} alt="" />
            <span>just now</span>
        </div>
        <div className="messageContent">
            <img src={avatar} alt="" />
            <p>hello</p>
        </div>

    </div>
  )
}

export default Message