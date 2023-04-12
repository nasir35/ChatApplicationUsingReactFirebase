import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {

  const [err,setErr] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  if(isLoading) return <div>LOADING....</div>

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      const res = await signInWithEmailAndPassword(auth, email, password);
      if(res.user){
        
        setIsLoading(false);
        navigate('/');
      }
    }
    catch(err){
      setErr(true);
      setIsLoading(false);
    }
  }
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Nas Chat</span>
            <span className="title">Login to start chatting!</span>
            <form onSubmit={handleSubmit}>
                <input type="email" className="email" placeholder='E-mail'/>
                <input type="password" className="password" placeholder='Password'/>
                {err && <span style={{color: 'red'}}>Something Went Wrong!</span>}
                <button>Sign In</button>
            </form>
            <Link to="/register" style={{textDecoration: 'none'}}><p style={{color: 'blue'}}>Don't have an account? Register here</p></Link>
        </div>
    </div>
  )
}

export default Login