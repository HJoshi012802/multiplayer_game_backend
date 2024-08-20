const express = require('express');
const app = express();

const http =require('http');
const {Server} =require('socket.io');

const cors = require('cors');
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Hello Chat");
})

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
        credentials:"true",
        methods:["GET","POST"],
    }
});

io.on("connection",(socket)=>{

      console.log(`User Connected ${socket.id}`);
      socket.on("join_room",(data)=>{
    console.log(data);
      socket.join(data?.room);
      });
      socket.on("send_message",(data)=>{
        //  socket.broadcast.emit("recive_message",data);
        console.log(data);
        io.to(data?.room).emit("recive_message",data?.message);
      });

})

server.listen(6069,()=>{
    console.log('server is running on port 6069');
})

