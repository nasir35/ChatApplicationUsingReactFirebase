import React from "react"
import user from "../images/user.jpg"
const Search = () => {

  return (
    <div className='search'>
        <div className="searchContainer">
            <input type="text" placeholder='Find a User'/>
        </div>
        {
        <div className="userInfo">
            <img src={user} alt="" />
            <span className="name">Nasir</span>
        </div>
        }
    </div>
  )
}

export default Search