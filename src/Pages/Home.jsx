import React from 'react'
import ChatPanel from '../Components/ChatPanel'
import Sidebar from '../Components/Sidebar'

const Home = () => {
  return (
    <div className='homeContainer'>
        <div className="homeWrapper">
            <Sidebar></Sidebar>
            <ChatPanel></ChatPanel>
        </div>
    </div>
  )
}

export default Home