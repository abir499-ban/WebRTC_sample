# Sample Application for Web RTC 

A applicattion built with React and Node-Express coupled with Socket.io to implement the Media Sharing architecture of Web RTC.
----------


This readme.md explores the entire working flow of the implemented Web RTC architecture, along with code.



## Terminolgies : 

### Peer  
A device or browser directly connecting to another for real-time communication.  

### Signaling  
The process of exchanging setup information (like offers, answers, and candidates) between peers via a server.  

### ICE (Interactive Connectivity Establishment)  
A framework that helps find the best way for peers to connect through networks.  

### STUN Server (Session Traversal Utilities for NAT)  
A server that helps a peer discover its public IP address and port for connecting.  

### TURN Server (Traversal Using Relays around NAT)  
A relay server used when a direct connection between peers isn't possible due to firewalls.  

### SDP (Session Description Protocol)  
A text-based format used to describe the media capabilities (audio, video) and connection details between peers.  

### RTC Connection Instance
An active WebRTC connection between peers that handles the transmission of audio, video, and/or data streams.

---------


## Process :

## Connecting to a Socket server for Signalling 
The process of Signalling is used to connect two peers prior to RTC connection. This process is important as it facilitates the connection of the peers in order to exchange their SDPs and session information.

In this project, I have used Socket.io to establish a Web socket to act as a Signalling server. 
![scr-1](https://raw.githubusercontent.com/abir499-ban/WebRTC_sample/refs/heads/main/client/src/assets/Screenshot%202024-12-26%20041248.png)

Here, enter a email ID and a Room Id in order to connect to peer. The other peer must also, join the same room, to be able to share information.

The server code to handle the Joining Room is given below: 

```sh
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
    })....
```


After this 'joined_user' event is emitted, the particular peer at the client is redirected to the particular room page with the particualar roomID as its parameter for potenial database operation for storing chats for a particuar room.

```sh
const handleRoomJoin = useCallback(({ roomID }) => {
    console.log('Joined Room ', roomID)
    navigate(`/room/${roomID}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('joined_room', handleRoomJoin);

    return () => {
      socket.off('joined_room', handleRoomJoin)
    }
  }, [handleRoomJoin, socket]);

```


### Creating Offer

In this step as first client has jooined the chat room, he/she sends the offer to the other client in the chat room
