import React from 'react'
import { useState } from 'react'
import "./login.css"

const Login = () => {

    const[avatar, setAvatar] = useState({
        file:null,
        url:""
    })

const handleAvatar = e => {
    if (e.target.files[0]){
    setAvatar({
        file:e.target.files[0], //uploads only one image
        url: URL.createObjectURL(e.target.files[0])
    })
    }
}

const handleLogin = e => {
    e.preventDefault() // To prevent event Refresh 
    
}

  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Email' name='email' required/>
                <input type='password' placeholder='Password' name='passwd' required/>
                <button>Sign in</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
        <h2>Create an Account,</h2>
            <form>
                <label htmlFor='file'>
                    <img src={avatar.url || "./avatar.png" } alt="" />
                    Upload an Image</label>
                <input type='file' id='file' style={{display: "none"}} onChange={handleAvatar}/>       
                <input type='text' placeholder='Username' name='uname' required/>
                <input type='password' placeholder='Password' name='passwd' required/>
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Login