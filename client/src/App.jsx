import {useContext, useEffect, useMemo, useState} from 'react'

import './App.css'
import { useSocketContext } from './hook/useSocketContext'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Room from './components/Room'


function App() {
  
  
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/room/:roomID' element={<Room/>} />
    </Routes>
    </>
  )
}

export default App
