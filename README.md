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


