import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import {useState, useRef, useEffect} from "react"
import { db } from "../../lib/firebase"
import useChatStore from "../../lib/chatStore"
import { toast } from "react-toastify"
import useUserStore from "../../lib/userStore"

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [chat, setChat] = useState()
  const{chatId, user} = useChatStore()
  const{currentUser} = useUserStore()

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [])

  useEffect(() => {
    if (!chatId) return; // Prevent query if chatId is invalid
  
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      if (res.exists()) {
        setChat(res.data());
      } else {
        console.error(`Chat with ID ${chatId} does not exist`);
      }
    });
  
    return () => {
      unSub();
    };
  }, [chatId]);
  

  console.log(chat)

  const handleSend = async () => {
    if(text === "") return

    try{
      await updateDoc(doc(db, "chats", chatId),
    {
      messages:arrayUnion({
        sender: currentUser.id,
        text,
        createdAt: new Date(),
      })
    })

    const userIDs = [currentUser.id, user.id]

    userIDs.forEach(async(id) => {
      const userChatRef = doc(db, "userchats", id)
    const userChatsSnapShot = await getDoc(userChatRef)
    
    if(userChatsSnapShot.exists()){
      const userChatsData = userChatsSnapShot.data()

      const chatIndex = userChatsData.chats.findIndex( (c) => c.chatId === chatId)

      userChatsData.chats[chatIndex].lastMessage = text
      userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
      userChatsData.chats[chatIndex].updatedAt = Date.now()

      await updateDoc(userChatRef, {
        chats: userChatsData.chats
      })
    }
    })

    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  
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
        {chat?.messages?.map((message)=>
          <div className="message own" key={message?.createdAt}>
            <div className="text">
            {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/*<span>1 min ago</span>*/}
            </div>
          </div>
        )}
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
        <button className='sendButton' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat