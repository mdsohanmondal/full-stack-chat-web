import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenDecoded } from "../utils/currentUserInformation";
import socket from "../utils/socket";

/**
 * 
 * @param {Array} array 
 * @param {Function} pushedArray
 * @returns {Array}
 */
function sortArrayItem(array, pushedArray){
  const sortArray = [...array].sort((a,b) => new Date(a?.createdAt) - new Date(b?.createdAt))
  return pushedArray(sortArray)
  
}
socket.on("connect")
export default function ChatPage() {
  const [token] = useState(localStorage.getItem("token"))
  const [currentUserData] = useState((!token || token !== '') && tokenDecoded())
  const [currentMessage, setCurrentMessage] = useState('')
  const [messagesArray, setMessagesArray] = useState([])
    const { userId } = useParams()
    
    /// effect hooks
    useEffect(() => {
      socket.emit("user1Id-user2Id", {senderId: currentUserData?.id, receiverId: userId})
      const handleMessagesData = data =>{
        sortArrayItem(data,setMessagesArray)
      } 
      socket.on("messages-data", handleMessagesData)
      socket.on("new-receive-message", data => setMessagesArray(prev => [...prev, data]))
      return () => {
        socket.off("messages-data", handleMessagesData)
      }
    }, [userId])

  const handleSendMessage = async () => {
    socket.emit("send-message", {
      content: currentMessage,
      sender: currentUserData?.id,
      receiver: userId
      })
      socket.on("new-message", data => {
        setMessagesArray(prev => [...prev, data])
      })
    setCurrentMessage('')
  }

  
  return (
    <div className="min-w-[55vw] flex"
     style={{minHeight:"calc(100vh - 10vh)",maxHeight:"calc(100vh - 10vh)"}}
     >

      {/* Message Container */}
      <div className="flex flex-col w-full">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 w-full">
          {messagesArray.length > 0 && messagesArray.map(({content,_id,sender,createdAt}) => (
            
            <div
            key={_id}
            className={`flex ${sender === currentUserData?.id ? "justify-end" : "justify-start"}`}
            >
              
              <div className="flex flex-col items-center">
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  sender === currentUserData?.id 
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                {content}
              </div>
                <span  className="block text-[10px] text-gray-600 mt-1">{new Date(createdAt).toLocaleTimeString()}</span>
                </div>
            </div>
          )) 
          
           }
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-gray-100 border-gray-200 flex">
          <input
            type="text"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={e => (e.key === "Enter" && currentMessage.trim() !== "") && handleSendMessage()}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button onClick={handleSendMessage} className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
