import {useContext, useMemo} from 'react'

import './App.css'
import { useSocketContext } from './hook/useSocketContext'


function App() {
  const {socket} = useSocketContext();
  const connectSocket  = () =>{
    console.log("Hi")
    socket.emit('message', {message:"Hello from client"})
  }
  return (
    <>
    <div className='container mx-auto  text-center'>
      <h1 className='text-center p-6 font-normal '>Welcome to Web RTC</h1>
      <button className='bg-gray-400 text-black rounded-md p-2 text-muted' 
      onClick={connectSocket}>Click Me to connect</button>
      </div>
    </>
  )
}

export default App
