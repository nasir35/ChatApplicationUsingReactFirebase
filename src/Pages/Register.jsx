import React, { useState } from "react";
import addAvatar from "../images/addAvatar.png"
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"; 
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleImgChange = e => {
    const file = e.target.files[0];
    if(file){
      setImgPreview(URL.createObjectURL(file));
    }
  }
  if(isLoading) return <div>LOADING....</div>

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{
      //create user with email and pass
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      // upload photo on storage 
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          //update user profile
        try{
        await updateProfile(res.user, {
          displayName,
          photoURL: downloadURL
        });
        console.log(res.user);
      }
      catch(er){
        console.log('updste err: ',er);
      }

      // save user on firestore
      try{
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });
      }
      catch(err){
        console.log('users error: ',err);
      }
      // create an empty UserChat on firestore
      try{
        await setDoc(doc(db, "userChats", res.user.uid), {});
      }
      catch(err){
        console.log('userchat erro: ',err);
      }
    });
  }
);
      setIsLoading(false);
      navigate('/');
      navigate('/');
    }
    catch(error){
      console.log(error);
      setErr(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Nas Chat</span>
            <span className="title">Register to start chatting!</span>
            <form onSubmit={handleSubmit}>
                <input type="text" className="text" placeholder='Display Name'/>
                <input type="email" className="email" placeholder='E-mail'/>
                <input type="password" className="password" placeholder='Password'/>
                <input type="file" style={{display: 'none'}} id="avatar" onChange={handleImgChange} />
                <div className="labelAndPreview">
                  <label htmlFor="avatar">
                      <img src={addAvatar} alt="" />
                      <span style={{color: `${imgPreview ? 'green' : '#848393'}`}}>{imgPreview ? "Change selection" : "Add an avatar"}</span>
                  </label>
                  {imgPreview ? <img id="userImg" src={imgPreview} alt="" /> : null}
                </div>
                {err && <span style={{color: 'red'}}>Something went wrong!</span>}
                <button>Sign Up</button>
            </form>
            <Link to="/login" style={{textDecoration: 'none'}}><p style={{color: 'blue'}}>Already have an account? Log In here</p></Link>
        </div>
    </div>
  )
}

export default Register