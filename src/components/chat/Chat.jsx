import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import {useState, useRef, useEffect} from "react"

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [])

  const handleEmoji = e =>  {
    setText((prev )=> prev + e.emoji)
    setOpen(false)
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src='./avatar.png' alt=''/>
          <div className="texts">
            <span>Dhruva</span>
            <p>Hello...</p>
          </div>
        </div>
        <div className="icons">
        <img src='./phone.png' alt=''/>
        <img src='./video.png' alt=''/>
        <img src='./info.png' alt=''/>
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="avatar.png" alt="" />
          <div className="text">
            <p>Hello I am Dhruva from blr</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p>Hello I am Dhruva from blr</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="avatar.png" alt="" />
          <div className="text">
            <p>Hello I am Dhruva from blr</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
        
          <div className="text">
          <img src="my-photo.jpg" alt="" />
            <p>Hello I am Dhruva from blr</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
        <img src='./img.png' alt=''/>
        <img src='./camera.png' alt=''/>
        <img src='./mic.png' alt=''/>
        </div>
        <input type='text' placeholder='Enter the text' value={text} onChange={(e) => setText(e.target.value)}/>
        <div className="emoji">
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} width={400} height={350}/>
          </div>
        <img src='./emoji.png' alt='' onClick={() =>setOpen((prev)=> !prev)}/></div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat