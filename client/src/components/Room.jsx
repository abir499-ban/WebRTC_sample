import React, { useCallback, useEffect } from 'react'
import {useSocketContext} from '../hook/useSocketContext'
import {usePeer} from '../context/Peercontext'

const Room = () => {
    const {socket}  = useSocketContext();
    const {peer, createOffer} = usePeer();

    const handleUserJoin =  useCallback(
      async(data) =>{
        const {emailID} = data;
        console.log("User joined ", emailID);
        const offer = await createOffer();
        socket.emit('call_user', {emailID, offer})
      },
      [createOffer, socket]
    )

    const handleincomingCall  = useCallback(({from, offer})=>{
      console.log("incoming call from ", from, offer)
    }, [])

    useEffect(()=>{
        socket.on('user_joined', handleUserJoin)
        socket.on('incoming_call', handleincomingCall);
    }, [handleUserJoin,socket])
  return (
    <div>Room</div>
  )
}

export default Room