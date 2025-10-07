import app from './src/app.js';
import { createServer } from 'http';
import {Server} from "socket.io"
import Message from './src/models/MessageModel.js';
const server = createServer(app);

const io = new Server(server, {
  cors:{
    origin:"*"
  }
})

const users = {}
io.on("connection", socket => {
  console.log('User connected')
  // first register users 
  socket.on("register", (data) => {
    const {currentUserId} = data
    if(!currentUserId){
      return new Error('User Id missing')
    }
    if(!users.hasOwnProperty(currentUserId)){
      users[currentUserId] = socket.id
    }
  })

  // send message 
  socket.on("send-message", async (data) => {
    const {content, sender, receiver} = data
    const newMessage = await Message.create({content, sender, receiver})
    socket.emit("new-message", newMessage)
    console.log('send: ',receiver)
    console.log('users: ',users)
    console.log('re socketId: ', users[receiver])
    io.to(users[receiver]).emit("new-receive-message", newMessage)
  })

  socket.on("user1Id-user2Id", async data => {
    const {senderId, receiverId} = data
    const [messages1, messages2] = await Promise.all([
      Message.find({ conversationId: `${senderId}:${receiverId}` }),
      Message.find({ conversationId: `${receiverId}:${senderId}` }),
    ])
    const allMessages = [...messages1,...messages2]
    socket.emit("messages-data", allMessages)
    
  })
  socket.on("disconnect", () => {
    const id = socket.id
    const arrUsers = Object.keys(users)
    for(let i = 0; i < arrUsers.length; i++){
      const currentUserKey = users[arrUsers[i]] 
      if(currentUserKey === id ){
        delete users[arrUsers[i]]
      } 
    }
  })
})

const port = process.env.PORT || 4040;
server.listen(port, () => console.log(`http://localhost:${port}`));
