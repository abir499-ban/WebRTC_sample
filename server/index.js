const express = require('express');
const { createServer } = require('http');
const app = express();
const { Server } = require('socket.io')
const PORT = process.env.port || 8000;
const myserver = createServer(app);
const cors = require('cors');


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



io.on('connection', (socket) => {
    console.log("User connected, ", socket.id);
    socket.on('join_room', ({ roomID, emailID }) => {
        try {
            socket.join(roomID);
            socket.emit('joined_room' , {roomID})
            socket.broadcast.to(roomID).emit('user_joined', emailID);
            console.log("User joined room ", roomID, " ", emailID);
        } catch (error) {
            console.log(error.message)
        }
    })
})




myserver.listen(PORT, () => {
    console.log("Server is live at ", PORT);
})