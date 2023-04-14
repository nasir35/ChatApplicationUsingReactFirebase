import React, { useContext, useState } from "react"
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext} from '../context/AuthContext'
const Search = () => {

  const [input, setInpt] = useState('');
  const [user, setUser] = useState();
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () =>{
    const q = query(collection(db, 'users'), where('displayName', '==', input))
    const res = await getDocs(q);
    res.forEach( u => {
      console.log(u.data());
      if(u.data() && u.data().uid){
        setUser(u.data());
      }
    })
  }
  const handleKey = e => {
    e.code === 'Enter' && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId = user.uid > currentUser.uid ? user.uid + currentUser.uid : currentUser.uid + user.uid;
    const res = await getDoc(doc(db, 'chats', combinedId));
    try{
        if(!res.exists()){
          await setDoc(doc(db, 'chats', combinedId), {messages : []});

          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId+'.userInfo'] : {
              uid : user.uid,
              displayName : user.displayName,
              photoURL : user.photoURL,
            },
            [combinedId+'.date'] : serverTimestamp(),
          });
          await updateDoc(doc(db, 'userChats', user.uid), {
            [combinedId+'.userInfo'] : {
              uid : currentUser.uid,
              displayName : currentUser.displayName,
              photoURL : currentUser.photoURL,
            },
            [combinedId+'.date'] : serverTimestamp(),
          });
        }  
      }
      catch(error){
        console.log(error);
      }
      setUser(null);
      setInpt('');
  };

  return (
    <div className='search'>
        <div className="searchContainer">
            <input type="text" placeholder='Find a User' onKeyDown={handleKey} value={input} onChange={e => setInpt(e.target.value)}/>
        </div>
        { user && 
        <div className="userInfo" onClick={handleSelect}>
            <img src={user?.photoURL} alt="" />
            <span className="name">{user?.displayName}</span>
        </div>
        }
    </div>
  )
}

export default Search