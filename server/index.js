const express = require('express');
const { createServer } = require('http');
const app = express();
const { Server } = require('socket.io')
const PORT = process.env.port || 8000;
const myserver = createServer(app);
const cors = require('cors');
const { Socket } = require('dgram');


const io = new Server(myserver, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));


app.get('/', (req, res) => {
    return res.end("Welcome");
})

const socketTOEmailMapping = new Map();
const EmailtoSocketMapping  = new Map();

io.on('connection', (socket) => {
    console.log("User connected, ", socket.id);
    socket.on('join_room', ({ roomID, emailID }) => {
        try {
            socketTOEmailMapping.set(socket.id , emailID)
            EmailtoSocketMapping.set(emailID, socket.id)
            socket.join(roomID);
            socket.emit('joined_room' , {roomID})
            socket.broadcast.to(roomID).emit('user_joined', {emailID});
            console.log("User joined room ", roomID, " ", emailID);
        } catch (error) {
            console.log(error.message)
        }
    })


    socket.on('call_user', (data) => {
         const {emailID, offer} = data;
         const fromEmail = socketTOEmailMapping.get(socket.id);
         const socketID = EmailtoSocketMapping.get(emailID);
         socket.to(socketID).emit('incoming_call' , {from : fromEmail, offer})
    })

    socket.on('call_accepted', data => {
        const {emailID, ans} = data;
        const socketID  = EmailtoSocketMapping.get(emailID);
        socket.to(socketID).emit('call_accepted', {ans});
    })
})




myserver.listen(PORT, () => {
    console.log("Server is live at ", PORT);
})