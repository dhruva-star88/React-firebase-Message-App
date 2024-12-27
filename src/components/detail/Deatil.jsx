import React from 'react'
import "./detail.css"
import { auth } from '../../lib/firebase'

const Deatil = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Dhruva</h2>
        <p>Hello...</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
         
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="arrowDown.png" alt="" />
            </div>
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                <img src="my-photo.jpg" alt="" />
                <span>photo-2024.png</span>
                </div>
                <img src="./download.png" alt="" className='icon' />
              </div>
              
              
            </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block user</button>
        <button className='logOut' onClick={() => auth.signOut()}>Logout</button>
      </div>
      
      </div>
  )
}

export default Deatil