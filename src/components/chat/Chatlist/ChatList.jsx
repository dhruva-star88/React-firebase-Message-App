import React from 'react'
import "./chatlist.css"
import { useState, useEffect } from 'react'
import AddUser from './addUser/AddUser'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import useUserStore from '../../../lib/userStore';
import { db } from '../../../lib/firebase';
import useChatStore from '../../../lib/chatStore';

const ChatList = () => {
    const [chats, setChats] = useState([])
    const[addMode, setAddMode] = useState(false)
    const{currentUser} = useUserStore()
    const{changeChat} = useChatStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), 
        async(res) => {
            const data = res.data()

            if(!data || !data.chats){
                setChats([]);
                return;

            }
            const items = data.chats;  
            console.log("Items:", items);

            try {
                  const promises = items.map(async (item) => {
                    if (!item.recieverId) {
                        console.warn("Missing receiverId in item:", item);
                        return null;
                      }
                  const userDocRef = doc(db, "users", item.recieverId);
                  console.log("Reciever Id", item.receiverId)
                  const userDocSnap = await getDoc(userDocRef);
        
                  const user = userDocSnap.exists() ? userDocSnap.data() : null;
        
                  return { ...item, user };
                });
        
                const chatData = await Promise.all(promises);
        
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
              } catch (error) {
                console.error("Error fetching chat data:", error);
                setChats([]); // Reset chats on failure
              }
            }
          );
        
          return () => {
            unSub();
          };
        }, [currentUser.id]);

        const handleSelect = async (chat) =>{

           const userChats = chats.map((item) => {
            const {user, ...rest} = item

            return rest
           })

           const chatIndex = userChats.findIndex(item => item.id === chat.chatId)
           if (chatIndex === -1) {
            console.warn("Chat not found:", chat.chatId);
            return;
        }

           userChats[chatIndex].isSeen = true

           const userChatsRef = doc(db, "userchats", currentUser.id)

           try{

            await updateDoc(userChatsRef, {
              chats:userChats
            })
            console.log("Chat Selected:", chat);
          changeChat(chat.chatId, chat.user)
           }catch(err){
            console.log(err)
           }

          
    
        }
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
        {chats.map((chat)=> (
            <div className="item" key={chat.chatId} 
            style={{backgroundColor: chat?.isSeen ? "transparent": "#5183fe"}}
            onClick={() => handleSelect(chat)}>
            <img src={chat.user.avatar || './avatar.png'} alt=''></img>
            <div className="texts">
                <span>{chat.user.username}</span>
                <p>{chat.lastMessage}</p>
            </div>
            </div>
        ))}
        {addMode && <AddUser />}
    </div>
  )
}

export default ChatList