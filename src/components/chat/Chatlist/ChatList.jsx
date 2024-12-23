import React from 'react'
import "./chatlist.css"
import { useState } from 'react'

const ChatList = () => {
    const[addMode, setAddMode] = useState(false)
  return (
    <div className='chatlist'>
        <div className="search">
            <div className="searchBar">
               <img src='./search.png' alt=''></img>
               <input type='text' placeholder='Search' />
            </div>
            <img src={addMode ? './minus.png': './plus.png' }alt='' className='add'
            onClick={() => setAddMode((prev) => !prev)}></img>  
        </div>
        <div className="item">
        <img src='./avatar.png' alt=''></img>
        <div className="texts">
            <span>Dhruva</span>
            <p>Hello</p>
        </div>
        </div>
        <div className="item">
        <img src='./avatar.png' alt=''></img>
        <div className="texts">
            <span>Dhruva</span>
            <p>Hello</p>
        </div>
        </div>
        <div className="item">
        <img src='./avatar.png' alt=''></img>
        <div className="texts">
            <span>Dhruva</span>
            <p>Hello</p>
        </div>
        </div>
    </div>
  )
}

export default ChatList