import React, { useEffect } from 'react'
import {useSocketContext} from '../hook/useSocketContext'

const Room = () => {
    const {socket}  = useSocketContext();


    useEffect(()=>{
        socket.on('user_joined', ({emailID}) => {
            console.log("I joined ", emailID)
        })
    }, [])
  return (
    <div>Room</div>
  )
}

export default Room