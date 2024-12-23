const express = require('express');
const app = express();
const body_parser = require('body-parser');
const {Server} = require('socket.io');


const io = new Server();
app.use(body_parser.json());


io.on('connection', (socket) =>{
    socket.on('join_room', (data) => {
        const {emailID, roomID} = data;
        socket.join(roomID);
        socket.broadcast(roomID).emit('User with email ', emailID, ' has joined');
        console.log(`User with ${emailID} and ${socket.id} has joined ${roomID}`);
    })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})