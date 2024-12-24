import {useContext, useEffect, useMemo, useState} from 'react'

import './App.css'
import { useSocketContext } from './hook/useSocketContext'


function App() {
  const {socket} = useSocketContext();
  const [Roominfo, setRoominfo] = useState({
    emailID : "",
    roomID : "",
  })
  const connectSocket  = (e) =>{
    e.preventDefault();
    socket.emit('join_room', Roominfo);
  }

  const handlejoinRoom = (RoomID) =>{
    console.log('user joined ', RoomID)
  }

  useEffect(()=>{
    socket.on('joined_room', ({roomID}) => handlejoinRoom(roomID));
  }, [socket])
  
  
  return (
    <>
    <div className='container mx-auto  text-center flex flex-wrap flex-col justify-center items-center gap-3'>
      <h1 className='text-center p-6 font-normal text-6xl '>Welcome to Web RTC</h1>
      <input placeholder='Enter Email ID' className='border-2 border-gray-700 rounded-md p-4'
      value={Roominfo.emailID}
      onChange={(e)=>setRoominfo((prev) =>({
        ...prev,
        emailID : e.target.value
      }))}></input>
      <input placeholder='Enter Room ID' className='border-2 border-gray-700 rounded-md p-4'
      value={Roominfo.roomID}
      onChange={(e)=>setRoominfo((prev) =>({
        ...prev,
        roomID : e.target.value
      }))}></input>
      <button className='bg-blue-400 text-white rounded-md p-2 hover:bg-blue-600' 
      onClick={(e) => connectSocket(e)}>Click Me to connect</button>
      </div>
    </>
  )
}

export default App
