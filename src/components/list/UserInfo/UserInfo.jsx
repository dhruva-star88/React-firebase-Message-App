import React from 'react'
import './userinfo.css'

const UserInfo = () => {
  return (
    <div className='userinfo'>
        <div className="user">
        <img src='./avatar.png' alt=''></img>
        <h2>Dhruva</h2>
        </div>
        <div className="icons">
            <img src='./more.png' alt=''></img>
            <img src='./video.png' alt=''></img>
            <img src='./edit.png' alt=''></img>
        </div>
    </div>
  )
}

export default UserInfo