import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block : 'nearest' });
    const messageContent = ref.current.querySelector('.messageContent');
    messageContent.addEventListener('mouseenter', handleMouseEnter);
    messageContent.addEventListener('mouseleave', handleMouseLeave);

    // Remove event listeners on unmount
    return () => {
      messageContent.removeEventListener('mouseenter', handleMouseEnter);
      messageContent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [message]);

  function formatTime(dateString) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];  
    const date = new Date(dateString);
    const dayOfWeek = dayNames[date.getUTCDay()];
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const hours12 = (hours % 12) || 12;
    const amPm = hours < 12 ? 'AM' : 'PM';
    const hoursString = hours12.toString();
    const minutesString = minutes.toString().padStart(2, '0');
  
    return dayOfWeek + ' ' + hoursString + ':' + minutesString + ' ' + amPm;
  }
  const handleMouseEnter = () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
  };

  const handleMouseLeave = () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
  };

  return (
    <div ref={ref} className={`messageContainer ${message.senderId === currentUser.uid && 'owner'}`}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span id='tooltip'>{formatTime(message.date.toDate())}</span>
        </div>
        <div className="messageContent">
            {message?.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
        </div>

    </div>
  )
}

export default Message