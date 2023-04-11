import React from 'react'
import attach from "../images/attach.png"
import image from "../images/img.png"

const Input = () => {
  return (
    <div className='inputContainer'>
        <div className="inputForm">
            <input type="text" placeholder='write something..' />
        </div>
        <div className="attachIcons">
            <img src={attach} alt="" />
            <input type="file" style={{display: 'none'}} id='file'/>
            <label htmlFor="file">
                <img src={image} alt="" />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input