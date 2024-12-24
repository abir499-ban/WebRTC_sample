const express = require('express');
const {createServer} = require('http');
const app = express();
const {Server} =require('socket.io')
const PORT = process.env.port || 8000;
const myserver = createServer(app);
const cors = require('cors');


const io = new Server(myserver,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true,
    }
});

app.use(cors({
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
  }));


app.get('/', (req,res)=>{
    return res.end("Welcome");
})



io.on('connection', (socket)=>{
    console.log("User connected, ",socket.id);
    socket.on('message', ((data)=>{
        console.table(data)
    }))
})
 



myserver.listen(PORT, ()=>{
    console.log("Server is live at ",PORT);
})