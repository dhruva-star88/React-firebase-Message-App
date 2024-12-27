import React from 'react'
import { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from  '../../lib/firebase';  
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload'



const Login = () => {
    // Function to set the avatar
    const[avatar, setAvatar] = useState({
        file:null,
        url:""
    })
const [loading, setLoading] = useState(false)

const handleAvatar = e => {
    if (e.target.files[0]){
    setAvatar({
        file:e.target.files[0], //uploads only one image
        url: URL.createObjectURL(e.target.files[0])
    })
    }
}
const handleRegister = async e => {
    e.preventDefault() // To prevent event Refresh 
    setLoading(true)
    
    const formData = new FormData(e.target)

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)

        const imgUrl = await upload(avatar.file)


        await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar:imgUrl,
            id:res.user.uid,
            blocked:[]
        });

        await setDoc(doc(db, "userchats", res.user.uid), {
            chats: []
        });

        toast.success("Account created! You can login now")
    }
    catch(err){
        console.log(err)
        toast.error(err.message)
    }
    finally{
        setLoading(false)
    }
}
const handleLogin = async e => {
    e.preventDefault() // To prevent event Refresh 
    setLoading(true)

    const formData = new FormData(e.target)

    const email = formData.get("email")
    const password = formData.get("password")
    console.log(password, email)
    try{
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Login Successfull")
    }
    catch(err){
        console.log(err)
        toast.error(err.message)
    }
    finally{
        setLoading(false)
    }
    
}

  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Email' name='email' />
                <input type='password' placeholder='Password' name='password' />
                <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
        <h2>Create an Account,</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor='file'>
                    <img src={avatar.url || "./avatar.png" } alt="" />
                    Upload an Image</label>
                <input type='file' id='file' style={{display: "none"}} onChange={handleAvatar}/>       
                <input type='text' placeholder='Username' name='username' />
                <input type='email' placeholder='Email' name='email' />
                <input type='password' placeholder='Password' name='password' />
                <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login