import React, { useEffect } from 'react'
import {useSocketContext} from '../hook/useSocketContext'

const Room = () => {
    const {socket}  = useSocketContext();

    const handleUserJoined = ({emailID}) =>{
        console.log('User joined ', emailID)
    }

    useEffect(()=>{
        socket.on('user_joined', handleUserJoined)
    }, [])
  return (
    <div>Room</div>
  )
}

export default Room