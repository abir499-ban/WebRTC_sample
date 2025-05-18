# Sample Application for Web RTC 

A applicattion built with React and Node-Express coupled with Socket.io to implement the Media Sharing architecture of Web RTC.
----------



This readme.md explores the entire working flow of the implemented Web RTC architecture, along with code.


---------------------------------------



## Terminologies : 

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

--------------------------------------------------------------------------------

### Work around between Signalling server , STUN server and TURN server
  - Client first reaches out to STUN server via request for its public IP
  - Server responds with its public IP and port.
  - If the above process fails, TURN relays all media/data through its server.
  - Then peers exchange SDP offers/answers and ICE candidates via Signalling server.

---------
## Understanding Interactive Connectivity Establishment (ICE)
ICE for a peer contains information about all the  possible network paths and determines the best one for peer-to-peer communication.
This information for a peer is known as ICE Candidate, which is exchanged while the process of Signalling, as connectivity checks are performed to select the optimal path.
The three types of IP addresses that plays a role in ICE are : 
  - Host Candidate: The device's local IP address.

  - Server Reflexive Candidate: Public IP address discovered via a STUN server .

  - Relayed Candidate: Relay server address provided by a TURN server .
-----------------------------------------------------------------------------------------------------


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


-----------------------------

### Creating Offer

Whenver a client joins a room, two events are fired:
  <ul>
    <li>'joined_room' event : this event is send to that peer on the client side who has joined the rrom</li>
    <li>'user_joined' event : this is a Boardcast event which tells other peer(s) except him in the room that this particular user has joined</li>
  </ul>

  On receving the broadcast event, the already joined peer creates an offer which binds his STURN server information and SDP using RTC Peer connection instance method.
  
  ```sh
      const peer = useMemo(() =>{
        return new RTCPeerConnection({
            iceServers:[
                {
                    urls:[
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478"
                    ]
                }
            ]
        })
    }, [])

    const createOffer = async()=>{
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }
  ```

And then this offer along with the destination emailID is emitted via socket as an 'call_user' event. From the server it is again send back to the respective peer with emailID as an 'Incoming Call' event.

![](https://raw.githubusercontent.com/abir499-ban/WebRTC_sample/refs/heads/main/client/src/assets/Screenshot%202024-12-26%20050020.png)


### Sending Answer

After the 'incoming call' event is intercepted by client 2, it creates an answer using the instance from the RTC Peer connection method using the offer received.

```sh
    const createAnswer = async(offer)=>{
        await peer.setRemoteDescription(offer);
        const answer = peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer
    }
```

Then, this answer is again send to peer 1 under the event 'call_accepted'. And from server it is again send to client 1 under the same event name.

![](https://raw.githubusercontent.com/abir499-ban/WebRTC_sample/refs/heads/main/client/src/assets/Screenshot%202024-12-26%20051426.png)



### Accepting Answer and Handling Media Sharing

After the 'call-accepted' event is intercepted by client 1, its sets the ans received as the remote description of its RTC Peer instance.
```sh
  const setRemoteAns = async(ans) => {
        await peer.setRemoteDescription(ans);
    }
```

Then the media stream set up is done and the tracks of the stream is added to the peer:
```sh
  const sendstream = async(stream) =>{
        const tracks = stream.getTracks();
        for(const track of tracks){
            peer.addTrack(track, stream);
        }
    };
```


Now we can share any media stream or files between the peers or the clients, without any server in between!!

-----------------------------


We hope this project serves as a helpful guide to understanding and implementing WebRTC-based applications. WebRTC offers immense potential for real-time communication, and this example demonstrates how easily it can be integrated with modern web frameworks.

If you found this project useful, consider giving it a ⭐ on GitHub! Your feedback and contributions are always welcome.


